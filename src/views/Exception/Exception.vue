<template>
  <div class="not-found">
    <img src="../../assets/img/404.png" class="img" />
    <p>未找到页面</p>
    <a-button type="primary" @click="() => $router.back()">返回</a-button>
  </div>
</template>

<script>
  export default {
    setup() {
      return {};
    },
  };
</script>

<style lang="scss" scoped>
  .not-found {
    text-align: center;
  }
  .img {
    width: 500px;
  }
  p {
    color: rgb(28, 49, 119);
    font-size: 48px;
    font-weight: 700;
  }
</style>
