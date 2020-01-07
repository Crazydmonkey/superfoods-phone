<template>
  <div class="order">
    <router-view></router-view>
    <div>
      <!-- <router-link to="/home">首页</router-link>
      <router-link to="/order">订单</router-link>
      <router-link to="/user">我的</router-link> -->
      <van-tabbar v-model="active" route>
      <van-tabbar-item replace to="/super" name="index" icon="shop">超市</van-tabbar-item>
      <van-tabbar-item replace to="/foods" name="index" icon="goods-collect">美食</van-tabbar-item>
      <van-tabbar-item replace to="/buycar" name="index" icon="cart">购物车</van-tabbar-item>
      <van-tabbar-item replace to="/order" name="order" icon="alipay">订单</van-tabbar-item>
      <van-tabbar-item replace to="/owner" name="my" icon="friends">我的</van-tabbar-item>
    </van-tabbar>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return {
      active:0
    }
  },
  methods:{
    tabChangeHandler(path){
      this.$router.push({path})
    }
  }
}
</script>