<template>
  <div>
    <van-nav-bar title="修改昵称" left-text="返回" left-arrow @click-left="onClickLeft" />
    <van-field v-model="userinfo.nickname" placeholder="请输入昵称" />
    <div class="footer">
      <van-button type="danger" size="large" round @click="confirm">确认修改</van-button>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  computed: {
    ...mapState("user", ["userinfo"])
  },
  methods: {
    ...mapActions("user",["updateUserInfo"]),
    onClickLeft() {
      this.$router.go(-1);
    },
    confirm() {
      this.updateUserInfo(this.userinfo);
      this.$dialog
        .alert({
          // title:'标题呀',
          message: "修改成功"
        })
    }
  }
};
</script>
<style >
</style>