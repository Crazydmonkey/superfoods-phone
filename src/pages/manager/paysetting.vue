<template>
  <div>
       <van-nav-bar
          title="支付设置"
          left-text="返回"
          left-arrow
          @click-left="onClickLeft"
        />
        <van-cell-group>
            <van-cell  title="支付宝设置" is-link to=""/>
    </van-cell-group>
   </div>     
</template>
<script>
   export default {
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
  }
}
</script>
<style >

</style>