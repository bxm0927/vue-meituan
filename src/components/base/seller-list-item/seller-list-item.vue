<!-- 商家列表 组件 -->

<template>
  <div class="seller-list-item" @click="toRestaurant(data)">
    <div class="left">
      <img v-lazy="data.pic_url">
    </div>

    <div class="right">
      <div class="name">{{ data.name }}</div>

      <div class="mid clearfix">
        <star class="fl" :size="24" :score="data.wm_poi_score"></star>
        <span class="count fl">月售{{ data.month_sale_num }}</span>
        <span class="distance fr">{{ data.distance }}</span>
        <span class="time fr">{{ data.avg_delivery_time }}分钟</span>
      </div>

      <div class="fee">
        <span class="start">{{ data.min_price_tip }}</span>
        <span class="deliver">{{ data.shipping_fee_tip }}</span>
        <span class="average">{{ data.average_price_tip }}</span>
      </div>

      <div class="activity" v-for="sup in data.discounts2">
        <p><img :src="sup.icon_url">{{sup.info}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import Star from '@/components/base/star/star'

export default {
  components: {
    Star
  },
  data () {
    return {}
  },
  props: {
    data: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  watch: {},
  methods: {
    toRestaurant (data) {
      // console.log(data)
      this.$emit('toRestaurant', data)
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

.seller-list-item {
  margin-bottom: 5px;
  display: flex;
  flex-direction: row;
  padding: 10px 0;
  overflow: hidden;
  @include onepx('bottom')
  &:last-child {
    &:after {
      border-top: 0;
    }
  }
  .left {
    flex: 0 0 90px;
    width: 90px;
    img {
      display: block;
      width: 70px;
      margin: 0 auto;
    }
  }
  .right {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding-right: 15px;
    overflow: hidden;
    .name {
      font-size: 17px;
      color: #333;
      overflow: hidden;
      font-weight: bold;
      margin-right: 15px;
      overflow: hidden;
      @include ellipsis(1);
    }
    .mid {
      flex: 1;
      font-size: 12px;
      color: #666;
      margin-top: 7px;
      .star {}
      .count {
        margin-left: 10px;
      }
      .distance {
        margin-left: 5px;
        margin-top: 2px;
      }
      .time {
        @include right-bar();
      }
    }
    .fee {
      flex: 1;
      font-size: 13px;
      margin-top: 7px;
      span {
        display: inline-block;
        color: #656565;
      }
      .start {
        @include right-bar();
      }
      .deliver {
        @include right-bar();
      }
      .average {}
    }
    .activity {
      flex: 1;
      font-size: 13px;
      color: #b0b0b0;
      margin-top: 7px;
      p {
        @include ellipsis(1)
      }
      img {
        width: 16px;
        height: 16px;
        margin-right: 5px;
        vertical-align: top;
      }
    }
  }
}
</style>
