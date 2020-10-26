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

      errorNoData: undefined,
      nomCommande: undefined,
      prenomCommande: undefined,
      mailCommande: undefined,
      messsageCommande: undefined,
      entreeCommande: [],
      platCommande: [],
      dessertCommande: [],
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

      if (index) {
        this.active = index;
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