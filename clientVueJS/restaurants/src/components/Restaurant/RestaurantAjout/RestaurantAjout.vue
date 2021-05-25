<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="./RestaurantAjoutStyle.css" scoped></style>

<template src="./RestaurantAjoutTemplate.html"></template>


<script>
export default {
  name: "RestaurantAjout",
  data: () => {
    return {
      name: "",
      nameValide: true,
      cuisine: "",
      cuisineValide: true,
      ajoutReussi: false,
    };
  },
  methods: {
    ajouterRestaurant(e) {
      this.nameValide = this.name.length > 2 ? true : false;
      this.cuisineValide = this.cuisine.length > 2 ? true : false;

      //si le name et la cuisine sont bons alors on ajoute
      if (this.nameValide == true && this.cuisineValide == true) {
        //on recupere le form
        let form = e.target;

        // Récupération des valeurs des champs du formulaire
        // en prévision d'un envoi multipart en ajax/fetch
        let donneesFormulaire = new FormData(form);

        //envoie fetch
        fetch("https://valentinbordy.fr/restaurants/api/restaurants", {
          method: "post",
          body: donneesFormulaire,
        })
          .then((responsePost) => {
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
      }
    },
  },
};
</script>