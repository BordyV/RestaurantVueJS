<template>
  <div id="menu">
    <md-app>
      <md-app-toolbar class="md-primary" md-elevation="0">
        <md-button
          class="md-icon-button"
          @click="toggleMenu"
          v-if="!menuVisible"
        >
          <md-icon>menu</md-icon>
        </md-button>
        <span class="md-title">
              <md-icon>restaurant</md-icon>
            Tripadvisar</span>
      </md-app-toolbar>

      <md-app-drawer :md-active.sync="menuVisible" md-persistent="mini">
        <md-toolbar class="md-transparent" md-elevation="0">
          <span>Navigation</span>

          <div class="md-toolbar-section-end">
            <md-button class="md-icon-button md-dense" @click="toggleMenu">
              <md-icon>keyboard_arrow_left</md-icon>
            </md-button>
          </div>
        </md-toolbar>

        <md-list>
          <router-link :to="{ name: 'accueil' }">

          <md-list-item>
            <md-icon>home</md-icon>
            <span class="md-list-item-text">Accueil</span>
          </md-list-item>
          </router-link>

          <router-link :to="{ name: 'addRestaurant' }">
            <md-list-item>
              <md-icon>add_circle</md-icon>
              <span class="md-list-item-text">Ajouter un restaurant</span>
            </md-list-item>
          </router-link>

          <router-link :to="{ name: 'admin' }">
            <md-list-item>
              <md-icon>admin_panel_settings</md-icon>
              <span class="md-list-item-text">Admin</span>
            </md-list-item>
          </router-link>
        </md-list>
      </md-app-drawer>

      <md-app-content>
        <router-view></router-view>
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
export default {
  name: "Menu",
  data: () => ({
    menuVisible: false,
  }),
  methods: {
    toggleMenu() {
      this.menuVisible = !this.menuVisible;
    },
  },
};
</script>

<style scoped>
.md-toolbar.md-theme-default.md-primary
{
    background-color: #2cb978;
}
.md-app {
  min-height: 350px;
  border: 1px solid rgba(#000, 0.12);
}
.md-drawer {
  width: 230px;
}
a:hover {
  cursor: pointer;
}
</style>
