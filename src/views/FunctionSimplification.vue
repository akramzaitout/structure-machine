<template>
<div>
<v-row
  align="center"
  justify="center">
  <v-col
    cols="12">
    <v-card>
      <v-card-title
        class="font-weight-bold">
          Add | Edit Variables & Functions
      </v-card-title>
    
    <v-divider></v-divider>

    <v-btn
      class="ma-2 white--text"
      v-show="varsList.length == 0"
      disabled
      >
      No Variables
    </v-btn>

    <v-menu 
      v-for="(item,index) in varsList"
      :key="item"
      offset-y>
        <template v-slot:activator="{ on }">
          <v-btn
            color="cyan accent-2"
            dark
            class="ma-2"
            v-on="on"
          >
          {{ item }}
          <v-icon right dark>mdi-pencil</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            @click="onEdit(index,'var')">
            <v-list-item-icon>
              <v-icon right dark>
                mdi-pencil
              </v-icon>
              </v-list-item-icon>
            <v-list-item-title>Edit</v-list-item-title>
          </v-list-item>        
          <v-list-item
            @click="onDelete(index,'var')">
            <v-list-item-icon>              
              <v-icon right dark>
                mdi-delete
              </v-icon></v-list-item-icon>
            <v-list-item-title>Delete</v-list-item-title>
          </v-list-item>
        </v-list>
    </v-menu>

    <v-btn
      color="black"
      class="ma-2 ml-7 white--text"
      v-show=" varsList.length < 8 "
      @click="onAdd('var')">
      add
      <v-icon right dark>mdi-plus-thick</v-icon>
    </v-btn>

    <v-divider></v-divider>

    <v-btn
      class="ma-2 white--text"
      v-show="resultsList.length == 0"
      disabled
      >
      No Functions
    </v-btn>

    <v-menu 
      v-for="(item,index) in resultsList"
      :key="item"
      offset-y>
        <template v-slot:activator="{ on }">
          <v-btn
            color="cyan accent-2"
            dark
            class="ma-2"
            v-on="on"
          >
          {{ item }}
          <v-icon right dark>mdi-pencil</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            @click="onEdit(index,'fun')">
            <v-list-item-icon>
              <v-icon right dark>
                mdi-pencil
              </v-icon>
              </v-list-item-icon>
            <v-list-item-title>Edit</v-list-item-title>
          </v-list-item>        
          <v-list-item
            @click="onDelete(index,'fun')">
            <v-list-item-icon>              
              <v-icon right dark>
                mdi-delete
              </v-icon></v-list-item-icon>
            <v-list-item-title>Delete</v-list-item-title>
          </v-list-item>
        </v-list>
    </v-menu>

    <v-btn
      color="black"
      class="ma-2 ml-7 white--text"
      v-show=" resultsList.length < 8 "
      @click="onAdd('fun')">
      add
      <v-icon right dark>mdi-plus-thick</v-icon>
    </v-btn>

  </v-card>

  </v-col>

  <template
    v-if="varsList.length > 0 && resultsList.length > 0" >
    <v-col 
      cols="12">
      <v-row
        align="start"
        justify="center"
        no-gutters
      >
          <v-col 
            v-for="(item,exp) in resultVars"
            :key="exp"
          >
            <v-card
              class="text-center font-weight-bold"
            >
              <div class="title grey">
                {{ exp }}
              </div>
              <v-divider></v-divider>
                <div
                  v-for="(element,index) in (item)"
                  :key="index"
                  class="tableElement"
                >
                  {{ element }}
                </div>
              
            </v-card>
          </v-col>
          <v-divider
            class="mx-4"
            inset
            vertical
          ></v-divider>
          <v-col 
            v-for="(item,exp) in table.results"
            :key="exp"
          >
            <v-card
              class="text-center font-weight-bold"
            >
              <div class="title grey">
                {{ exp }}
              </div>
              <v-divider></v-divider>
                <div
                  v-for="(element,index) in (item)"
                  @click="toggleItem( exp , index )"  
                  :key="index"
                  v-text="element"
                  class="tableElement"
                >
                </div>
              
            </v-card>
          </v-col>
      </v-row>
    </v-col>

    <v-col
      cols="12">
      <v-btn 
      :disabled="generated" 
      block
      @click="generateFunction" 
      color="red accent-4" 
      dark>
        {{ ( generated === false ) ? "Generate Functions" : "Functions Generated" }}
      </v-btn>
    </v-col>
    <v-col
      cols="12">
        <div
          v-for="(item,exp) in result"
          :key="exp"
          class="text-center display-1">
          <kbd>{{ exp }} = <code>{{ item }}</code></kbd>
        </div>
    </v-col>
  </template>
  <template v-else>
    <v-col
      cols="12">
        <v-card
          class="pa-10 headline">
          There are no
          {{ (varsList.length == 0) ? "variables" : "" }}
          {{ (varsList.length == 0 && resultsList.length == 0) ? " and" : "" }}
          {{ (resultsList.length == 0) ? " functions" : "" }}
        </v-card>
    </v-col>
  </template>

