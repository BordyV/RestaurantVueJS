<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="./RestaurantCommanderStyle.css" scoped></style>

<template src="./RestaurantCommanderTemplate.html"></template>


<script>
import CarteMenu from "../CarteDetail/CarteMenu";

export default {
  name: "RestaurantCommander",
  props: ["idRestaurant"],
  components: {
    CarteMenu,
  },
  filters: {
    capitalize: function (value) {
      if (!value) return "";
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
  },
  data: () => {
    return {
      active: "first",
      first: false,
      second: false,
      third: false,

      errorAucunChoixMenu: undefined,
      errorMailForm: undefined,
      nomCommande: undefined,
      prenomCommande: undefined,
      mailCommande: undefined,
      adresseCommande: undefined,
      messsageCommande: undefined,
      entreeCommande: [],
      platCommande: [],
      dessertCommande: [],
      commandeTotal: [],
      afficherMenuComponent: false,
      showSnackbarCommande: false
    };
  },
  mounted() {},
  methods: {
    ValiderCommande() {
      //on formate le message 
      this.messsageCommande = this.messsageCommande == undefined ? "" : this.messsageCommande;

      let donneesFormulaire = new FormData();
      donneesFormulaire.append('idRestaurant', this.idRestaurant);
      donneesFormulaire.append('nomClient', this.nomCommande);
      donneesFormulaire.append('prenomClient', this.prenomCommande);
      donneesFormulaire.append('addresseClient', this.adresseCommande);
      donneesFormulaire.append('mailClient', this.mailCommande);
      donneesFormulaire.append('messageClient', this.messsageCommande);
      donneesFormulaire.append('entrees', JSON.stringify(this.entreeCommande));
      donneesFormulaire.append('plats', JSON.stringify(this.platCommande));
      donneesFormulaire.append('desserts', JSON.stringify(this.dessertCommande));
      donneesFormulaire.append('totalPrix', this.calculerTotal());


        fetch("http://localhost:80/api/commmander", {
          method: "post",
          body: donneesFormulaire,
        })
          .then((responsePost) => {
            console.log(responsePost.status);
            if (responsePost.status == 200) {
              this.afficherMenuComponent = false;
              this.showSnackbarCommande = true;
              //on remet les datas du menu a null
              this.entreeCommande = [];
              this.platCommande = [];
              this.dessertCommande = [];
              this.commandeTotal = [];
            }
          })
          .catch((err) => {
            console.error(err);
            alert("Une erreur est survenue lors de l'ajout des données");
          });
        
    },
    //permet de changer de page dans le stepper
    setDone(id, index) {
      this[id] = true;
      this.errorAucunChoixMenu = undefined;
      this.errorMailForm = undefined;

      //si quand on part de la premiere page aucun des 3 tableaux n'a une case de selectionné alors nous ne passons pas à la page suivante
      //et nous déclarons une erreur.
      if (id =="first") {
        if(this.entreeCommande.length == 0 && this.platCommande.length == 0 && this.dessertCommande == 0)
        {
          this.errorAucunChoixMenu = "Veuillez au moins choisir un hors d'oeuvre, un plat ou un dessert !";
          return false;
        }
      }
      //si quand on part de la seconde page le mail n'est aps valide on reste dessus et on affiche un message d'erreur
      if (id =="second") {
        if(!this.validerEmail(this.mailCommande))
        {
          this.errorMailForm ="Veuillez saisir un mail valide."
          return false;
        }
      }
      if (index) {
        this.active = index;
      }

      //si on arrive sur la 3eme page on remplit le tableau commandeTotal pour avoir tout les plats.
      if (index =="third") {
        this.commandeTotal = [];
        Array.prototype.push.apply(this.commandeTotal,this.entreeCommande);
        Array.prototype.push.apply(this.commandeTotal,this.platCommande);
        Array.prototype.push.apply(this.commandeTotal,this.dessertCommande);

      }
    },
    updateEntreeCommande(lesEntrees) {
      this.entreeCommande = [];
      for (const entree of lesEntrees) {
        this.entreeCommande.push(entree);
      }
    },
    updatePlatCommande(lesPlats) {
      this.platCommande = [];
      for (const plat of lesPlats) {
        this.platCommande.push(plat);
      }
    },
    updateDessertCommande(lesDesserts) {
      this.dessertCommande = [];
      for (const dessert of lesDesserts) {
        this.dessertCommande.push(dessert);
      }
    },
    //permet de valider l'email passer en parametre
    validerEmail(email) 
    {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    },
    //permet de calculer le total de la commande
    calculerTotal() 
    {
      let total = 0 ;
      for(const plat of this.commandeTotal)
      {
        let prix = plat.prix.replace('€','');
        prix = prix.replace(',','.');
        total += Number(prix);
        
      }
      return total.toFixed(2);
    }
  },
};
</script>