import {get,post,post_array_dots} from "../http/axios"
import request from 'axios'
export default {
  namespaced:true,
  state:{
    orders:[],
    message:""
  },
  mutations:{
    resetOrders(state,orders){
      state.orders = orders;
    },
    resetMessage(state,message){
      state.message = message;
    }
  },
  actions:{
    async findAllOrders({commit},data){
      let result =await get("/userOrder/orders?customerId="+data)
      commit("resetOrders",result.data);
      return result;
    },
    async confirmOrder({dispatch},orderId){
      let result = await get("/order/confirmOrder",{orderId})
      dispatch("findCustomerOrders");
      return result;
    },
    // 确认收货
    async ReciveOrders({commit,dispatch},data){
      let result =await request.put("/updateStatus/?orderId="+data.oid+"&status="+"待收货")
      dispatch("findAllOrders",data.cid);
      return result;
    },
    // 催单
    async CuiReciveOrders({commit,dispatch},data){
      let result =await request.put("/setOrderReminder?orderId="+data.oid+"&reminder="+"顾客")
      dispatch("findAllOrders",data.cid);
      return result;
    },
    // 退款
    async BackMoneyOrders({commit,dispatch},data){
      let result =await request.put("/updateCancelReason?orderId="+data.oid+"&reason="+data.reason+"&isCanceled="+"顾客")
      dispatch("findAllOrders",data.cid);
      return result;
    },
  }
}