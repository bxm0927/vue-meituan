<!-- 商家模块 商家页面 -->

<template>
  <div class="seller" ref="sellerRef">
    <div>
      <!-- 概览 -->
      <div class="overview">
        <div class="collect">
          <div class="name">{{seller.name}}</div>

          <div class="star-wrapper">
            <star :size="36" :score="seller.score"></star>
            <span class="ratingCount">({{seller.ratingCount}})</span>
          </div>

          <div class="sellCount">月售{{seller.sellCount}}单</div>

          <div class="collect-icon" @click="toggleFavorites">
            <i class="icon-favorite" :class="{'active': favorite}"></i>
            <div class="text">{{favorite?'已收藏':'未收藏'}}</div>
          </div>
        </div>

        <div class="param">
          <div class="left">
            <span class="text">起送价</span>
            <span class="price"><span class="num">{{seller.minPrice}}</span>元</span>
          </div>

          <div class="mid">
            <span class="text">商家配送</span>
            <span class="price"><span class="num">{{seller.deliveryPrice}}</span>元</span>
          </div>

          <div class="right">
            <span class="text">平均配送时间</span>
            <span class="price"><span class="num">{{seller.deliveryTime}}</span>分钟</span>
          </div>
        </div>
      </div>

      <!-- 横线分隔条 -->
      <cross-line></cross-line>

      <!-- 公告与活动 -->
      <div class="notice">
        <h1 class="title">公告与活动</h1>
        <div class="text">{{seller.bulletin}}</div>

        <ul v-if="seller.supports">
          <li class="support" v-for="support in seller.supports">
            <span class="icon" :class="classMap[support.type]"></span>
            <span class="description">{{support.description}}</span>
          </li>
        </ul>
      </div>

      <!-- 横线分隔条 -->
      <cross-line></cross-line>

      <!-- 商家实景 -->
      <div class="photo">
        <h1 class="title">商家实景</h1>

        <div class="pic-wrapper" ref="picRef">
          <ul class="pic-list" ref="picListRef">
            <li class="pic-item"v-for="pic in seller.pics">
              <img :src="pic">
            </li>
          </ul>
        </div>
      </div>

      <!-- 横线分隔条 -->
      <cross-line></cross-line>

      <div class="info">
        <h1 class="title">商家信息</h1>
        <ul>
          <li v-for="item in seller.infos" class="item">{{item}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Star from '@/components/base/star/star'
import BScroll from 'better-scroll'
import CrossLine from '@/components/base/cross-line/cross-line'
import store from '@/assets/js/store.js'

export default {
  components: {
    Star,
    CrossLine
  },
  data () {
    return {
      classMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee'],
      // 收藏图标样式
      favorite: store.getLocalstorage(this.seller.id, 'favorites', false)
    }
  },
  props: {
    seller: {
      type: Object
    }
  },
  watch: {
    seller () {
      this.$nextTick(() => {
        this._initScroll()
        this._initPicScroll()
      })
    }
  },
  methods: {
    // 初始化页面滚动
    _initScroll () {
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.sellerRef, {
          click: true
        })
      } else {
        this.scroll.refresh()
      }
    },
    // 初始化图片横向滚动
    // 手动设置横向宽度
    _initPicScroll () {
      if (this.seller.pics) {
        const picWidth = 120
        const margin = 6
        let width = (picWidth + margin) * this.seller.pics.length - margin
        this.$refs.picListRef.style.width = width + 'px'

        if (!this.picScroll) {
          this.picScroll = new BScroll(this.$refs.picRef, {
            click: true,
            scrollX: true,
            eventPassthrough: 'vertical'
          })
        } else {
          this.picScroll.refresh()
        }
      }
    },
    // 收藏
    toggleFavorites (event) {
      // 解决移动端响应两次点击事件的问题
      if (!event._constructed) {
        return
      }
      this.favorite = !this.favorite
      console.log(store.setLocalstorage(this.seller.id, 'favorites', this.favorite))
    }
  },
  filters: {},
  computed: {},
  created () {},
  mounted () {
    // 初始化页面滚动
    // 初始化图片横向滚动
    this.$nextTick(() => {
      this._initScroll()
      this._initPicScroll()
    })
  },
  destroyed () {}
}
</script>

