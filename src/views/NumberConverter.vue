<template>
<div>
<v-row>
  <v-col cols="12" sm="12" md="6">
    <v-row>
      <v-col cols="12">
        <v-text-field
          label="Binary"
          v-model="numbers.binary"
          outlined
        ></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-text-field
          label="Octal"
          v-model="numbers.octal" 
          outlined
        ></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-text-field
          label="Decimal"
          v-model="numbers.decimal"
          @click:clear="clearFunction()" 
          outlined
          clearable
        ></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-text-field
          label="Hexadecimal"
          v-model="numbers.hexadecimal"
          outlined
        ></v-text-field>
      </v-col>
    </v-row>
  </v-col>
  <v-col cols="12" sm="12" md="6">
    <v-row justify="center">
      <v-col cols="12">
        <v-card ref="form">
          <v-card-text>

            <div class="d-flex" >
                <v-col 
                  cols="3"
                >
                  <v-text-field
                    label="Bits"
                    hint="Bits"
                    v-model="convert.avaibleBits"
                    type="number"
                    min=0
                    solo
                    persistent-hint
                  ></v-text-field>
                </v-col>
                <v-col 
                  cols="5"
                >
                  <v-select
                    label="Convert Method"
                    hint="Convert Method"
                    v-model="convert.method"
                    :items="methods"
                    persistent-hint
                    solo
                  ></v-select>
                </v-col>
                <v-col 
                  cols="4"
                >
                  <v-select
                    label="Number Base"
                    hint="Number Base"
                    persistent-hint
                    v-model="convert.number.base"
                    :items="bases"
                    solo
                  ></v-select>
                </v-col>
            </div>
            <v-col 
              cols="12"
            >
              <v-text-field
                label="Number"
                v-model="convert.number.value"
                filled
              ></v-text-field>
            </v-col>

            <v-alert 
              v-if="(convert.isOverflow)"
              color="red darken-2"
              type="error">
              Overflow
            </v-alert>

            <div 
              v-show="!(convert.isOverflow)" 
              class="d-flex"
            >
              <v-col 
                v-for="(bit,index) in convertValue"
                :key="index"
              >
                <v-card
                  outlined
                  height="40"
                  class="text-center align-content-center font-weight-bold"
                >
                  <div 
                    v-text="bit"
                  >
                  </div>
                </v-card>
              </v-col>
            </div>

            <v-col v-show="!(convert.isOverflow)"
              cols="12"
            >
              <div class="decimalValue text-center display-2">
                <span>({{ convert.number.value }})
                  <span class="baseSmall">
                    {{ convert.number.base }}
                  </span>
                    = ({{ convertNumber }})
                  <span class="baseSmall">10</span>
                </span>
              </div>
            </v-col>
          </v-card-text>

        </v-card>
      </v-col>
    </v-row>
  </v-col>
</v-row>
</div>
</template>
<style>
  .baseSmall {
        font-size: 15px;
  }
</style>
<script>

import Base from "@/base"

export default {
  name: 'NumberConverter',
  data : () => ({
    numbers: {
      binary: '1111',
      octal : '17',
      decimal : '15',
      hexadecimal : 'F'
    },
    convert : {
      avaibleBits : 8,
      method : "SVA",
      number : {
        base : 16,
        value : "FA12"
      },
      isOverflow:true
    },
    bases: [ 16, 10, 8, 2 ],
    methods: ['SVA', 'Ca1', 'Ca2']
  }),
  methods: {
    clearFunction() {
      let self = this;
      setTimeout(function(){
        self.numbers.binary = '0';
        self.numbers.octal = '0';
        self.numbers.decimal = '0';
        self.numbers.hexadecimal = '0';
       },100);

    }
  },
  watch: {
    'numbers.binary' : function(v){
      this.numbers.decimal = Base.convertFromBTo10( v != " " ? v : "0"  ,2);
    },
    'numbers.octal' : function(v){
      this.numbers.decimal = Base.convertFromBTo10( v != " " ? v : "0"  ,8);
    },
    'numbers.decimal' : function(v){
      this.numbers.binary = Base.convertFrom10ToB(v != " " ? v : 0,2);
      this.numbers.octal = Base.convertFrom10ToB(v != " " ? v : 0,8);
      this.numbers.hexadecimal = Base.convertFrom10ToB(v != " " ? v : 0,16);
    },
    'numbers.hexadecimal' : function(v){
      this.numbers.decimal = Base.convertFromBTo10( v != " "  ? v : "0"  ,16);
    },
    convertValue : function(value) {
      this.convert.isOverflow = ( value === false ) ? true : false;
    }
  },  
  computed: {
    convertNumber : function() {
        if ( this.convertValue != false ) {
            let sign = 1;
            let em = 0;
            let result = this.convertValue;
            if ( (result)[0] == 1 ) {
              sign = -1;
              if( this.convert.method == "SVA"){
                em = -128;
              } else {
                result = "";
                for(let i = 1 ; i < (this.convertValue).length ; i++){
                  result += ((this.convertValue[i]) == "0" ? "1" : "0" );
                }
                if( this.convert.method == "Ca2" ) {
                  em = 1;
                }
              }
            }
          return (Base.convertFromBTo10(result,2)+em)*sign;
        } else {
          return 0;
        }
    },
    convertValue : function() {
      var N = Base.convertBase( this.convert.number.value , this.convert.number.base , 2 );
      if( N.length == this.convert.avaibleBits ) {
          return N;
        } else if ( N.length < this.convert.avaibleBits ) {
          let result = "";
          for ( let i = 0 ; i < this.convert.avaibleBits - N.length ;i++){
            result+= "0";
          }
          result+= N;
          console.log(result);
          return result;
        } else {
          return false;
        }
    },
    isOverflow : function() {
      return true
    }
  },
}
</script>
