import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import NumberConverter from '../views/NumberConverter.vue'
import TruthTable from '../views/TruthTable.vue'
import FunctionLogigramme from '../views/FunctionLogigramme.vue'
import FunctionSimplification from '../views/FunctionSimplification.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/about',
    component: About
  },
  {
    path : '/numberConverter',
    component : NumberConverter
  },
  {
    path : '/truthTable',
    component : TruthTable
  },
  {
    path : '/functionLogigramme',
    component : FunctionLogigramme
  },
  {
    path : '/functionsimplification',
    component : FunctionSimplification
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
