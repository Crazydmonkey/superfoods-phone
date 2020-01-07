<template>
  <div>
    <van-nav-bar title="修改头像" left-text="返回" left-arrow @click-left="onClickLeft" />
    <van-uploader v-model="fileList" multiple :max-count="1" :after-read="afterRead" />
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
      fileList: [
        //{ url: "default" }
        // Uploader 根据文件后缀来判断是否为图片文件
        // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
      ],
      file: ""
    };
  },
  computed: {
    ...mapState("user", ["userinfo"])
  },
  methods: {
    ...mapActions("user", ["updateUserInfo", "updateHeadPortrait"]),
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      this.file = file.file;
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    confirm() {
      this.updateHeadPortrait({
        headPortrait: this.file,
        originalName: this.userinfo.headPortrait,
        userinfo: this.userinfo
      });
      this.$dialog.alert({
        // title:'标题呀',
        message: "修改成功"
      });
    }
  }
};
</script>
<style >
</style>