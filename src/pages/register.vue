<template>
  <div>
    {{user}}
    <van-cell-group>
      <van-field
        v-model="user.account"
        required
        clearable
        label="账号"
        placeholder="请输入账号"
        @blur="isEmpty"
        :error-message="requiredError.account"
      />

      <van-field
        v-model="user.password"
        type="password"
        label="密码"
        placeholder="请输入密码"
        required
        @blur="isEmpty"
        :error-message="requiredError.password"
      />
      <van-field
        v-model="password1"
        type="password"
        label="确认密码"
        placeholder="请再次输入密码"
        required
        @blur="check"
        :error-message="passwordCheck"
      />
    </van-cell-group>

    <van-cell-group>
      <van-field
        v-model="user.nickname"
        label="昵称"
        placeholder="请输入昵称"
        required
        @blur="isEmpty"
        :error-message="requiredError.nickname"
      />
      <van-field
        v-model="user.address"
        label="地址"
        placeholder="请输入地址"
        required
        @blur="isEmpty"
        :error-message="requiredError.address"
      />
    </van-cell-group>

    <van-cell-group>
      <van-field v-model="user.realName" label="真实姓名" placeholder="请输入真实姓名" />
      <!-- <van-field v-model="user.gender" label="性别" placeholder="请输入性别" /> -->
      <van-field v-model="user.phoneNumber" label="电话号码" placeholder="请输入电话号码" />
    </van-cell-group>性别
    <van-radio-group v-model="user.gender">
      <van-radio name="男">男</van-radio>
      <van-radio name="女">女</van-radio>
    </van-radio-group>头像
    <van-uploader
      :after-read="afterRead"
      :preview-image="preview"
      v-model="fileList"
      :max-count="maxCount"
    />

    <br />
    <van-button type="primary" text="注册" @click="commit" />
  </div>
</template>


<script>
import Vue from "vue";
import { Field } from "vant";
import { Uploader } from "vant";
import { Button } from "vant";
import { RadioGroup, Radio } from "vant";
import { Toast } from 'vant';

Vue.use(Field);
Vue.use(Uploader);
Vue.use(Button);
Vue.use(RadioGroup);
Vue.use(Radio);
Vue.use(Toast);

import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      user: {
        account: "",
        password: "",
        address: "",
        gender: "",
        headPortrait: "",
        nickname: "",
        phoneNumber: "",
        realName: ""
      },
      password1: "",
      passwordCheck: "",
      requiredError: {
        account: "",
        password: "",
        nickname: "",
        address: ""
      },
      file: "",
      preview: true,
      fileList: [],
      maxCount: 1
    };
  },
  computed: {
    //...mapState("register", ["user"])
  },
  methods: {
    ...mapActions("register", ["register"]),
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      this.file = file.file;
    },
    isEmpty(event) {
      //console.log(event.originalTarget.placeholder);
      // if(event.originalTarget.placeholder = ""){

      // }
      let content = event.originalTarget.value;
      if (content == "") {
        //this.requiredError = "内容不能为空";
        return true;
      } else {
        //this.requiredError = "";
        return false;
      }
    },
    check() {
      if (this.user.password == this.password1) {
        this.passwordCheck = "";
        return true;
      } else {
        this.passwordCheck = "两次输入的密码不一致";
        return false;
      }
    },
    commit() {
      if(this.file == ""){
        Toast('请选择头像');
        return ;
      }
      console.log(this.file);
      console.log(this.user);
      if (this.check()) {
        this.register({ headPortrait: this.file, user: this.user }).then((response) => {
          if (response.status == 200) {
            this.$router.push("/login");
          }
        });
      }
    }
  }
};
</script>


<style scoped>
</style>