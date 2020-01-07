<template>
    <div id="search">
        <van-row>
            <van-col span="24">
                <van-search placeholder="请输入搜索关键词" v-model="value" autofocus=true show-action shape="round" @search="onSearch">
                    <div slot="action"  @click="onSearch">搜索</div>                  
                </van-search>               
            </van-col>            
        </van-row>
        
        <div id="content">
            <van-row >
                <van-col span="8" >历史搜索:</van-col>
                <van-col span="5" offset="10"><van-button size=small type="primary" @click="clear">清除</van-button></van-col>                   
                <div id="tag">
                    <van-tag plain type="primary" size="large" v-for="item in record" :key="item" @click="tagSearch($event)">
                        {{item.keyword}}
                    </van-tag>
                </div>
            </van-row>
        </div>

                
    </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import { Toast } from 'vant';
export default {
    data(){
        return {
            value:'',
            
        }
    },
    computed:{
        ...mapState('search',['record']),
        ...mapState('user',['userinfo']),
        
    },
    created(){
        this.findRecord({customerId:this.userinfo.id})
    },
    methods: {
       ...mapActions('search',['findRecord','addSearch','clearSearch']),   
          
        onSearch(value) {
            // 加入搜索记录顾客id和keyword           
            this.addSearch({customerId:this.userinfo.id,keyword:this.value})
            ,          
            this.$router.replace({path:'/searchFoodsResult' ,query:{id:this.value}})
            
        },   
        search(){
            console.log(this.value)
        },
        clear(){
            console.log("删除")
            this.clearSearch({customerId:this.userinfo.id})
        },
        tagSearch(event){
            this.$router.replace({path:'/searchFoodsResult' ,query:{id:event.target.innerText}})
            console.log(event.target.innerText);
        },
        
    }
}
</script>
<style scoped>
   
</style>