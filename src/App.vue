<template>
  <v-app class="app-root">
    <NavbarComponent />
    <v-main class="app-main">
      <v-container fluid class="pa-6">
        <router-view />
      </v-container>
    </v-main>
    <footer class="app-footer">
      <span class="footer-text">
        Made with <span class="footer-heart">♥</span> by
        <span class="footer-name">Akram Zaitout</span>
        <span class="footer-sep mx-2">·</span>
        {{ currentYear }}
      </span>
    </footer>
  </v-app>
</template>

<script>
import NavbarComponent from "./components/NavbarComponent.vue";
export default {
  name: "AppLayout",
  components: { NavbarComponent },
  data() {
    return {
      currentYear: new Date().getFullYear(),
    };
  },
};
</script>

<style>
/* Global reset to enforce dark bg everywhere */
.v-application {
  background: #0d0d0f !important;
}
.v-application--wrap {
  background: #0d0d0f !important;
}
</style>

<style scoped>
.app-root {
  background: #0d0d0f !important;
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
}
.app-main {
  background: #0d0d0f;
}
.app-footer {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 48px;
  background: #0d0d0f;
  border-top: 1px solid #1a1a28;
}
.footer-text {
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  font-size: .65rem;
  font-weight: 600;
  letter-spacing: .1em;
  text-transform: uppercase;
  color: #2e2e4a;
}
.footer-heart {
  color: #c62828;
  font-size: .75rem;
}
.footer-name {
  color: #4a4a7a;
  font-weight: 800;
}
.footer-sep {
  color: #1e1e30;
}
</style>