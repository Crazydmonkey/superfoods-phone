<template>
  <div><van-nav-bar
    title="设置"
    left-text="返回"
    left-arrow
    @click-left="onClickLeft"
  />
  <van-cell-group>
      <van-cell  title="修改个人信息" is-link to="update"/>
      <van-cell  title="账号安全" is-link to="safe"/>
      <van-cell  title="支付设置" is-link to="paysetting"/>
  </van-cell-group>
  </div>

</template>
<script>
export default {
  methods: {
    onClickLeft() {
      this.$router.replace('/owner')
    },
  }
}
</script>
<style >

</style>