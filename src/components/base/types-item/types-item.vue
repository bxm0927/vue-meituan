<!-- 种类单个 组件 -->

<template>
  <div class="types-item" @click="toList">
    <img :src="ico">
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
    ico: {
      type: String,
      default: ''
    },
    txt: {
      type: String,
      default: ''
    }
  },
  watch: {},
  methods: {
    toList () {
      this.$emit('toList')
    }
  },
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

.types-item {
  float: left;
  width: 25%;
  padding-top: 14px;
  img {
    display: block;
    width: 50px;
    margin: 0 auto 12px;
  }
  span {
    display: block;
    font-size: 14px;
    line-height: 14px;
    text-align: center;
    color: #2f2f2f;
  }
}
</style>
