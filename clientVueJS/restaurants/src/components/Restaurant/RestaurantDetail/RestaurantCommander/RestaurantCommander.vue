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
        console.log(this.nomCommande);
        console.log(this.prenomCommande);
        console.log(this.mailCommande);
        console.log(this.messsageCommande);
        console.log(this.entreeCommande);
        console.log(this.platCommande);
        console.log(this.dessertCommande);
        
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
    },
  },
};
</script>