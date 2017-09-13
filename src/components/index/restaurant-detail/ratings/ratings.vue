<!-- 商家模块 评价页面 -->

<template>
  <div class="ratings" ref="ratingsRef">
    <div class="ratings-content">
      <!-- 概览 -->
      <div class="overview">
        <div class="left">
          <h1 class="score">{{seller.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{seller.rankRate}}%</div>
        </div>

        <div class="right">
          <div class="service">
            <span class="title">服务态度</span>
            <star :size="36" :score="seller.serviceScore"></star>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="goods">
            <span class="title">商品评分</span>
            <star :size="36" :score="seller.foodScore"></star>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="delivery">
            <span class="title">送达时间</span>
            <span class="time">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>

      <!-- 横线分隔条 -->
      <cross-line></cross-line>

      <ratings-select :ratings="ratings"
                      :desc="desc"
                      :selectType="selectType"
                      :onlyContent="onlyContent"
                      @select="select"
                      @switchContent="switchContent"></ratings-select>

      <div class="rating-wrapper">
        <ul>
          <li class="rating-item" v-for="rating in ratings" v-show="needShow(rating.rateType, rating.text)">
            <div class="avatar">
              <img :src="rating.avatar">
            </div>

            <div class="content">
              <h1 class="name">{{rating.username}}</h1>

              <div class="star-wrapper">
                <star :size="24" :score="rating.score"></star>
                <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}</span>
              </div>

              <p class="text">{{rating.text}}</p>

              <div class="recommend" v-show="rating.recommend && rating.recommend.length">
                <i class="icon-thumb_up"></i>
                <span class="item" v-for="item in rating.recommend">{{item}}</span>
              </div>

              <div class="time">
                {{rating.rateTime | moment}}
              </div>
            </div>
          </li>
        </ul>

        <!-- 无评价时的样式 -->
        <div class="no-rating" v-show="!ratings || !ratings.length">暂无评价</div>
      </div>
    </div>
  </div>
</template>

<script>
import Star from '@/components/base/star/star'
import CrossLine from '@/components/base/cross-line/cross-line'
import RatingsSelect from '@/components/base/ratings-select/ratings-select'
import moment from 'moment'
import axios from 'axios'
import BScroll from 'better-scroll'

const ALL = 2

export default {
  components: {
    Star,
    RatingsSelect,
    CrossLine
  },
  data () {
    return {
      // 评价数据
      ratings: [],
      // ratings-select 界面组件文字
      desc: {
        all: '全部',
        positive: '好评',
        negative: '差评'
      },
      // 默认选择所有评价
      selectType: ALL,
      // 只显示有内容的评价
      onlyContent: false
    }
  },
  props: {
    seller: {
      type: Object
    }
  },
  watch: {},
  methods: {
    // 初始化数据
    _initData () {
      axios.get('/api/ratings').then(res => {
        if (res.data.code === 0) {
          this.ratings = res.data.data
        }
        // 初始化 better-scroll
        this.$nextTick(() => {
          this.scroll = new BScroll(this.$refs.ratingsRef, {
            click: true
          })
        })
      }).catch(err => {
        console.log(err)
      })
    },
    // 组件间通讯 ratings-select
    select (type) {
      this.selectType = type
      this.$nextTick(() => {
        this.scroll.refresh()
      })
    },
    switchContent () {
      this.onlyContent = !this.onlyContent
      this.$nextTick(() => {
        this.scroll.refresh()
      })
    },
    // 只显示有内容的评价
    needShow (type, text) {
      if (this.onlyContent && !text) {
        return false
      }

      if (this.selectType === ALL) {
        return true
      } else {
        return type === this.selectType
      }
    }
  },
  filters: {
    // moment.js: 格式化时间戳
    // 1469261964000 -> 2016-07-23, 04:19:24
    moment (time) {
      return moment(time).format('YYYY-MM-DD, hh:mm')
    }
  },
  computed: {},
  created () {
    // 初始化数据
    this._initData()
  },
  mounted () {}
}
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/const.scss';
@import '~@/assets/scss/mixin.scss';

.ratings {
  position: absolute;
  top: 174px;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #fff;
  overflow: hidden;
  .ratings-content {
    .overview {
      display: flex;
      padding: 18px 0;
      .left {
        flex: 0 0 137px;
        width: 137px;
        border-right: 1px solid rgba(7, 17, 27, 0.1);
        text-align: center;
        padding: 6px 0;
        .score {
          line-height: 24px;
          font-size: 24px;
          color: rgb(255, 153, 0);
          margin-bottom: 6px;
        }
        .title {
          line-height: 12px;
          font-size: 12px;
          color: rgb(7, 17, 27);
          margin-bottom: 8px;
        }
        .rank {
          line-height: 10px;
          font-size: 10px;
          color: rgb(147, 153, 159);
        }
      }
      .right {
        flex: 1;
        padding: 6px 0 6px 24px;
        .service, .goods {
          margin-bottom: 8px;
          line-height: 18px;
          font-size: 0;
          .title {
            font-size: 12px;
            color: rgb(7, 17, 27);
          }
          .star {
            display: inline-block;
            vertical-align: top;
            margin: 0 12px;
          }
          .score {
            font-size: 12px;
            color: rgb(255, 153, 0);
          }
        }
        .delivery {
          line-height: 18px;
          font-size: 0;
          .title {
            font-size: 12px;
            color: rgb(7, 17, 27);
          }
          .time {
            font-size: 12px;
            margin: 0 12px;
            color: rgb(147, 153, 159);
          }
        }
      }
      // 适配 iPhone 5
      @media screen and (max-width: 320px) {
        .left {
          flex: 0 0 120px;
          width: 120px;
        }
        .right {
          padding: 5px;
        }
      }
    }
    .rating-wrapper {
      padding: 0 18px;
      .rating-item {
        display: flex;
        padding: 18px 0;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
        .avatar {
          flex: 0 0 28px;
          width: 28px;
          margin-right: 12px;
          img {
            width: 28px;
            height: 28px;
            border-radius: 50%;
          }
        }
        .content {
          position: relative;
          flex: 1;
          .name {
            font-size: 10px;
            line-height: 12px;
            color: rgb(7, 17, 27);
            margin-bottom: 4px;
          }
          .star-wrapper {
            margin-bottom: 4px;
            font-size: 0;
            .star {
              display: inline-block;
              vertical-align: top;
              margin-right: 6px;
            }
            .deliveryTime {
              display: inline-block;
              vertical-align: top;
              font-size: 10px;
              color: rgb(147, 153, 159);
            }
          }
          .text {
            line-height: 18px;
            font-size: 14px;
            color: rgb(7, 17, 27);
            margin-bottom: 8px;
          }
          .recommend {
            line-height: 16px;
            i {
              display: inline-block;
              margin: 0 8px 4px 0;
              font-size: 9px;
              color: rgb(0, 160, 220);
            }
            .item {
              // display: inline-block;
              margin-right: 5px;
              padding: 0 6px;
              font-size: 10px;
              border: 1px solid rgba(7, 17, 27, 0.1);
              border-radius: 5px;
              color: rgb(147, 153,159);
              background-color: #fff;
            }
          }
          .time {
            position: absolute;
            top: 0;
            right: 0;
            line-height: 12px;
            font-size: 10px;
            color: rgb(147, 153, 159);
          }
        }
      }
      .no-rating {
        padding: 16px 0;
        font-size: 14px;
        color: rgb(147, 153, 159);
      }
    }
  }
}
</style>
</style>
