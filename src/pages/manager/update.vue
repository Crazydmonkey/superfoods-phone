<template>
    <div>
       <van-nav-bar
          title="修改个人信息"
          left-text="返回"
          left-arrow
          @click-left="onClickLeft"
        />
        <van-cell-group>
                <van-cell  title="昵称" is-link to="updateNick"/>
                <van-cell  title="头像" is-link to="updateHead"/>
                <van-cell  title="性别" is-link to="updateGender"/>
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