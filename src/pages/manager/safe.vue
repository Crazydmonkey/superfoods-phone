<template>
  <div>
       <van-nav-bar
          title="账号安全"
          left-text="返回"
          left-arrow
          @click-left="onClickLeft"
        />
        <van-cell-group>
            <van-cell  title="密码" is-link to="updatePassword"/>
            <van-cell  title="手机号" is-link to="updatePhone"/>
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