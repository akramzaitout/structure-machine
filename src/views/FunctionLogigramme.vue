<template>
<v-row>
  
  <v-col cols="12">
    
      <div class="logigramme">
        <div class="vars">
          <div 
            v-for="thisVar in vars" 
            :key="thisVar.id"
            :id="'var-'+thisVar.id">
            <div ><span>{{thisVar.id}}</span></div>
            <div v-if="thisVar.hasNot" ><span>!{{thisVar.id}}</span></div>
          </div>
        </div>
        <div style="position: absolute;">
          <div class="gates">
          <div 
            v-for="(gate,index) in gates"
            :key="gate.id"
            :class="gate.type">
              <div class="input">
                <div 
                :style="'left:'+getSizeFromVar(index,gate.from[0])+'px'"
                 ></div>
                <div  
                :style="'left:'+getSizeFromVar(index,gate.from[1])+'px'" ></div>
              </div>
              <div class="output">
                <div></div>
              </div>
            </div>
          </div>
        </div>

      </div>
  </v-col>

</v-row>
</template>
<style>

  .logigramme {
    display: flex;
    height: 100%;
    width: 100%;
  }

  .vars {
    display: flex;
    margin-top: 15px;
  }
  .vars > div {
    display: flex;
  }

  .vars > div:not(:first-of-type) {
    margin-left: 20px;
  }

  .vars > div > div {
    height: 500px;
    width: 5px;
    background-color: #fff;
    margin-left: 10px;
  }
  .vars > div > div > span {
    position: relative;
    bottom: 30px;
    font-size: 20px;
    left: -3px;
  }

  .gates {
    position: relative;
    top: 100px;
    left: 16px;
  }

  .gates > div {
    display: flex;
  }

  .gates > div > div > div {
    height: 5px;
    width: 100px;
    background-color: #fff;
    margin-bottom: 15px;
    position: relative;
  }

  .gates > div > div.input > div::before {
    content: " ";
    width: 9px;
    height: 9px;
    border-radius: 50%;
    background-color: #fff;
    position: relative;
    display: block;
    top: -2px;
    right: 8px;
  }

  .gates > div > div.output {
    position: relative;
    top: 10px;
    left: 25px;
  }

</style>
<script>

const notSize = 15;
const varDistanceSize = 35 + notSize;

export default {
  name: 'FunctionLogigramme',
  data :  () => ({
    vars : [
      { id:'a' , hasNot : true },
      { id:'b' , hasNot : true },
      ],
    gates: [
      { id : 1 , from : [ 'a' , '!a' ] , type : "AND"},
      { id : 2 , from : [ 'b' , '!b' ] , type : "OR" },
    ]
  }),
  methods : {
    getSizeFromVar(index,from){
      let result = varDistanceSize * index;
      console.log( from[0] , from );
      if( from[0] == '!' ){
        result+=notSize;
      }
      return result;
    }
  },
  mounted: function(){

  }
}
</script>
