<template>
<v-row>

  <v-col cols="12">
    <v-card>
      <v-col cols="12">
      <v-text-field
        label="Function"
        v-model="functionExp"
        @change="generateTable"
        @click:clear="clearEvent"
        clearable
      ></v-text-field>
      </v-col>
    </v-card>
  </v-col>

  <v-col cols="12">
    <v-row
      align="start"
      justify="center"
      no-gutters
    >
      <template v-if="(table).length > 0" >
        <v-col 
          v-for="(item,index) in table"
          :key="index"
        >
          <v-card
            class="text-center font-weight-bold"
          >
            <div class="title">
              {{ item.exp }}
            </div>
            
              <div
                v-for="(element,index) in (item.result)"  
                :key="index"
                class="tableElement"
              >
                {{ element }}
              </div>
            
          </v-card>
        </v-col>
      </template>
      <template v-else >
        <v-col
          cols="12">
            <v-card
              class="pa-10 headline">
              Write Function to generate Truth Table
            </v-card>
        </v-col>
      </template>
    </v-row>
  </v-col>
</v-row>
</template>
<style>
  .tableElement:nth-child(2n+1) {
    background: rgba(255, 255, 255, 0.07);
  }
</style>
<script>

import TruthTable from "../truthTable";

export default {
  name: 'TruthTable',
  data : () => ({
    functionExp : '',
    table : []
  }),
  methods : {
    generateTable() {
      this.table = new TruthTable(this.functionExp).result().result;
      console.log("function :",this.functionExp , "table :" , this.table);
    },
    clearEvent() {
      this.table = [];
    }
  }
}
</script>
