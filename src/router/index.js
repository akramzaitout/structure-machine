import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home.vue'
import About from '../views/about.vue'
import NumberConverter from '../views/numberConverter.vue'
import TruthTable from '../views/truthTable.vue'
import FunctionLogigramme from '../views/functionLogigramme.vue'
import FunctionSimplification from '../views/functionSimplification.vue'

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
