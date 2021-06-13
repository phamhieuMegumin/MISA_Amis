import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import vueDebounce from "vue-debounce";
Vue.config.productionTip = false;

Vue.use(vueDebounce, {
  listenTo: "input",
});
new Vue({
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
