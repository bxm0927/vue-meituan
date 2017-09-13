<!-- 发现 项目 组件 -->

<template>
  <div class="find-item">
    <div class="top">
      <img v-lazy="data.img">
    </div>

    <div class="bottom">
      <div class="title">{{data.title}}</div>
      <div class="writer">周边生活</div>
      <div class="view">{{data.view}}人看过</div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data () {
    return {}
  },
  props: {
    data: {
      type: Object
    }
  },
  watch: {},
  methods: {},
  filters: {},
  computed: {},
  created () {},
  mounted () {}
}
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/const.scss';
@import '~@/assets/scss/mixin.scss';

.find-item {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 300px;
  color: #333;
  background-color: #fff;
  padding: 15px;
  box-sizing: border-box;
  margin-bottom: 10px;
  .top {
    width: 100%;
    height: 160px;
    overflow: hidden;
    img {
      width: 100%;
      height: 160px;
    }
  }
  .bottom {
    width: 100%;
    height: 100px;
    position: relative;
    margin-top: 10px;
    .title {
      font-size: 18px;
      font-weight: bold;
      @include ellipsis(2);
    }
    .writer {
      color: #999;
      font-size: 14px;
      margin-top: 10px;
    }
    .view {
      position: absolute;
      bottom: 0;
      color: #999;
      font-size: 14px;
    }
  }
}
</style>
