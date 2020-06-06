<template>
  <div>
    <v-toolbar
      dark
      prominent
      color="deep-orange"
      class="mainColor"
      src=""
    >
        <v-row
          align="center"
          justify="center">
          <v-col
            cols="10">
            <v-row>
              <v-col
                cols="3"
                lg="1"
                md="2"
                sm="3">
                <v-img
                  src="../assets/computer-chip2size.png"
                  alt="logo"
                  height="75"
                  contain
                ></v-img>
              </v-col>
              <v-col 
                cols="9"
                lg="11"
                md="10"
                sm="9">
                <div class="display-1 font-weight-black align-items text-uppercase font-weight-black">
                  <span>Structure</span><br>
                  <span>Machine</span>
                </div>
              </v-col>
            </v-row>
          </v-col>
          <v-col
            cols="2">
            <v-btn 
            to="/"
            icon>
              <v-icon>mdi-home</v-icon>
            </v-btn>
            <v-btn to="/about" icon>
              <v-icon>mdi-information</v-icon>
            </v-btn>
          </v-col>
        </v-row>

    </v-toolbar>
  </div>
</template>
<style>
  .mainColor {
    background: #fb4a18;
    background: -webkit-linear-gradient(to bottom, #fb4a18, #ea0c25);
    background: linear-gradient(to bottom, #fb4a18, #ea0c25);
  }
</style>
<script>
  export default {
    data () {
      return {

      }
    },
  }
</script>