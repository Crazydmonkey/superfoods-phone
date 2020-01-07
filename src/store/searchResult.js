import {get,post_json,post_array} from '../http/axios'
export default {
  namespaced:true,
  state:{
    category:[],
    category2:[],
    supershop:[],
    foods:[]
  },
  mutations:{
    setCategory(state,data){
        state.category=data;
    },
    setCategory2(state,data){
      state.category2=data;
    },
    setSuperShop(state,data){
      state.supershop=data;
    },
    setFoods(state,data){
      state.foods=data;
    }
  },
  actions:{
    
    async findSuperByKeyword(context,data){
      //模糊查找超市商品
      let response=await get('/findGoods/goods/shopping/'+data)
      console.log(response);
      response.data.forEach((item)=>{
        item.picture="http://192.168.0.182:8888/image/"+item.picture;
      })
      context.commit('setSuperShop',response.data)
      return response;
    },
    async findFoodsByKeyword(context,data){
      //模糊查找餐饮商品
      let response=await get('/findGoods/goods/food/'+data)
      console.log(response);
      response.data.forEach((item)=>{
        item.picture="http://192.168.0.182:8888/image/"+item.picture;
      })
      context.commit('setSuperShop',response.data)
      return response;
    },
    async findFoodsByCaId(context,data){
      
      let response=await get('/findGoods/goods/'+data)
      response.data.forEach((item)=>{
        item.picture="http://192.168.0.182:8888/image/"+item.picture;
      })
      context.commit('setFoods',response.data)
      return response;
    },
    // 加入购物车
    async AddCar(context,data){
      let response=await post_array('/setShoppingCar',data)
      // context.commit('setSuperShop',response.data)
      return response;
    },
    // 收藏
    async ShouCang(context,data){
      let response=await post_array('/collection',data)
      // context.commit('setSuperShop',response.data)
      return response;
    },
  }
}