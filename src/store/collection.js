import {get,post,post_array_dots,baseURL} from "../http/axios"
import request from 'axios'
export default {
    namespaced:true,
    state:{
        collectioninfo:{},
    },
    mutations:{
        resetCollection(state,collectioninfo){
            state.collectioninfo = collectioninfo;
        }
    },
    actions:{
        async findAllCollection({commit},data){
            let res = await get("/collection/all?customerId="+data)
            console.log(res);
            let arr = res.data;
            arr.forEach( (item) => {
                item.goodsPicture = baseURL + "/image/" + item.goodsPicture;
              });
            commit("resetCollection",res.data);
            return res;
        },
        async deleteOne(context,data){
            console.log("删除收藏",data)
            let res=await request.delete("/collection?customerId="+data.customerId+"&goodsId="+data.goodsId)
            context.dispatch('findAllCollection',data.customerId)
            return res;
        }

    }
}