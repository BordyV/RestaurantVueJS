//vue default
import Vue from 'vue'
import VueRouter from 'vue-router'

//vue material
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

//component pour routes
import RestaurantDetail from './components/Restaurant/RestaurantDetail/RestaurantDetail'
import RestaurantAccueil from './components/Restaurant/RestaurantAccueil'
import Admin from './components/Admin'

//leaflet bibliotheque
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'; // Re-uses images from ~leaflet package
import 'leaflet-defaulticon-compatibility';


import App from './App.vue'

Vue.config.productionTip = false

Vue.use(VueMaterial)
Vue.use(VueRouter)

const router = new VueRouter({
  routes:  [
    { path: '/', component: RestaurantAccueil },
    { path: '/admin', component: Admin },
    { path: '/detail/:id',name:'detail', component: RestaurantDetail, props:true },
    { path: '*', component: RestaurantAccueil },
  ],
  mode: 'history'
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
