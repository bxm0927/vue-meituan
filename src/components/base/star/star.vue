<!-- 评星 组件 -->

<template>
  <div class="star" :class="starType">
    <span class="star-item" v-for="item in itemClasses" :class="item"></span>
  </div>
</template>

<script>
const LENGTH = 5
const CLSON = 'on'
const CLSHAlF = 'half'
const CLSOFF = 'off'

export default {
  components: {},
  data () {
    return {}
  },
  props: {
    // 星星尺寸
    size: {
      type: Number,
      default: 48
    },
    // 评分
    score: {
      type: Number,
      default: 0
    }
  },
  watch: {},
  methods: {},
  filters: {},
  computed: {
    // star-on star-half star-off
    starType () {
      return 'star-' + this.size
    },
    // 动态添加 'on' 'half' 'off'
    itemClasses () {
      let result = []
      let score = Math.floor(this.score * 2) / 2
      // 是否有半星（小数）
      let hasDecimal = score % 1 !== 0
      // 有多少个整星
      let integer = Math.floor(score)

      // 整星
      for (let i = 0; i < integer; i++) {
        result.push(CLSON)
      }

      // 半星
      if (hasDecimal) {
        result.push(CLSHAlF)
      }

      // 补齐
      while (result.length < LENGTH) {
        result.push(CLSOFF)
      }

      return result
    }
  },
  created () {},
  mounted () {},
  destroyed () {}
}
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/const.scss';
@import '~@/assets/scss/mixin.scss';

.star {
  .star-item {
    display: inline-block;
    background-repeat: no-repeat;
  }
  &.star-48 {
    .star-item {
      width: 20px;
      height: 20px;
      background-size: 20px 20px;
      margin-right: 22px;
      &:last-child {
        margin-right: 0;
      }
      &.on {
        @include bg-image('img/star48_on');
      }
      &.half {
        @include bg-image('img/star48_half');
      }
      &.off {
        @include bg-image('img/star48_off');
      }
    }
  }
  &.star-36 {
    .star-item {
      width: 15px;
      height: 15px;
      margin-right: 6px;
      background-size: 15px 15px;
      &:last-child {
        margin-right: 0;
      }
      &.on {
        @include bg-image('img/star36_on');
      }
      &.half {
        @include bg-image('img/star36_half');
      }
      &.off {
        @include bg-image('img/star36_off');
      }
    }
  }
  &.star-24 {
    .star-item {
      width: 10px;
      height: 10px;
      margin-right: 3px;
      background-size: 10px 10px;
      &:last-child {
        margin-right: 0;
      }
      &.on {
        @include bg-image('img/star24_on');
      }
      &.half {
        @include bg-image('img/star24_half');
      }
      &.off {
        @include bg-image('img/star24_off');
      }
    }
  }
}
</style>
