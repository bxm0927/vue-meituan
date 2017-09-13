<!-- 标题栏 组件 -->

<template>
  <div class="title-bar">
    <span>{{ txt }}</span>
  </div>
</template>

<script>
export default {
  components: {},
  data () {
    return {}
  },
  props: {
    txt: {
      type: String,
      default: '附近商家'
    }
  },
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

.title-bar {
  height: 40px;
  line-height: 40px;
  text-align: center;
  span {
    display: inline-block;
    position: relative;
    font-weight: bold;
    color: #333;
    &:before {
      content: '';
      position: absolute;
      top: 20px;
      left: -45px;
      width: 30px;
      // 1px
      border-top: 1px solid #333;
      transform: scaleY(0.5);
    }
    &:after {
      content: '';
      position: absolute;
      top: 20px;
      right: -43px;
      width: 30px;
      // 1px
      border-top: 1px solid #333;
      transform: scaleY(0.5);
    }
  }
}
</style>
