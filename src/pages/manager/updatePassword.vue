<template>
  <div>
    <van-nav-bar title="修改密码" left-text="返回" left-arrow @click-left="onClickLeft" />
    <van-field type="password" v-model="password1" placeholder="请输入密码" />
    <van-field type="password" v-model="password2" placeholder="请再一次输入密码" />
    <div class="footer">
      <van-button type="danger" size="large" round @click="confirm">确认修改</van-button>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      password1: "",
      password2: ""
    };
  },
  computed: {
    ...mapState("user", ["userinfo"])
  },
  methods: {
    ...mapActions("user", ["updateUserInfo"]),
    onClickLeft() {
      this.$router.go(-1);
    },
    confirm() {
      if (this.password1 == this.password2) {
        this.userinfo.password = this.password1;
        this.updateUserInfo(this.userinfo);
        this.$dialog.alert({
          // title:'标题呀',
          message: "修改成功"
        });
      } else {
        this.$dialog.alert({
          // title:'标题呀',
          message: "两次输入密码不一致"
        });
      }
      this.password1 = "";
      this.password2 = "";
    }
  }
};
</script>
<style >
</style>