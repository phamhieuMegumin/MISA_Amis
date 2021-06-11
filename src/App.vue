<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <!--Nav bar  -->
      <NavBar />
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <!-- Header -->
      <Header />
    </v-app-bar>

    <v-main>
      <!-- Main content  -->
      <Content />
    </v-main>
  </v-app>
</template>

<script>
import NavBar from "./components/layout/NavBar.vue";
import Header from "./components/layout/Header.vue";
import Content from "./components/layout/Content.vue";
import "./css/main.css";
export default {
  components: { NavBar, Header, Content },
  data: () => ({ drawer: null }),
};
</script>
