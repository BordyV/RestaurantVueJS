<template>
<div id="spinner">
<!--DEBUT PROGRESS SPINNER-->
    <template v-if="showProgressSpinner">
        <div>
            <md-progress-spinner md-mode="indeterminate"></md-progress-spinner>
        </div>
    </template>

    <!--DIV POUR LE BLACK SCREEN PROGRESS SPINNER-->
    <div id="overlay"></div>
    <!--FIN PROGRESS SPINNER-->
</div>
</template>


<script>
export default {
  name: "Spinner",
  data: () => {
    return {
        showProgressSpinner: false,
    };
  },
  methods: {
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
    top: -350px;
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
