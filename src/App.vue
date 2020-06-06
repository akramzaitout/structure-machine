<template>
  <v-app id="inspire">

    <navbar-component></navbar-component>

      <v-container fluid>
          <router-view></router-view>
      </v-container>

      <div 
      class="mt-10"></div>

      <v-footer
        class="footerColor text-center"
        app
      >
        <div class="text-uppercase">
          Made with ❤️ By <span class="font-weight-black">akram zaitout</span>
        </div>
      </v-footer>
  </v-app>
</template>
<style>
 .footerColor {
    background-color: #ea0c25 !important;
    border-color: #ea0c25 !important;
 }
</style>
<script>

  import navbarComponent from "./components/navbarComponent.vue"

  export default {
    components : {
      navbarComponent
    },
    data: () => ({

    }),
    created () {
      this.$vuetify.theme.dark = true;
    }
  }
</script>