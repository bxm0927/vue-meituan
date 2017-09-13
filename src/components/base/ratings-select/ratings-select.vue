<!-- 选择评价类型（全部、推荐、吐槽） 组件 -->

<template>
  <div class="ratings-select">
    <div class="type">
      <span class="block positive" @click="select(2, $event)" :class="{'active':selectType===2}">
        {{desc.all}}<span class="count">{{ratings.length}}</span>
      </span>

      <span class="block positive" @click="select(0, $event)" :class="{'active':selectType===0}">
        {{desc.positive}}<span class="count">{{positiveLength.length}}</span>
      </span>

      <span class="block negative" @click="select(1, $event)" :class="{'active':selectType===1}">
        {{desc.negative}}<span class="count">{{negativeLength.length}}</span>
      </span>
    </div>

    <div class="switch" @click="switchContent" :class="{'on':onlyContent===true}">
      <i class="icon-check_circle"></i>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>

<script>
// 正面评价、负面评价、所有
const POSITIVE = 0
const NEGATIVE = 1
const ALL = 2

export default {
  components: {},
  data () {
    return {}
  },
  props: {
    // 记录所有评价数组
    ratings: {
      type: Array,
      default () {
        return []
      }
    },
    // 界面组件文字(外面可以传入)
    desc: {
      type: Object,
      default () {
        return {
          all: '全部',
          positive: '满意',
          negative: '不满意'
        }
      }
    },
    // 选择哪种评价
    selectType: {
      type: Number,
      default: ALL
    },
    // 只显示有内容的评价(默认关闭，显示全部)
    onlyContent: {
      type: Boolean,
      default: false
    }
  },
  watch: {},
  methods: {
    // 切换评价类型
    select (type, event) {
      if (!event._constructed) {
        return
      }
      // this.selectType = type
      this.$emit('select', type)
    },
    // 切换只显示有内容的评价
    switchContent (event) {
      if (!event._constructed) {
        return
      }
      // this.onlyContent = !this.onlyContent
      this.$emit('switchContent', this.onlyContent)
    }
  },
  computed: {
    positiveLength () {
      return this.ratings.filter((rating) => {
        return rating.rateType === POSITIVE
      })
    },
    negativeLength () {
      return this.ratings.filter((rating) => {
        return rating.rateType === NEGATIVE
      })
    }
  },
  created () {},
  mounted () {}
}
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/const.scss';
@import '~@/assets/scss/mixin.scss';

.ratings-select {
  .type {
    padding: 18px 0;
    margin: 0 18px;
    font-size: 0;
    @include onepx('bottom');
    .block {
      display: inline-block;
      padding: 8px 12px;
      margin-right: 8px;
      border-radius: 2px;
      font-size: 12px;
      line-height: 16px;
      color: rgb(77, 85, 93);
      &.active {
        color: #fff;
      }
    }
    .positive {
      background-color: rgba(0, 160, 220, 0.2);
      &.active {
        background-color: rgba(0, 160, 220, 1.0);
      }
    }
    .negative {
      background-color: rgba(77, 85, 93, 0.2);
      &.active {
        background-color: rgba(77, 85, 93, 1.0);
      }
    }
    .count {
      font-size: 8px;
      margin-left: 2px;
    }
  }
  .switch {
    padding: 12px 18px;
    line-height: 24px;
    color: rgb(147, 153, 159);
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    i {
      display: inline-block;
      margin-right: 4px;
      width: 16px;
      height: 16px;
      line-height: 16px;
      color: #fff;
      border: 1px solid #ccc;
      background-color: #fff;
      border-radius: 50%;
    }
    &.on i {
      background-color: #00c850;
      color: #fff;
    }
    .text {
      font-size: 14px;
    }
  }
}
</style>