<style lang="sass" scoped>
@import '~@/assets/scss/const.scss';
@import '~@/assets/scss/mixin.scss';

.seller
  position: absolute
  top: 174px
  bottom: 0
  left: 0
  width: 100%
  background-color: #fff
  overflow: hidden
  .overview
    position: relative
    padding: 18px
    .collect
      border-bottom: 1px solid rgba(7, 17, 27, 0.1)
      padding-bottom: 18px
      .name
        font-size: 16px
        color: rgb(7, 17, 27)
        line-height: 14px
        margin-bottom: 15px
      .star-wrapper
        display: inline-block
        margin-right: 12px
        .star
          display: inline-block
        .ratingCount
          display: inline-block
          font-size: 14px
          color: rgb(7, 17, 27)
          line-height: 14px
      .sellCount
        display: inline-block
        font-size: 14px
        color: rgb(7, 17, 27)
        line-height: 14px
      .collect-icon
        display: inline-block
        position: absolute
        top: 18px
        right: 18px
        text-align: center
        .icon-favorite
          display: inline-block
          color: #d4d6d9
          font-size: 24px
          margin-left: 5px
          margin-bottom: 8px
          &.active
            color: rgb(240, 20, 20)
        .text
          font-size: 10px
          line-height: 10px
          color: rgb(77, 85, 93)
    .param
      padding-top: 18px
      display: flex
      .left, .mid, .right
        display: inline-block
        flex: 1
        text-align: center
        border-right: 1px solid rgba(7, 17, 27, 0.1)
        .text
          display: block
          margin-top: 18px
          margin-bottom: 4px
          color: rgb(147, 153, 159)
          font-size: 10px
          line-height: 10px
        .price
          font-size: 10px
          color: rgb(7, 17, 27)
          font-weight: 200
          line-height: 24px
          margin-bottom: 18px
          .num
            font-size: 24px
      .right
        border-right: none;
  .notice
    padding: 18px 18px 0 18px
    .title
      font-size: 14px
      color: rgb(7, 17, 27)
      margin-bottom: 12px
      line-height: 14px
    .text
      padding: 8px 0 0 12px
      font-size: 12px
      line-height: 24px
      font-weight: 200
      color: rgb(240, 20, 20)
      padding-bottom: 16px
      border-bottom: 1px solid rgba(7, 17, 27, 0.1)
    .support
      padding: 16px 12px
      border-bottom: 1px solid rgba(7, 17, 27, 0.1)
      &:last-child
        border: none
      .icon
        display: inline-block;
        width: 18px
        height: 18px
        margin-right: 4px
        background-size: 18px 18px
        background-repeat: no-repeat
        vertical-align: top
        &.decrease
          background-image: url('./img/decrease_1@2x.png')
        &.discount
          background-image: url('./img/discount_1@2x.png')
        &.guarantee
          background-image: url('./img/guarantee_1@2x.png')
        &.invoice
          background-image: url('./img/invoice_1@2x.png')
        &.special
          background-image: url('./img/special_1@2x.png')
      .description
        font-size: 12px
        line-height: 16px
        font-weight: 200
        color: rgb(7, 17, 27)
  .photo
    padding: 18px
    .title
      font-size: 14px
      color: rgb(7, 17, 27)
      margin-bottom: 12px
      line-height: 14px
    .pic-wrapper
      width: 100%
      overflow: hidden
      // 图片不换行
      white-space: nowrap
      .pic-list
        font-size: 0
        .pic-item
          display: inline-block
          margin-right: 6px
          width: 120px
          height: 90px
          &:last:child
            margin-right: 0
          img
            width: 120px
            height: 90px
            border-radius: 3px
  .info
    padding: 18px 18px 0 18px
    .title
      font-size: 14px
      color: rgb(7, 17, 27)
      margin-bottom: 12px
      line-height: 14px
    .item
      font-size: 12px
      line-height: 16px
      font-weight: 200
      color: rgb(7, 17, 27)
      padding: 16px 12px
      border-bottom: 1px solid rgba(7, 17, 27, 0.1)
      &:last-child
        border-bottom: 0px solid rgba(7, 17, 27, 0.1)
</style>
