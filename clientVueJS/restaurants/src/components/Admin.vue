<template>
<div id="spinner">
    <h1>Ajouter les menus à la base de données:</h1>
    <md-button class="md-dense md-raised md-primary" @click.native="addMenuToRestaurant()">ajouter les menus</md-button>

<!--DEBUT PROGRESS SPINNER-->
    <template v-if="showProgressSpinner">
        <div>
            <md-progress-spinner md-mode="indeterminate"></md-progress-spinner>
        </div>
    </template>

    <!--DIV POUR LE BLACK SCREEN PROGRESS SPINNER-->
    <div id="overlay"></div>
    <!--FIN PROGRESS SPINNER-->


    <!--DEBUT Boite de dialog lors du succes de l'ajout des menus-->
    <template id="templateMenu">
        <div>
            <md-dialog-alert :md-active.sync="ajoutRestaurantReussi" md-title="Félicitation !"
                md-content="Tout les menus des restaurants ont biens étés ajoutés à la base de données." />
        </div>
    </template>
    <!--FIN Boite de dialog lors de la suppression d'un restaurant-->
</div>
</template>


<script>
export default {
  name: "Admin",
  data: () => {
    return {
        ajoutRestaurantReussi: false,
        showProgressSpinner: false,
    };
  },
  methods: {
    addMenuToRestaurant(){
      this.afficherLeSpinner();
      fetch("http://localhost:80/api/restaurantsMenu/", {
          method: "put",
        })
          .then((responsePost) => {
              this.cacherLeSpinner();
            console.log(responsePost.status);
            if (responsePost.status == 200) {
              console.log(responsePost);
              this.ajoutRestaurantReussi = true;
            }
          })
          .catch((err) => {
              this.cacherLeSpinner();
            console.error(err);
          });
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
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.md-progress-spinner {
    margin-left: 46%;
    position: relative;
    z-index: 16;
}
#overlay {
  position: fixed;
  display: none;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
}

</style>
