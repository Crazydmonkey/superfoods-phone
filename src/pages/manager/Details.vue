<template>
  <div>
    <div>
      <van-nav-bar title="确认订单" left-text="返回" left-arrow @click-left="onClickLeft" />

      <van-cell-group>
        <van-cell title="地址" :value="userinfo.address" />
        <van-cell title="联系人" :value="userinfo.nickname" />
        <van-cell title="支付方式" value="支付宝" />
      </van-cell-group>
      <van-divider />

      <div>
        <van-cell title="订单内容" />
        <van-grid :border="false" :column-num="3">
          <van-grid-item text="名称" />
          <van-grid-item text="数量" />
          <van-grid-item text="金额" />
        </van-grid>
        <van-grid v-for="item in orderItemsShow" :key="item.id" :border="false" :column-num="3">
          <van-grid-item :text="item.goodsName" />
          <van-grid-item :text="item.quantity" />
          <van-grid-item :text="item.amount" />
        </van-grid>
      </div>
      <van-divider />

      <!-- <van-cell title="订单备注" value="口味、偏好" is-link to="remark" /> -->
      <van-submit-bar  button-text="提交订单" @submit="showPopup" />
      <van-popup v-model="show" position="bottom" :style="{ height: '50%' }">
        <van-cell title="支付金额" :value="totalAmount" />
        <van-cell title="支付方式" value="支付宝" />
        <van-button type="danger" size="normal" @click="commitOrder">确认</van-button>
      </van-popup>
    </div>
    <van-field v-model="notes" rows="1" autosize label="订单备注" type="textarea" placeholder="请输入备注" />
    <!-- <van-button type="danger" @click="commitOrder">提交订单</van-button> -->
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import qs from "qs";
export default {
  data() {
    return {
      show: false,
      address: "test",
      orderItems: [],
      orderItemsShow: [],
      notes: "",
      totalAmount:0
    };
  },
  computed: {
    ...mapState("user", ["userinfo"])
    // ...mapState('cars',['']),
  },
  created() {
    this.getOrderItems();
  },

  methods: {
    ...mapActions("cars", ["costMoney", "payMoney"]),
    onClickLeft() {
      this.$router.go(-1);
    },
    showPopup() {
      this.show = true;
    },
    getOrderItems() {
      //return console.log(JSON.parse(this.$route.query.rs));
      this.orderItems = JSON.parse(this.$route.query.rs);
      this.orderItemsShow = JSON.parse(this.$route.query.rs);
      this.orderItemsShow.forEach(item => {
        console.log(item);
        item.quantity = "x" + item.quantity;
        item.amount = "￥" + item.amount;
      });
     
      this.orderItems.forEach(item => {
        this.totalAmount = this.totalAmount + item.amount;
      });

    },
    commitOrder() {
      console.log(JSON.parse(this.$route.query.rs));
      var obj = JSON.parse(this.$route.query.rs);
      var amount = 0;
      var orderItemIds = [];
      obj.forEach(item => {
        amount += item.amount;
        orderItemIds.push(item.id);
      });
      //amount this.userInfo.id methodsOfPayment:"支付宝" notes:this.notes
      this.costMoney({
        amount,
        customerId: this.userinfo.id,
        methodsOfPayment: "支付宝",
        notes: this.notes,
        orderItemIds: qs.stringify(
          { orderItemIds },
          {
            arrayFormat: "repeat"
          }
        )
      }).then(res => {
        // 订单id
        let orderId = res.data;
        // this.$router.push('http://1)
        // this.payMoney(13)
        this.payMoney(amount);
        window.location.href = "http://192.168.1.101:8889/pay?orderId=" + orderId;
      });
    }
  }
};
</script>
<style >
</style>