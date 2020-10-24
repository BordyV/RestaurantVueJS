<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="./CarteMenuStyle.css" scoped></style>

<template src="./CarteMenuTemplate.html"></template>


<script>
export default {
  name: "CarteMenu",
  props: ["idRestaurant"],
  filters: {
    capitalize: function (value) {
      if (!value) return "";
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
  },
  data: () => {
    return {
      lesMenus: undefined,
    };
  },
  mounted() {
    if (this.idRestaurant) {
      this.getMenusByRestaurantId(this.idRestaurant);
    }
  },
  methods: {
    getMenusByRestaurantId(id) {
      var url = "http://localhost:80/api/restaurants/menu/" + id;
      fetch(url)
        .then((response) => {
          response.json().then((data) => {
            this.lesMenus = data.menu;
            console.log(this.menu);
          });
        })
        .catch((err) => {
          console.error(err);
          alert(
            "Une erreur est survenue lors du chargement des menus du restaurant."
          );
        });
    },
  },
};
</script>