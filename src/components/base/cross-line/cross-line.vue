<!-- 横线分隔条 组件 -->

<template>
  <div class="cross-line"></div>
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

.cross-line {
  width: 100%;
  height: 16px;
  background-color: #ebebeb;
  // border-top: 1px solid rgba(7, 17, 27, 0.1);
  // border-bottom: 1px solid rgba(7, 17, 27, 0.1);
}
</style>
