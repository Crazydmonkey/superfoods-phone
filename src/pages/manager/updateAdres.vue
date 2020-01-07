<template>
    <div>
       <van-nav-bar
          title="修改地址"
          left-text="返回"
          left-arrow
          @click-left="onClickLeft"
        />
        <van-field v-model="userinfo.address"  />
        <div>
        <van-button type="danger" size="large" round @click="confirm();update()">确认修改</van-button>
        </div>
    </div>
</template>
<script>
import {mapState,mapActions} from "vuex"
   export default {
    computed:{
    ...mapState("user",["userinfo"])
  },
  methods: {
    ...mapActions("user",["updateUserInfo"]),
    onClickLeft() {
      this.$router.replace('address')
    },
    update(){
      console.log(this.userinfo.address);
      this.updateUserInfo(this.userinfo);
    },
    confirm(){
        this.$dialog.alert({
           // title:'标题呀',
           message:'修改成功'
        })
    }
  }
}
</script>
<style >

</style>