<template>
  <div>
    <van-nav-bar title="我的" @click-right="onClickRight">
      <van-icon name="setting" slot="right" />
    </van-nav-bar>

    <div id="headPortriatDiv">
      <img class="user-poster" :src="userinfo.headPortrait" />
    </div>

    <van-cell-group class="user-group" :border="border">
      <van-cell :title="userinfo.nickname" style="text-align:center;" />
      <van-cell :title="userinfo.gender" style="text-align:center;" />
    </van-cell-group>

    <van-cell-group>
      <van-cell icon="points" title="我的收藏" is-link to="collection" />
      <van-cell icon="points" title="我的地址" is-link to="address" />
      <van-cell icon="gold-coin-o" title="关于我们" is-link to="our" />
      <van-cell icon="gold-coin-o" title="退出" is-link to="login" />
    </van-cell-group>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      border: false
    };
  },
  computed: {
    ...mapState("user", ["userinfo"])
  },
  methods: {
    onClickRight() {
      this.$router.replace("/setting");
    }
  }
};
</script>

<style  scoped>
#headPortriatDiv {
  text-align: center;
}
.user-poster {
  width: 25%;
  /*display: block;*/
  margin: 0 auto;
}
.user-links {
  margin-bottom: 15px;
}
.user-group {
  padding: 15px 0;
  font-size: 12px;
  background-color: #fff;
}
.van-icon {
  display: block;
  font-size: 24px;
}
</style>
