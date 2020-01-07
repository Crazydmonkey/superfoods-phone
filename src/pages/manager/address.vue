<template>
    <div>
       <van-nav-bar
          title="地址"
          left-text="返回"
          right-text="修改"
          left-arrow
          @click-left="onClickLeft"
          @click-right="onClickRight"
        />
        <van-cell value="" >
                <!-- 使用 title 插槽来自定义标题 -->
                <template slot="title">
                  <span class="custom-title">地址</span>
                  <van-tag type="danger">默认</van-tag>
                </template>
        
        </van-cell>
        <van-cell :value="userinfo.address" />
        
    </div>
</template>
<script>
import {mapState,mapActions} from "vuex"
  export default {
    data(){
      return{
      };

    },
    created(){
  },
  mounted(){

  },
  computed:{
    ...mapState("user",["userinfo"])
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
    onClickRight(){
      this.$router.replace('updateAdres')
    }
  }
}
</script>
<style >

</style>