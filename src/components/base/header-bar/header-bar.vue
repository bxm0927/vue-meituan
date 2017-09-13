<!-- 顶部栏 组件 -->

<template>
  <div class="header-bar">
    <i class="icon-arrow_lift" @click="back"></i>
    <h1>{{text}}</h1>
  </div>
</template>

<script>
export default {
  components: {},
  data () {
    return {}
  },
  props: {
    text: {
      type: String,
      default: '商家列表'
    }
  },
  watch: {},
  methods: {
    back () {
      this.$emit('back')
    }
  },
  filters: {},
  computed: {},
  created () {},
  mounted () {}
}
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/const.scss';
@import '~@/assets/scss/mixin.scss';

.header-bar {
  position: fixed;
  top: 0;
  width: 100%;
  height: 42px;
  line-height: 42px;
  background: #fff;
  text-align: center;
  border-bottom: 1px solid rgba(7, 17, 27, 0.1);
  z-index: 10;
  i {
    display: block;
    float: left;
    margin: 12px 0 0 15px;
  }
  h1 {
    display: inline-block;
    line-height: 44px;
    font-size: 17px;
    color: #333;
    margin-left: -15px;
  }
}
</style>