</v-row>


  <v-row justify="center">
    <v-dialog v-model="deleteDialog" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">Confirmation</v-card-title>
        <v-card-text>
          Are you sure you want to permanently delete the {{(dialogType == "var") ? "variable":"function"}}?
          </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey darken-1" text @click="deleteDialog = false">cancel</v-btn>
          <v-btn color="red darken-1" text @click="deleteVar()">delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>

<v-row justify="center">
    <v-dialog v-model="editDialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">
            {{ (selectedEdit == null) ? "Add" : "Edit" }} {{(dialogType == "var") ? "Variable":"Function"}}
            </span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field 
                min="1" 
                max="3" 
                v-model="editModel" 
                :label="((dialogType == 'var') ? 'Variable':'Function') +' Name'" 
                required></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey darken-1" text @click="editDialog = false">Close</v-btn>
          <v-btn color="green darken-1" text @click="editVar()"> 
            {{ (selectedEdit == null) ? "add" : "save" }}
            </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>

</div>

</template>


<style>
  .tableElement:nth-child(2n+1) {
    background: rgba(255, 255, 255, 0.07);
  }
</style>
<script>

import TruthTable from "../truthTable";
import Simplification from "../simplificationFunction";
let tableGenerate = new TruthTable();

export default {
  name: 'FunctionSimplification',
  data : () => ({
    varsList : ["a","b"],
    resultsList : [ "F"  ],
    table : {
      results : {}
    },
    result : {},
    generated : false,
    deleteDialog: false,
    editDialog: false,
    dialogType: "" ,
    editModel : "",
    selectedDelete : null,
    selectedEdit : null
  }),
  methods : {
    toggleItem( exp , elementIndex ) {

      this.table.results[ exp ][elementIndex] = ( this.table.results[ exp ][elementIndex] === 0 ) ? 1 : 0 ;
      this.result = {};
      this.generated = false;
      this.$forceUpdate();
    },
    fillResults() {
      this.table.results = {};
      for( let item in this.resultsList ) {
        this.table.results[ this.resultsList[item] ] = [];
        for( let i = 0 ; i < this.howManyTime ; i++ ) {
          this.table.results[ this.resultsList[item] ].push( 0 );
        }
      }
      this.$forceUpdate();
    },
    generateFunction() {

      this.result = {};

      let proVars = Object.keys(this.resultVars);  
			let varsResult = [];

			for(let i=0;i<this.resultVars[proVars[0]].length;i++) {
				let text = "";
				for(let j=0;j<proVars.length;j++){
					text+=this.resultVars[proVars[j]][i];
				}
				varsResult.push(text);
      }
      
      this.resultsList.forEach( (item) => {
        this.result[ item ] = Simplification(  
          { 
            final: { 
              exp : item ,
              result:this.table.results[ item ] 
            },
            varsOrder : varsResult
          }  
          , [...this.varsList]  ) ;

      });

      this.generated = true;
      this.$forceUpdate();

    },
    onDelete(index,type){
      this.selectedDelete = index;
      this.dialogType = type;
      this.deleteDialog = true;
    },
    onEdit(index,type){
      this.selectedEdit = index;
      
      if( type == "var" ){
        this.editModel = this.varsList[index];
      } else {
        this.editModel = this.resultsList[index];
      }
      this.dialogType = type;
      this.editDialog = true;
    },
    onAdd(type){
      this.selectedEdit = null;
      this.editModel = "";
      this.dialogType = type;
      this.editDialog = true;
    },
    deleteVar(){
      if( this.selectedDelete != null ){
        if( this.dialogType == "var" ){
          this.varsList.splice( this.selectedDelete , 1);
        } else {
          this.resultsList.splice( this.selectedDelete , 1);
        }
        this.selectedDelete = null;
        this.deleteDialog = false;
      }
    },
    editVar(){
      if( this.selectedEdit != null && this.editModel != "" ){
        if( this.dialogType == "var" ){
          this.varsList[this.selectedEdit] = this.editModel;
        } else {
          this.resultsList[this.selectedEdit] = this.editModel;
          this.fillResults();
        }
      } else if( this.selectedEdit == null && this.editModel != "" ){
        if( this.dialogType == "var" ){
          this.varsList.push(this.editModel);
        } else {
          this.resultsList.push(this.editModel);
        }
      }
      this.result = {};
      this.generated = false;
      this.selectedEdit = null;
      this.editDialog = false;
    }
  },
  computed : {
    howManyTime: function() {
      return Math.pow(2, this.varsList.length );
    },
    resultVars : {
      cache: false,
      get: function(){
        return tableGenerate.prob(this.varsList); 
      }
    }
  },
  watch : {
    howManyTime: function() {
      this.fillResults();
    },
    resultsList: function() {
      this.result = {};
      this.generated = false;
      this.fillResults();
    }
  },
  created : function() {
    this.fillResults();
  }
}
</script>