<template>
  <div id="buycar">
    <van-swipe :autoplay="5000" indicator-color="black">
      <van-swipe-item>
        <van-image src="https://img.yzcdn.cn/vant/cat.jpeg" />
      </van-swipe-item>
      <van-swipe-item>2</van-swipe-item>
      <van-swipe-item>3</van-swipe-item>
      <van-swipe-item>4</van-swipe-item>
    </van-swipe>
    <van-checkbox-group v-model="result" ref="checkboxGroup">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        style="margin-bottom:7em"
      >
        <van-card
          v-for="item in carslist"
          :key="item.goodsId"
          :num="item.quantity"
          :price="item.amount"
          :desc="item.goodsDescription"
          :title="item.goodsName"
          :thumb="item.goodsPicture"
        >
          <div slot="footer">
            <van-stepper
              disable-input
              min="1"
              v-model="item.quantity"
              @plus="onChange(item)"
              @minus="onChange2(item)"
            />
            <van-checkbox style="margin-top:-2em" :name="item" ref="checkboxes" slot="right-icon" />
          </div>
        </van-card>
      </van-list>
    </van-checkbox-group>

    <van-goods-action style="margin-bottom:5em">
      <van-goods-action-button color="#be99ff" type="warning" text="全选" @click="checkAll" />
      <van-goods-action-button color="#be99ff" type="warning" text="清空购物车" @click="deleteAllCar" />
      <van-goods-action-button color="#7232dd" type="danger" text="结算付款" @click="jiesuan" />
    </van-goods-action>
    <!--查看全部订单 结算，给每件商品修改数量。移除 -->
    <!-- 批量结算，清空购物车 -->
    <!-- 结算->详情页面（用户的信息，订单的信息，备注（输入），提交订单） -->
  </div>
</template>
<script>
import Vue from "vue";
import { Swipe, SwipeItem } from "vant";
import { Checkbox, CheckboxGroup, Card, SubmitBar, Toast } from "vant";
import { Stepper } from "vant";
import { mapActions, mapState } from "vuex";
Vue.use(Swipe).use(SwipeItem);
export default {
  components: {
    [Card.name]: Card,
    [Checkbox.name]: Checkbox,
    [SubmitBar.name]: SubmitBar,
    [CheckboxGroup.name]: CheckboxGroup
  },
  data() {
    return {
      result: [],
      checkboxes: [],
      loading: false,
      finished: true,
    };
  },
  computed: {
    ...mapState("cars", ["carslist"]),
    ...mapState("user", ["userinfo"])
  },
  created() {
    //获取用户编号
    var userId = this.userinfo.id;
    console.log("userId:" + userId);
    this.findAllCarsOrder(userId).then(() => {
      this.finished = true;
      this.loading = false;
    });
  },
  methods: {
    ...mapActions("cars", [
      "findAllCarsOrder",
      "deleAll",
      "addGoods",
      "reGoods"
    ]),

    toggle(index) {
      this.$refs.checkboxes[index].toggle();
    },
    checkAll() {
      this.$refs.checkboxGroup.toggleAll(true);
    },
    jiesuan() {
      console.log(this.result);

      this.$router.push({
        path: "/details",
        query: { rs: JSON.stringify(this.result) }
      });
    },
    deleteAllCar() {
      this.deleAll(this.userinfo.id);
    },
    onChange(value) {
      console.log("商品编号：",value.goodsId);
      this.addGoods({ customerId: this.userinfo.id, goodsId: value.goodsId });
    },
    onChange2(value) {
      console.log("订单项编号：",value.id);
      this.reGoods({ customerId: this.userinfo.id, id:value.id });
    }
  }
};
</script>
<style scoped>
.card-goods {
  padding: 10px 0;
  background-color: #fff;
}
.card-goods__item {
  position: relative;
  background-color: #fafafa;
}
.van-checkbox__label {
  width: 100%;
  height: auto;
  padding: 0 10px 0 15px;
  box-sizing: border-box;
}
.van-checkbox__icon {
  top: 50%;
  left: 10px;
  z-index: 1;
  position: absolute;
  margin-top: -10px;
}
.van-card__price {
  color: #f44;
}
</style>