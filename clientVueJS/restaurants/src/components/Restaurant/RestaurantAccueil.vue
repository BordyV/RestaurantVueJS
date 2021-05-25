<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="./RestaurantAccueilStyle.css" scoped></style>

<template src="./RestaurantAccueilTemplate.html"></template>

<script>

import RestaurantAjout from './RestaurantAjout/RestaurantAjout'
import RestaurantDetail from './RestaurantDetail/RestaurantDetail'

export default {
  name: "RestaurantAccueil",
  components: {
    RestaurantAjout,
    RestaurantDetail
  },
  data: () => {
    return {
      showProgressSpinner: false,
      pagination: 0,
      pageSize: 10,
      nameRequete: "",
      restaurants: [],
      nbTotalRestaurants: "",
      restaurantModif: {name: "...", cuisine: "..."},
      restaurantDet: {name:"prout", cuisine: "prout"},
      name: "",
      nameValide: true,
      cuisine: "",
      cuisineValide: true,
      ajoutReussi: false,
      suppressionReussi: false,
      modificationReussi: false,
      modificationTemplate: false,
      valueRecherche: "",

    };
  },
  mounted () {
    console.log("AVANT RENDU HTML");
    this.getRestaurantsFromServer(
      this.pagination,
      this.pageSize,
      this.nameRequete,
      () => {}
    );
  },
  methods: {
    getRestaurantsFromServer(pagination, pageSize, name, callback) {
      this.afficherLeSpinner();
      var url =
        "https://valentinbordy.fr/restaurants/api/restaurants?page=" +
        pagination +
        "&pagesize=" +
        pageSize +
        "&name=" +
        name;
      fetch(url)
        .then((response) => {
          response.json().then((data) => {
            //data est une propriété de la response
            this.restaurants = data.data;
            this.nbTotalRestaurants = data.count;
            console.log(this.restaurants);
            console.log(this.nbTotalRestaurants);
            this.cacherLeSpinner();
            callback();
          });
        })
        .catch((err) => {
          console.error(err);
          alert("Une erreur est survenue lors du chargement des données");
          this.cacherLeSpinner();
        });
    },
    supprimerRestaurant(idrest) {
      console.log(idrest);
      this.afficherLeSpinner();
      fetch("https://valentinbordy.fr/restaurants/api/restaurants/" + idrest, {
        method: "delete",
      })
        .then((responsePost) => {
          console.log(responsePost.status);
          if (responsePost.status == 200) {
            this.getRestaurantsFromServer(
              this.pagination,
              this.pageSize,
              this.nameRequete,
              () => {
                this.suppressionReussi = true;
              }
            );
          }
        })
        .catch((err) => {
          console.error(err);
          alert("Une erreur est survenue lors de la suppresion du restaurant");
        });
    },
    modifierRestaurant(e) {
      this.nameValide = this.restaurantModif.name.length > 2 ? true : false;
      this.cuisineValide = this.restaurantModif.cuisine.length > 2 ? true : false;
      if (this.nameValide == true && this.cuisineValide == true) {
      this.modificationTemplate = false;
      //on recupere le form
      let form = e.target;
      // Récupération des valeurs des champs du formulaire
      // en prévision d'un envoi multipart en ajax/fetch
      let donneesFormulaire = new FormData(form);
      //envoie fetch
      fetch("https://valentinbordy.fr/restaurants/api/restaurants/" + this.restaurantModif._id, {
        method: "put",
        body: donneesFormulaire,
      })
        .then((responsePost) => {
          console.log(responsePost.status);
          if (responsePost.status == 200) {
            this.modificationReussi = true;
            responsePost.json().then((data) => {
            console.log(data.msg);
          });
          }
        })
        .catch((err) => {
          console.error(err);
          alert(
            "Une erreur est survenue lors de la modification du restaurant"
          );
        });
      }
    },
    afficherModif(restaurantMod) {
      this.restaurantModif = restaurantMod;
      this.modificationTemplate = true;
    },
    searchOnTable() {
      this.nameRequete = this.valueRecherche;
      this.getRestaurantsFromServer(
        this.pagination,
        this.pageSize,
        this.nameRequete,
        () => {}
        );
    },
    goToRestaurantGauche() {
      if (this.pagination > 0) {
        this.pagination--;

        console.log(this.pagination);
        this.getRestaurantsFromServer(
          this.pagination,
          this.pageSize,
          this.nameRequete,
          () => {}
        );
      }
    },
    goToRestaurantDroit() {
if (this.pagination < (Math.round(this.nbTotalRestaurants / this.pageSize))) {

      this.pagination++;
      console.log(this.pagination);
      this.getRestaurantsFromServer(
        this.pagination,
        this.pageSize,
        this.nameRequete,
        () => {}
      );
}
    },
    cacherLeSpinner() {
      this.showProgressSpinner = false;
      var overlay = document.getElementById("overlay");
      overlay.style.display = "none";
    },
    afficherLeSpinner() {
      this.showProgressSpinner = true;
      var overlay = document.getElementById("overlay");
      overlay.style.display = "block";
    },
  },
};
</script>

