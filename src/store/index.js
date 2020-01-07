import Vue from 'vue'
import Vuex from 'vuex'
import order from './order'
import user from './user'
import supermarket from './super'
import cars from './car'
import search from './search'
import searchResult from './searchResult'
import collection from './collection'
import register from './register'

Vue.use(Vuex)

export default new Vuex.Store({
  modules:{
    order,
    user,
    supermarket,
    cars,
    search,
    searchResult,
    collection,
    register
  }
})
