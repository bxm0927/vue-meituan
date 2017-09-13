<!-- 底部导航栏 组件 -->

<template>
  <ul class="tab-bar">
    <!-- ?_? 当设置 to="/" 时，首页ico总是高亮，搞不懂 ?_? -->
    <router-link class="index" tag="li" to="/index">
      <i class="ico-index"></i>
      <span>首页</span>
    </router-link>

    <router-link class="find" tag="li" to="/find">
      <i class="ico-find"></i>
      <span>发现</span>
    </router-link>

    <router-link class="order" tag="li" to="/order">
      <i class="ico-order"></i>
      <span>订单</span>
    </router-link>

    <router-link class="mine" tag="li" to="/mine">
      <i class="ico-mine"></i>
      <span>我的</span>
    </router-link>
  </ul>
</template>

<script>
export default {
  components: {},
  data () {
    return {}
  },
  props: {},
  watch: {},
  methods: {},
  filters: {},
  computed: {},
  created () {},
  mounted () {},
  destroyed () {}
}
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/const.scss';
@import '~@/assets/scss/mixin.scss';

.tab-bar {
  @include onepx();
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 50px;
  text-align: center;
  display: flex;
  flex-direction: row;
  background-color: #fcfcfc;
  li {
    flex: 1;
    color: #999;
    display: block;
    i {
      display: block;
      width: 25px;
      height: 25px;
      margin: 3px auto;
      background: url('./tab-icons.png') no-repeat;
      background-size: 25px auto;
    }
    span {
      display: block;
      font-size: 12px;
    }
  }

  li.router-link-active {
    color: #333;
  }

  .ico-index {
    background-position: 0 -75px;
  }
  .index.router-link-active .ico-index {
    background-position: 0 -50px;
  }

  .ico-find {
    background-image: url('./find.png');
  }
  .find.router-link-active .ico-find {
    background-image: url('./find1.png');
  }

  .ico-order {
    background-position: 0 -25px;
  }
  .order.router-link-active .ico-order {
    background-position: 0 0;
  }

  .ico-mine {
    background-position: 0 -125px;
  }
  .mine.router-link-active .ico-mine {
    background-position: 0 -100px;
  }
}
</style>
