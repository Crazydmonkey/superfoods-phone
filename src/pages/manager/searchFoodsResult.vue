<template>
    <div id="foods">
        <van-row>
            <van-col span="24">
                <van-search placeholder="请输入搜索关键词" v-model="value" shape="round" @click="search">
                </van-search>
            </van-col>
        </van-row>
        <div class="content">
             <van-col span="24">
               <van-tabs  @click="onClick" sticky>
                    
                         <van-list
                         v-model="loading"
                            :finished="finished"
                            finished-text="没有更多了"
                            style="margin-bottom:7em"
                            >
                           
                             <van-card v-for="item in supershop" :key="item.id"

                                :price="item.price"
                                :desc="item.description"
                                :title="item.name"
                                :thumb="item.picture"
                                >
                                <div slot="tags">
                                    <van-tag plain type="danger">收藏数:{{item.collectionNumber}}</van-tag>

                                  </div>
                                  <div slot="num">
                                    <van>库存:{{item.quantity}}</van>

                                </div>
                            
                                <div slot="footer">
                                    <!-- <van-button round type="info" size="small" @click="handleAddBuy">加入购物车</van-button> -->
                                            <van-button round type="danger" size="small" @click="handleAddBuy(item)">加入购物车</van-button>
                                            <van-button round type="warning" size="small" @click="collectionAdd(item)">收藏</van-button>
                                </div>
                                </van-card>
                           
                       
                    </van-list>
                        
                   

               </van-tabs>
           
            </van-col>
            <!-- 根据商品类别查询-->
            <!-- 商品图片，商品名称，商品的价格，商品库存，商品描述，加入购物车，收藏（#） -->

        </div>

           
                
    </div>
</template>
<script>
import Vue from 'vue';
import { mapActions, mapState } from 'vuex'
import { Toast } from 'vant';
export default {
    data(){
        return {
            input: '',
            active:0,
            value:'',
            loading: false,
            finished: false,
        }
    },
    computed:{
        ...mapState('searchResult',['category','supershop']),
        ...mapState('user',['userinfo'])
    },
    created(value){
            this.findFoodsByKeyword(this.$route.query.id).then(()=>{
                this.finished=true;
                this.loading=false
            })
    },
    methods: {
        ...mapActions('searchResult',['findFoodsByKeyword','AddCar','ShouCang']),
        search(){
            this.$router.replace("/searchFoods").then(()=>{
                this.finished=true;
                this.loading=false
            })

        },
        onClick(name, title) {
           
        },
        handleAddBuy(e){
            console.log(e.id,"商品id")
            // 加入购物车顾客id和商品id
            console.log(this.userinfo,"用户信息")
            this.AddCar({customerId:this.userinfo.id,goodsId:e.id}).then(()=>{
                Toast.success('添加购物车成功');
            })
        },
        collectionAdd(e){
             console.log(e.id,"商品id")
            // 加入收藏顾客id和商品id
            console.log(this.userinfo.id,"用户信息")
            this.ShouCang({customerId:this.userinfo.id,goodsId:e.id}).then(()=>{
                Toast.success('添加收藏成功');
            })
        },
    }
}
</script>
<style scoped>
    .content{
        display: flex;
        flex-direction: row;
    }
</style>