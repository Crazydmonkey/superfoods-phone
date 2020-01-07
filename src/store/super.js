import { get, post_json, post_array } from '../http/axios'
import { baseURL } from '../http/axios'

export default {
  namespaced: true,
  state: {
    category: [],
    category2: [],
    supershop: [],
    foods: []
  },

  mutations: {
    setCategory(state, data) {
      state.category = data;
    },
    setCategory2(state, data) {
      state.category2 = data;
    },
    setSuperShop(state, data) {
      state.supershop = data;
    },
    setFoods(state, data) {
      state.foods = data;
    }
  },

  actions: {
    async findAllCategory(context, data) {
      let response = await get('/findGoods/goodsCategory/shopping')
      context.commit('setCategory', response.data)
      return response;
    },
    async findAllCategory2(context, data) {
      let response = await get('/findGoods/goodsCategory/food')
      context.commit('setCategory2', response.data)
      return response;
    },
    async findSuperByCaId(context, data) {
      //console.log("baseURL:---------------", baseURL);
      let response = await get('/findGoods/goods/' + data);
      response.data.forEach((item) => {
        item.picture = baseURL + "/image/" + item.picture;
        // if(item.collectionNumber>0){
        //   item.flag=true;
        // }else{
        //   item.flag=false
        // }
      })
      context.commit('setSuperShop', response.data)
      return response;
    },
    async findFoodsByCaId(context, data) {
      let response = await get('/findGoods/goods/' + data)
      response.data.forEach((item) => {
        item.picture = baseURL + "/image/" + item.picture;
      })
      context.commit('setFoods', response.data)
      return response;
    },
    // 加入购物车
    async AddCar(context, data) {
      let response = await post_array('/setShoppingCar', data)
      // context.commit('setSuperShop',response.data)
      return response;
    },
    // 收藏
    async ShouCang(context, data) {
      let response = await post_array('/collection', data)
      // context.commit('setSuperShop',response.data)
      return response;
    },
  }
}