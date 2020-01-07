<template>
       <van-nav-bar
          title="关于我们"
          left-text="返回"
          left-arrow
          @click-left="onClickLeft"
        />
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