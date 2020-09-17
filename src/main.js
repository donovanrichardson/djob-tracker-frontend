import Vue from "vue";
import App from "./App.vue";
import router from "./router";
// import Buefy from "buefy";
// import "buefy/dist/buefy.css";

// Vue.use(Buefy);

import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrashAlt, faStar as fasStar} from '@fortawesome/free-solid-svg-icons'
import {faStar as farStar} from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

Vue.component('font-awesome-icon', FontAwesomeIcon)

library.add(faTrashAlt)
library.add(fasStar)
library.add(farStar)

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
