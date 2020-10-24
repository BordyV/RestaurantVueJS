<template>

  <div id="app">
    <link rel="stylesheet" href="//fonts.googleapis.com/css?family=Roboto:400,500,700,400italic|Material+Icons">
    <Menu></Menu>
  </div>
</template>

<script>
import Menu from './components/Menu'

export default {
  name: 'App',
  components: {
    Menu
  }

}
</script>

<style>
.md-app {
    min-height: 350px;
    border: 1px solid rgba(#000, .12);
  }
.md-drawer {
    width: 230px;
  }
a:hover {
  cursor: pointer;
}
</style>
