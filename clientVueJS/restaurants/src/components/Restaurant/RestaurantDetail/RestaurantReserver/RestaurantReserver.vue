<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="./RestaurantReserverStyle.css" scoped></style>

<template src="./RestaurantReserverTemplate.html"></template>


<script>
export default {
  name: "RestaurantReserver",
  props: ["idRestaurant"],
  components: {},
  data: () => {
    return {
      heureReservation: undefined,
      nameReservation: "",
      nameValidation: true,
      ajoutResTemplate: false,
      lesReservations: [],
    };
  },
  mounted() {
    this.getReservationByRestaurantId(this.idRestaurant)
  },
  methods: {
    getReservationByRestaurantId(id) {
      var url = "http://localhost:80/api/restaurants/reservation/" + id;
      fetch(url)
        .then((response) => {
          response.json().then((data) => {
            this.lesReservations = data.lesReservations;
            console.log(this.lesReservations);
          });
        })
        .catch((err) => {
          console.error(err);
          alert(
            "Une erreur est survenue lors du chargement des reservations du restaurant."
          );
        });
    },
    selectionnerHeure(heure) {
      let lesBtnReservation = document.getElementsByClassName(
        "btnHeureReservation"
      );
      for (const btnReserv of lesBtnReservation) {
        //si le bouton a la class heureSelectionne on l'enleve
        if (btnReserv.classList.contains("heureSelectionne")) {
          btnReserv.classList.remove("heureSelectionne");
        }
      }
      document.getElementById(heure).classList.add("heureSelectionne");
      this.heureReservation = heure;
    },
    reserverHeure() {
      this.ajoutResTemplate = true;
    },
    ajouterReservation() {
      this.nameValidation = this.nameReservation.length > 2 ? true : false;

      if (this.nameValidation && this.heureReservation) {
        let donneesFormulaire = new FormData();
        donneesFormulaire.append('idRestaurant', this.idRestaurant);
        donneesFormulaire.append('nameReservation', this.nameReservation);
        donneesFormulaire.append('heureReservation', this.heureReservation);

        //envoie fetch
        fetch("http://localhost:80/api/reserver", {
          method: "post",
          body: donneesFormulaire,
        })
          .then((responsePost) => {
            console.log(responsePost.status);
            if (responsePost.status == 200) {
              this.ajoutResTemplate = false;

              //on remet les datas: nom et cuisine a null
              this.nameReservation = '';
            }
          })
          .catch((err) => {
            console.error(err);
            alert("Une erreur est survenue lors de l'ajout des données de reservation");
          });
      }
    },
  },
};
</script>