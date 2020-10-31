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
      nomCommande: undefined,
      prenomCommande: undefined,
      mailCommande: undefined,
      adresseCommande: undefined,
      messsageCommande: undefined,
      entreeCommande: [],
      platCommande: [],
      dessertCommande: [],
      CommandeTotal: [],
      afficherMenuComponent: false,
    };
  },
  mounted() {},
  methods: {
    ValiderCommande() {
      let donneesFormulaire = new FormData();
      donneesFormulaire.append('idRestaurant', this.idRestaurant);
      donneesFormulaire.append('nomClient', this.nomCommande);
      donneesFormulaire.append('prenomClient', this.prenomCommande);
      donneesFormulaire.append('mailClient', this.mailCommande);
      donneesFormulaire.append('entrees', JSON.stringify(this.entreeCommande));
      donneesFormulaire.append('plats', JSON.stringify(this.platCommande));
      donneesFormulaire.append('desserts', JSON.stringify(this.dessertCommande));

      //donneesFormulaire.push(this.idRestaurant, this.nomCommande,this.prenomCommande, this.mailCommande,
      // this.messsageCommande, this.entreeCommande, this.platCommande, this.dessertCommande );
debugger
        fetch("http://localhost:80/api/commmander", {
          method: "post",
          body: donneesFormulaire,
        })
          .then((responsePost) => {
            debugger
            console.log(responsePost.status);
            if (responsePost.status == 200) {
              this.ajoutReussi = true;

              //on remet les datas: nom et cuisine a null
              this.name = "";
              this.cuisine = "";
            }
          })
          .catch((err) => {
            console.error(err);
            alert("Une erreur est survenue lors de l'ajout des données");
          });
        
    },
    setDone(id, index) {
      this[id] = true;
      this.errorAucunChoixMenu = undefined;

      //si quand on part de la premiere page aucun des 3 tableaux n'a une case de selectionné alors nous ne passons pas à la page suivante
      //et nous déclarons une erreur.
      if (id =="first") {
        if(this.entreeCommande.length == 0 && this.platCommande.length == 0 && this.dessertCommande == 0)
        {
          this.errorAucunChoixMenu = "Veuillez au moins choisir un hors d'oeuvre, un plat ou un dessert !";
          return false;
        }
      }
      if (index) {
        this.active = index;
      }

      //si on arrive sur la 3eme page on remplit le tableau CommandeTotal pour avoir tout les plats.
      if (index =="third") {
        this.CommandeTotal = [];
        Array.prototype.push.apply(this.CommandeTotal,this.entreeCommande);
        Array.prototype.push.apply(this.CommandeTotal,this.platCommande);
        Array.prototype.push.apply(this.CommandeTotal,this.dessertCommande);

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
    }
  },
};
</script>