<template>
<div>
  <v-row
          align="center"
          justify="center"
        >
    <v-col 
      v-for="(item , index) in items" 
      :key="index"
      cols="12"
      sm="12"
      md="6" 
      class="text-center"
    >
      <item-component :item="item" ></item-component>
    </v-col>

  </v-row>
</div>
</template>
<script>

import itemComponent from '../components/testComponent.vue'

var socket = null;

export default {
  name: 'Home',
  data : () => ({
    items : [
      {title:"Number Conventer" , function : "convert numbers from any Base to Any base and calcule his value with 3 Methods." , routerLink : "/numberConverter" , src : "base"},
      {title:"Truth Table" , function : "Generate Truth Table of any function from its expressions." , routerLink : "/truthTable" , src:"truthtable"},
      //{title:"Drow Function" , function : "Draw the electrical circuit of any function from its expressions."  , routerLink : "/functionLogigramme" , src:"drowfunction"},
      {title:"Sumplify Function" , function : "Simplifying the expression of any logical function to the simplest possible." , routerLink : "/functionsimplification" , src:"sfuncition"}
    ]
  }),
  components : {
    itemComponent
  }
}
</script>
