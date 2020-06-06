<template>
  <v-card
    :to="item.routerLink"
    color="grey darken-4"
    height="100%"
    dark
  >
  <v-row
      align="start"
      justify="center">
    <v-col
      cols="9"
      md="10"
      sm="9"
      align-self="center"
      justify="start"
      height="100%">
      <div class="d-flex flex-no-wrap justify-space-between">
        <div>
          <v-card-title
            class="headline text-uppercase font-weight-bold"
            v-text="item.title"
          ></v-card-title>
          <v-card-subtitle v-text="item.function"></v-card-subtitle>
        </div>
      </div>
    </v-col>
    <v-col
      cols="3"
      md="2"
      sm="3"
      align-self="center"
      justify="start">
      <v-img class="mr-4" contain :src="require('@/assets/images/'+item.src+'.png')"></v-img>
    </v-col>
  </v-row>
  </v-card>
</template>
<style>
  .itemColor {
    background-color: #ea0c25 !important;
  }
</style>
<script>

export default {
    props: ['item'],
    data : () => ({

    }),
}

</script>

 
  