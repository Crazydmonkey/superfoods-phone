<template>
  <div id="order">
    <van-nav-bar fixed :title="'我的收藏'" left-text="返回" @click-left="onClickLeft" />
    <div class="content">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        style="margin-bottom:7em"
      >
        <van-card
          v-for="item in collectioninfo"
          :key="item.id"
          :price="item.goodsPrice"
          :desc="item.goodsDescription"
          :title="item.goodsName"
          :thumb="item.goodsPicture"
        >
          <div slot="footer">
            <van-button round type="warning" size="small" @click="unCollection(item)">取消收藏</van-button>
          </div>
        </van-card>
      </van-list>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions, mapGetters } from "vuex";
import { ActionSheet } from "vant";
import { Toast } from "vant";
export default {
  data() {
    return {
      loading: false,
      finished: false,
      show: false,
      reason: "",
      back: {}
    };
  },
  created() {},
  mounted() {
    // this.userInfo.id
    var userId = this.userinfo.id;
    console.log(userId);
    console.log(this.userinfo.id);
    this.findAllCollection(userId).then(res => {
      this.finished = true;
      this.loading = false;
    });
  },
  computed: {
    ...mapState("collection", ["collectioninfo"]),
    ...mapState("user", ["userinfo"])
  },
  methods: {
    ...mapActions("collection", ["findAllCollection", "deleteOne"]),
    onClickLeft() {
      this.$router.go(-1);
      //  this.$router.push({path:"/login",query:{row:"hello"}})

      // 登录页面  this.$route.query.row
    },
    unCollection(a) {
      console.log("--------------------------");
      console.log(a.goodsId);
      this.deleteOne({ customerId: a.customerId, goodsId: a.goodsId }).then(
        () => {
          Toast.success("取消收藏成功");
        }
      );
    }
  }
};
</script>
<style scoped>
#order .content {
  padding-top: 46px;
  padding-bottom: 60px;
}
</style>