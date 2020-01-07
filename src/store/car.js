import request from 'axios'
import { get, post_json, post_array, baseURL} from '../http/axios'
export default {
  namespaced: true,
  state: {
    carslist: []
  },
  mutations: {
    refreshCars(state, data) {
      state.carslist = data;
    }
  },
  actions: {
    async findAllCarsOrder(context, data) {
      let result = await get("/orderItems?customerId=" + data);
      var arr = result.data;
      arr.forEach( (item) => {
        item.goodsPicture = baseURL + "/image/" + item.goodsPicture;
      });
      //console.log(arr, "所有货物");
      context.commit('refreshCars', arr);
    },
    async deleAll(context, data) {
      let res = await request.delete('/removeAll?customerId=' + data);
      context.dispatch('findAllCarsOrder', data);
      return res;
    },
    // 增加商品
    async addGoods(context, data) {
      let response = await post_array('/setShoppingCar', data);
      console.log(response);
      context.dispatch('findAllCarsOrder', data.customerId);
      return response;
    },
    //减少商品
    async reGoods(context, data) {
      let response = await post_array('/reductShoppingCar', {"id":data.id});
      context.dispatch('findAllCarsOrder', data.customerId);
      return response;
    },
    // 结算功能
    async costMoney(context, data) {
      let res = await get('/userOrder/order?' + data.orderItemIds + "&amount=" + data.amount + "&methodsOfPayment=" + data.methodsOfPayment + "&notes=" + data.notes + "&customerId=" + data.customerId);
      // context.dispatch('findAllCarsOrder',data.customerId)
      return res;
    },
    //付款
    async payMoney(context, data) {
      let res = await get('/receiveNotify?orderId=' + data);
      // context.dispatch('findAllCarsOrder',data.customerId)
      return res;
    }
  }
}