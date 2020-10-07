import Vue from 'vue'
import VueMaterial from 'vue-material'
import VueRouter from 'vue-router'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import RestaurantDetail from './components/Restaurant/RestaurantDetail/RestaurantDetail'
import RestaurantAccueil from './components/Restaurant/RestaurantAccueil'
// import { LMap, LTileLayer, LMarker } from 'vue2-leaflet';
import 'leaflet/dist/leaflet.css';

import App from './App.vue'

Vue.config.productionTip = false

Vue.use(VueMaterial)
Vue.use(VueRouter)
// Vue.component('l-map', LMap);
// Vue.component('l-tile-layer', LTileLayer);
// Vue.component('l-marker', LMarker);

const router = new VueRouter({
  routes:  [
    { path: '/', component: RestaurantAccueil },
    { path: '/detail/:id',name:'detail', component: RestaurantDetail, props:true },
    { path: '*', component: RestaurantAccueil },
  ],
  mode: 'history'
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
