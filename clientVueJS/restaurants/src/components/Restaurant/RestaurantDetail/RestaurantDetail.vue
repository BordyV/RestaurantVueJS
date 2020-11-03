<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="./RestaurantDetailStyle.css" scoped></style>

<template src="./RestaurantDetailTemplate.html"></template>


<script>
import { latLng } from "leaflet";
import { LMap, LTileLayer, LMarker } from "vue2-leaflet";
import StarRating from "vue-star-rating";
import CarteMenu from "./CarteDetail/CarteMenu";
import RestaurantCommander from "./RestaurantCommander/RestaurantCommander";
import RestaurantReserver from "./RestaurantReserver/RestaurantReserver";


export default {
  name: "RestaurantDetail",
  props: ["id"],
  filters: {
    round: function (value) {
      return value.toFixed(2);
    },
  },
  components: {
    LMap,
    LTileLayer,
    LMarker,
    StarRating,
    CarteMenu,
    RestaurantCommander,
    RestaurantReserver
  },
  data: () => {
    return {
      restaurant: undefined,
      scoreMoyen: 0,
      rating: 0,
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      zoom: 13,
      center: null,
      LMarker: latLng(47.41322, -1.219482),
      bounds: null,
      showProgressSpinner: false,
      afficherCarte: false,
    };
  },
  mounted() {
    if (this.id) {
      this.getRestaurantsFromServerById(this.id, () => {
        this.LMarker = latLng(
          this.restaurant.address.coord[1],
          this.restaurant.address.coord[0]
        );
        this.center = this.LMarker;
        this.calculerRatingNoteRestaurant();
      });
    }
  },
  methods: {
    getRestaurantsFromServerById(id, callback) {
      this.afficherLeSpinner();
      var url = "http://localhost:80/api/restaurants/" + id;
      fetch(url)
        .then((response) => {
          response.json().then((data) => {
            //data est une propriété de la response
            this.restaurant = data.restaurant;
            console.log(this.restaurant);
            this.cacherLeSpinner();
            callback();
          });
        })
        .catch((err) => {
          console.error(err);
          this.cacherLeSpinner();
          alert("Une erreur est survenue lors du chargement des données");
        });
    },
    calculerRatingNoteRestaurant() {
      //on recupere chaque score via le tableau des evaluations
      for (let note of this.restaurant.grades) {
        this.scoreMoyen += note.score;
      }
      //on fait la moyenne en fonction de la taille du tableau
      this.scoreMoyen = this.scoreMoyen / this.restaurant.grades.length;

      //condition pour avoir la note
      this.rating =
        this.scoreMoyen <= 5
          ? 5
          : this.scoreMoyen <= 10
          ? 4.5
          : this.scoreMoyen <= 15
          ? 4
          : this.scoreMoyen <= 25
          ? 3.5
          : this.scoreMoyen <= 35
          ? 3
          : this.scoreMoyen <= 45
          ? 2.5
          : this.scoreMoyen <= 55
          ? 2
          : this.scoreMoyen <= 65
          ? 1.5
          : 1;
    },
    zoomUpdated(zoom) {
      this.zoom = zoom;
    },
    centerUpdated(center) {
      this.center = center;
    },
    boundsUpdated(bounds) {
      this.bounds = bounds;
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
    imageRestaurant()
    {
      return require("@/assets/restaurant"+this.getRandomInt(3)+".jpg")
    },
    getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max));
    }
  },
};
</script>