<template>
  <v-container class="py-10">
    <v-row class="mb-6">
      <v-col cols="12" class="text-center">
        <h1 class="display-2 font-weight-black text-uppercase mb-2">
          Dashboard
        </h1>
        <p class="subtitle-1 grey--text">Select a tool to start your logic analysis</p>
      </v-col>
    </v-row>

    <v-row align="stretch" justify="center">
      <v-col 
        v-for="(item, index) in items" 
        :key="index"
        cols="12"
        sm="6"
        md="4"
        class="d-flex" 
      >
        <ItemComponent :item="item" class="flex-grow-1" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ItemComponent from '../components/ItemComponent.vue'

export default {
  name: 'Home',
  components: { ItemComponent },
  data() {
    return {
      items: [
        {
          title: "Number Converter",
          function: "Convert numbers between bases and calculate values using SVA, Ca1, or Ca2.",
          routerLink: "/numberConverter",
          src: "base"
        },
        {
          title: "Truth Table",
          function: "Generate complete truth tables from any logical expression.",
          routerLink: "/truthTable",
          src: "truthtable"
        },
        {
          title: "Simplify Function",
          function: "Simplify logical functions to their most minimal Boolean expression.",
          routerLink: "/functionsimplification",
          src: "sfuncition"
        }
      ]
    }
  }
}
</script>

<style scoped>
/* Ensures the container doesn't hug the screen edges on ultra-wide monitors */
.v-container {
  max-width: 1200px;
}
</style>