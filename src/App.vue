<template>
  <div id="app">
    <!-- 为了某些页面的全屏效果，tab 栏放在各内容页 -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  components: {},
  name: 'app'
}
</script>

<style>
body {
  background-color: #ebebeb;
}

#app {
  font-family: Arial,Helvetica,sans-serif;
}
</style>
