<template>
  <div id="order">
    <van-nav-bar fixed :title="'我的订单'" />
    <div class="content">
      <van-tabs v-model="activeName">
        <van-tab title="全部订单" name="a">
          <van-card
            v-for="item in orders"
            :key="item.id"
            :num="item.quantity"
            :price="item.amount"
            :desc="'下单时间:  '+item.orderTime"
            :title="'订单号:  '+item.id"
          >
            <div slot="footer">
              <van-button
                round
                type="danger"
                v-if="item.status=='待收货'"
                size="small"
                @click="okShou(item)"
              >确认收货</van-button>
              <van-button
                round
                type="danger"
                v-if="item.status=='待收货'||item.status=='待发货'"
                size="small"
                @click="cuidan(item)"
              >催单</van-button>
              <van-button
                round
                type="danger"
                v-if="item.status=='待收货'||item.status=='待发货'"
                size="small"
                @click="backmoney(item)"
              >退款</van-button>
              <van-button round type="warning" size="small">{{item.status}}</van-button>
            </div>
          </van-card>
        </van-tab>

        <van-tab title="待接单" name="b">
          <van-card
            v-if="item.status=='待接单'"
            v-for="item in orders"
            :key="item.id"
            :num="item.quantity"
            :price="item.amount"
            :desc="'下单时间:  '+item.orderTime"
            :title="'订单号:  '+item.id"
          >
            <div slot="footer">
              <van-button round type="warning" size="small">{{item.status}}</van-button>
            </div>
          </van-card>
        </van-tab>

        <van-tab title="待发货" name="c">
          <van-card
            v-if="item.status=='待发货'"
            v-for="item in orders"
            :key="item.id"
            :num="item.quantity"
            :price="item.amount"
            :desc="'下单时间:  '+item.orderTime"
            :title="'订单号:  '+item.id"
          >
            <div slot="footer">
              <van-button
                round
                type="danger"
                v-if="item.status=='待发货'"
                size="small"
                @click="cuidan(item)"
              >催单</van-button>
              <van-button
                round
                type="danger"
                v-if="item.status=='待发货'"
                size="small"
                @click="backmoney(item)"
              >退款</van-button>
              <van-button round type="warning" size="small">{{item.status}}</van-button>
            </div>
          </van-card>
        </van-tab>
        <van-tab title="待收货" name="d">
          <van-card
            v-if="item.status=='待收货'"
            v-for="item in orders"
            :key="item.id"
            :num="item.quantity"
            :price="item.amount"
            :desc="'下单时间:  '+item.orderTime"
            :title="'订单号:  '+item.id"
          >
            <div slot="footer">
              <van-button
                round
                type="danger"
                v-if="item.status=='待收货'"
                size="small"
                @click="okShou(item)"
              >确认收货</van-button>
              <van-button
                round
                type="danger"
                v-if="item.status=='待收货'"
                size="small"
                @click="cuidan(item)"
              >催单</van-button>
              <van-button
                round
                type="danger"
                v-if="item.status=='待收货'"
                size="small"
                @click="backmoney(item)"
              >退款</van-button>
              <van-button round type="warning" size="small">{{item.status}}</van-button>
            </div>
          </van-card>
        </van-tab>
        <van-tab title="已完成" name="e">
          <van-card
            v-if="item.status=='已完成'"
            v-for="item in orders"
            :key="item.id"
            :num="item.quantity"
            :price="item.amount"
            :desc="'下单时间:  '+item.orderTime"
            :title="'订单号:  '+item.id"
          >
            <div slot="footer">
              <van-button round type="warning" size="small">{{item.status}}</van-button>
            </div>
          </van-card>
        </van-tab>
        <van-tab title="已取消" name="f">
          <van-card
            v-if="item.status=='已取消'"
            v-for="item in orders"
            :key="item.id"
            :num="item.quantity"
            :price="item.amount"
            :desc="'下单时间:  '+item.orderTime"
            :title="'订单号:  '+item.id"
          >
            <div slot="footer">
              <van-button round type="warning" size="small">{{item.status}}</van-button>
            </div>
          </van-card>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions, mapGetters } from "vuex";
import Vue from "vue";
import { Cell, CellGroup } from "vant";

Vue.use(Cell).use(CellGroup);
export default {
  data() {
    return {
      activeName: "a"
    };
  },
  created() {
    console.log("aaaaa");
    this.findAllOrders(this.userinfo.id);
  },
  computed: {
    ...mapState("order", ["orders"]),
    ...mapState("user", ["userinfo"])
    //...mapGetters("order",["ordersFilter"])
  },
  methods: {
    ...mapActions("order", [
      "findAllOrders",
      "confirmOrder",
      "CuiReciveOrders",
      "BackMoneyOrders"
    ]),
    //根据状态查找订单
    status() {
      this.findStatusOrders(this.userinfo.id);
    },
    okShou(v) {
      console.log(v);
      // this.userInfo.id
      this.ReciveOrders({ oid: v.id, cid: 1 });
    },
    //催单
    cuidan(v) {
      this.CuiReciveOrders({ oid: v.id, cid: 1 });
    },
    //退款
    backmoney(v) {
      this.show = true;
      this.back = v;
    },
    closeTui() {
      console.log(111);
      this.reason = "";
    },
    queRenBack() {
      console.log(this.back.id, this.reason);
      this.BackMoneyOrders({ oid: this.back.id, reason: this.reason, cid: 1 });
      this.show = false;
    },
    confirmHandler(orderId) {
      this.confirmOrder(orderId).then(result => {
        this.$toast(result.statusText);
      });
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