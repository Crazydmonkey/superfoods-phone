import {get,post_array} from '../http/axios'
import request from 'axios'
export default {
  namespaced:true,
  state:{
    record:[],
  },
  mutations:{
    setRecord(state,data){
        state.record=data;
    },
  },
  actions:{
    async findRecord(context,data){
        let response=await get('/record',data);
        console.log("搜索历史",response.data);
        context.commit('setRecord',response.data)
        return response;
    },
    async addSearch(context,data){
        let response=await post_array('/record',data);
        console.log("添加搜索历史",response.data);
        let param={customerId:data.customerId};
        context.dispatch('findRecord',param)
        return response;
    },
    async clearSearch(context,data){
        console.log(data);
        console.log(data.customerId);
        let id=data.customerId;
        let response=await request.delete('/record?customerId='+id);
        console.log("清除搜索历史",response.data);
        context.dispatch('findRecord',data)
        return response;
    }
  },
}
