<template>
  <div id="foods">
    <van-row>
      <van-col span="24">
        <van-search placeholder="请输入搜索关键词" v-model="value" shape="round" @click="search"></van-search>
      </van-col>
    </van-row>
    <div class="content">
      <van-col span="24">
        <van-tabs @click="onClick" sticky>
          <van-tab :title="item.name" v-for="item in category2" :key="item.id" :name="item.id">
            <van-list
              v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              style="margin-bottom:7em"
            >
              <van-card
                v-for="item in foods"
                :key="item.id"
                :num="item.quantity"
                :price="item.price"
                :desc="item.description"
                :title="item.name"
                :thumb="item.picture"
              >
                <div slot="tags">
                  <van-tag plain type="danger">收藏数:{{item.collectionNumber}}</van-tag>
                </div>
                <div slot="num">
                  <van>库存:{{item.quantity}}</van>
                </div>
                <div slot="footer">
                  <!-- <van-button round type="info" size="small" @click="handleAddBuy">加入购物车</van-button> -->
                  <van-button
                    round
                    type="danger"
                    size="small"
                    @click="handleAddBuy(item)"
                    v-if="parseInt(item.quantity)>1"
                  >加入购物车</van-button>
                  <van-button round type="warning" size="small" @click="collectionAdd(item)">收藏</van-button>
                </div>
              </van-card>
            </van-list>
          </van-tab>
        </van-tabs>
      </van-col>

      <!-- 根据商品类别查询， 查看详情-->
      <!-- 商品图片，商品名称，商品的价格，商品库存，商品描述，加入购物车，收藏（#） -->
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import { Toast } from "vant";
export default {
  data() {
    return {
      input: "",
      active: 0,
      value: "",
      loading: false,
      finished: false
    };
  },
  computed: {
    ...mapState("supermarket", ["category2", "foods"]),
    ...mapState("user", ["userinfo"])
  },
  created() {
    this.findAllCategory2().then(res => {
      console.log(res.data[0].id);
      this.findFoodsByCaId(parseInt(res.data[0].id)).then(() => {
        this.finished = true;
        this.loading = false;
      });
    });
  },
  methods: {
    ...mapActions("supermarket", [
      "findAllCategory2",
      "findFoodsByCaId",
      "AddCar",
      "ShouCang"
    ]),
    ...mapActions("cars", ["findAllCarsOrder"]),
    search() {
      this.$router.replace("/searchFoods");
    },
    onClick(name, title) {
      console.log(parseInt(name));
      // 根据商品类别查询
      this.findFoodsByCaId(parseInt(name)).then(() => {
        this.finished = true;
        this.loading = false;
      });
    },
    handleAddBuy(e) {
      console.log(e.id, "商品id");
      // 加入购物车顾客id和商品id
      console.log(this.userinfo, "用户信息");
      this.AddCar({ customerId: this.userinfo.id, goodsId: e.id }).then(() => {
        Toast.success("添加购物车成功");
        this.findAllCarsOrder(this.userinfo.id);
      });
    },
    collectionAdd(e) {
      // 收藏
      console.log(e);
      this.ShouCang({ customerId: this.userinfo.id, goodsId: e.id }).then(
        () => {
          Toast.success("添加购物车成功");
        }
      );
    }
  }
};
</script>
<style scoped>
.content {
  display: flex;
  flex-direction: row;
}
</style>