<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="./RestaurantDetailStyle.css" scoped></style>

<template src="./RestaurantDetailTemplate.html"></template>


<script>
import { latLng } from "leaflet";
import {LMap, LTileLayer, LMarker} from 'vue2-leaflet';

export default {
  name: "RestaurantDetail",
  props: ['id'],
  filters: {
    round: function (value) {
      return value.toFixed(2);
    }
  },
  components: {
    LMap,
    LTileLayer,
    LMarker
  },
  data: () => {
    return {
      restaurant: undefined,
      scoreMoyen: 0,
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      zoom: 13,
      center: null,
      LMarker: latLng(47.41322, -1.219482),
      bounds: null,
      showProgressSpinner: false,
    };
  },
  mounted() {
    if(this.id)
    {
      this.getRestaurantsFromServerById(this.id, () => {
        this.LMarker = latLng(this.restaurant.address.coord[1], this.restaurant.address.coord[0]);
        this.center = this.LMarker;
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
    zoomUpdated (zoom) {
      this.zoom = zoom;
    },
    centerUpdated (center) {
      this.center = center;
    },
    boundsUpdated (bounds) {
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
  },
};
</script>