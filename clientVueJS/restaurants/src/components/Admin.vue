<template>
  <div id="admin">
    <!-- Style pour highlightJS qui ne marche que ici :'( -->
    <link
      rel="stylesheet"
      href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.9.0/styles/default.min.css"
    />
    <link
      rel="stylesheet"
      href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.9.0/styles/tomorrow-night.min.css"
    />
    <link
      rel="stylesheet"
      href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.9.0/styles/sunburst.min.css"
    />

    <h1>Ajouter les menus et les medias à la base de données:</h1>
    <p><strong>/!\ Attention /!\ </strong>Pour ajouter les menus et les medias à la base il faut avoir :
      <ul>
        <li>Avoir installer le projet. ( Voir plus bas ) </li>
        <li>Avoir importé la base de données initiale displonible <a href="https://raw.githubusercontent.com/mongodb/docs-assets/primer-dataset/primer-dataset.json">ici</a> (mongodb).</li>
        <li>Avoir démarré le serveur node.</li>
      </ul>
    </p>
    <p>
      Lors de cette opération <strong> ne changez surtout pas de page</strong> tant
      que vous n'avez pas vu la boite de dialog !
    </p>
    <md-button
      class="md-dense md-raised md-primary"
      @click.native="addMenuToRestaurant()"
      >ajouter les menus</md-button
    >
    <md-button
      class="md-dense md-raised md-primary"
      @click.native="addMediasToRestaurant()"
      >ajouter les medias</md-button
    >
    Cette opération ne durera que <strong>quelques secondes.</strong> <br />
    Pour exemple elle n'a duré que 7 secondes pour 25359 restaurants avec mon
    ordinateur.
    
    <!--DEBUT PROGRESS SPINNER-->
    <template v-if="showProgressSpinner">
      <div id="progressSpinnerAdmin">
        <md-progress-spinner md-mode="indeterminate"></md-progress-spinner>
      </div>
    </template>

    <!--DIV POUR LE BLACK SCREEN PROGRESS SPINNER-->
    <div id="overlay"></div>
    <!--FIN PROGRESS SPINNER-->

    <h1>Installation du projet</h1>

    <p>Avant tout il faut <strong>télécharger le projet.</strong> Si vous arrivez sur cette page c'est que vous l'avez fait.</p>
    Ensuite rendez-vous dans le dossier du projet.
      
      <h2>Installation du serveur node : </h2>

      <p>Pour installer le projet il faut faire les commandes suivantes: </p>
      <pre v-highlightjs><code class="Batch file">cd serveur</code></pre>puis:
      <pre v-highlightjs><code class="Batch file">npm i</code></pre>

      <h2>Lancer le serveur node : </h2>

       <p>Pour lancer le serveur il faut faire la commande suivante: </p>
      <pre v-highlightjs><code class="Batch file">node .\serverCrudWithMongo.js</code></pre>
       <p>Le serveur se lancera sur le port 80. <strong>Attention vérifier que le serveur est bien lancé !</strong> </p>

      <h2>Installation du client vueJS : </h2>

      <p>Pour installer le projet il faut faire les commandes suivantes <strong>à la racine du projet:</strong> </p>
      <pre v-highlightjs><code class="Batch file">cd clientVueJS\restaurants\</code></pre>puis:
      <pre v-highlightjs><code class="Batch file">npm i</code></pre>

      <h2>Lancer le client : </h2>

      <p>Pour lancer le client il faut faire la commande :</p>
      <pre v-highlightjs><code class="Batch file">npm run serve</code></pre>

    <!--DEBUT Boite de dialog lors du succes de l'ajout des menus-->
    <template id="templateMenu">
      <div>
        <md-dialog-alert
          :md-active.sync="ajoutRestaurantReussi"
          md-title="Félicitation !"
          md-content="Tout les menus des restaurants ont biens étés ajoutés à la base de données."
        />
      </div>
    </template>
    <!--FIN Boite de dialog lors de la suppression d'un restaurant-->

    <!--DEBUT Boite de dialog lors du succes de l'ajout des medias-->
    <template id="templateMedia">
      <div>
        <md-dialog-alert
          :md-active.sync="ajoutMediaReussi"
          md-title="Félicitation !"
          md-content="Tout les medias des restaurants ont biens étés ajoutés à la base de données."
        />
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
      ajoutMediaReussi: false,
      showProgressSpinner: false,
    };
  },
  methods: {
    addMenuToRestaurant() {
      this.afficherLeSpinner();
      fetch("https://valentinbordy.fr/restaurants/api/restaurantsMenu/", {
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
    addMediasToRestaurant() {
      this.afficherLeSpinner();
      fetch("https://valentinbordy.fr/restaurants/api/restaurantsMedia/", {
        method: "put",
      })
        .then((responsePost) => {
          this.cacherLeSpinner();
          console.log(responsePost.status);
          if (responsePost.status == 200) {
            console.log(responsePost);
            this.ajoutMediaReussi = true;
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
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#admin {
  height: 100%;
}
.md-progress-spinner {
  margin-left: 46%;
  position: relative;
  z-index: 46;
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
  z-index: 11999;
}
</style>
