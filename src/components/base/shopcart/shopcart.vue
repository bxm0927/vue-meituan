<!-- 购物车 组件 -->

<template>
  <div class="shopcart">
    <!-- 购物车 -->
    <div class="content">
      <!-- 主要内容 -->
      <div class="main-content" @click="toggleList">
        <div class="left">
          <div class="logo-wrapper">
            <div class="logo" :class="{'logoLight': totalCount > 0}">
              <i class="icon-shopping_cart"></i>
            </div>
            <div class="totalCount" v-show="totalCount > 0">{{ totalCount }}</div>
          </div>

          <div class="price" :class="{'priceLight':totalCount > 0}">￥{{ totalPrice }}</div>
          <div class="desc">另需配送费 {{ deliveryPrice }} 元</div>
        </div>

        <div class="right" @click.stop="pay">
          <div class="pay" :class="{'payLight': this.totalPrice >= this.minPrice}">{{ payDesc }}</div>
        </div>
      </div>

      <!-- 飞行小球 -->
      <div class="ball-content">
        <div v-for="ball in balls">
          <transition name="drop"
                      @before-enter="beforeDrop"
                      @enter="dropping"
                      @after-enter="afterDrop">
            <div class="ball" v-show="ball.show">
              <div class="inner inner-hook"></div>
            </div>
          </transition>
        </div>
      </div>

      <!-- 购物车列表 -->
      <transition name="fold">
        <div class="shopcart-list" v-show="listShow">
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <span class="empty" @click="empty">清空</span>
          </div>

          <div class="list-content" ref="listContentRef">
            <ul>
              <li class="food" v-for="food in selectFoods">
                <span class="name">{{ food.name }}</span>

                <div class="price">
                  <span>￥{{ food.price * food.count }}</span>
                </div>

                <div class="control">
                  <cart-control :food="food"></cart-control>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>

    <!-- 模糊背景 -->
    <transition name="fade">
      <div class="background" @click="hideList" v-show="listShow"></div>
    </transition>
  </div>
</template>

<script>
import CartControl from '@/components/base/cart-control/cart-control'
import BScroll from 'better-scroll'
import { MessageBox } from 'mint-ui'

export default {
  components: {
    CartControl
  },
  data () {
    return {
      // 每个小球当前的状态
      balls: [
        { show: false },
        { show: false },
        { show: false },
        { show: false },
        { show: false },
        { show: false },
        { show: false },
        { show: false },
        { show: false },
        { show: false }
      ],
      // 已经下落的小球（show = true）
      dropBalls: [],
      // 购物车列表是否折叠
      listShow: false
    }
  },
  props: {
    // 加入购物车的商品
    selectFoods: {
      type: Array,
      default () {
        return []
      }
    },
    // 配送费
    deliveryPrice: {
      type: Number,
      default: 0
    },
    // 起送费
    minPrice: {
      type: Number,
      default: 0
    }
  },
  watch: {
    selectFoods () {
      if (this.scroll) {
        this.scroll.refresh()
      }
    }
  },
  methods: {
    // 点击 + 派发的事件
    // 取一个未下落的小球执行接下来的下落动作
    drop (el) {
      for (let i = 0; i < this.balls.length; i++) {
        let ball = this.balls[i]
        if (!ball.show) {
          ball.show = true
          ball.el = el
          this.dropBalls.push(ball)
          return
        }
      }
    },
    // 对 show = true 的小球设置动作
    beforeDrop (el) {
      let count = this.balls.length

      while (count--) {
        let ball = this.balls[count]
        if (ball.show) {
          let rect = ball.el.getBoundingClientRect()
          let x = rect.left - 32
          let y = -(window.innerHeight - rect.top - 22)

          el.style.display = ''
          el.style.webkitTransform = `translate3d(0,${y}px,0)`
          el.style.transform = `translate3d(0,${y}px,0)`

          let inner = el.getElementsByClassName('inner-hook')[0]
          inner.style.webkitTransform = `translate3d(${x}px,0,0)`
          inner.style.transform = `translate3d(${x}px,0,0)`
        }
      }
    },
    dropping (el, done) {
      /* eslint-disable no-unused-vars */
      let rf = el.offsetHeight // 重绘，否则小球不会消失
      this.$nextTick(() => {
        el.style.webkitTransform = 'translate3d(0,0,0)'
        el.style.transform = 'translate3d(0,0,0)'

        let inner = el.getElementsByClassName('inner-hook')[0]
        inner.style.webkitTransform = 'translate3d(0,0,0)'
        inner.style.transform = 'translate3d(0,0,0)'

        el.addEventListener('transitionend', done)
      })
    },
    // 动作做完就把该小球 show=false
    afterDrop (el) {
      let ball = this.dropBalls.shift()
      if (ball) {
        ball.show = false
        el.style.display = 'none'
      }
    },
    toggleList () {
      if (!this.totalCount) {
        return
      }

      this.listShow = !this.listShow

      // 初始化 better-scroll
      if (this.listShow) {
        // setTimeout
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.listContentRef, {
              click: true
            })
          } else {
            this.scroll.refresh()
          }
        }, 20)
      }
    },
    // 支付
    pay () {
      if (this.totalPrice < this.minPrice) {
        return
      }
      // mint UI
      MessageBox.confirm(`您共需支付 ${this.totalPrice} 元`, '结算')
    },
    // 清空
    empty () {
      this.selectFoods.forEach((food) => {
        food.count = 0
      })

      this.listShow = false
    },
    hideList () {
      this.listShow = false
    }
  },
  filters: {},
  computed: {
    // 所选商品总价
    totalPrice () {
      let total = 0
      this.selectFoods.forEach((food) => {
        total += food.price * food.count
      })
      return total
    },
    // 所选商品总数量
    totalCount () {
      let total = 0
      this.selectFoods.forEach((food) => {
        total += food.count
      })
      return total
    },
    // 20元起送 、 还差10元起送 、 去结算
    payDesc () {
      if (this.totalPrice === 0) {
        return `${this.minPrice}元起送`
      } else if (this.totalPrice < this.minPrice) {
        return `还差${this.minPrice - this.totalPrice}元起送`
      } else {
        return '去结算'
      }
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

.shopcart {
  .content {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 48px;
    z-index: 50;
    .main-content {
      display: flex;
      width: 100%;
      height: 48px;
      font-size: 0;
      background-color: #141d27;
      .left {
        flex: 1;
        .logo-wrapper {
          display: inline-block;
          position: relative;
          top: -10px;
          box-sizing: border-box;
          margin: 0 12px;
          padding: 6px;
          width: 56px;
          height: 56px;
          border-radius: 50%;
          vertical-align: top;
          text-align: center;
          background-color: #141d27;
          .logo {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background-color: #2b343c;
            i {
              font-size: 24px;
              line-height: 44px;
              color: #80858a;
            }
          }
          .logoLight {
            background-color: #FFDA61;
            & i {
              color: #333;
            }
          }
          .totalCount {
            position: absolute;
            right: 0;
            top: 0;
            width: 24px;
            height: 16px;
            line-height: 16px;
            border-radius: 12px 12px;
            font-size: 9px;
            font-weight: 700;
            color: #fff;
            background-color: rgb(240, 20, 20);
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
          }
        }
        .price {
          display: inline-block;
          box-sizing: border-box;
          margin-top: 12px;
          padding-right: 12px;
          vertical-align: top;
          font-size: 16px;
          line-height: 24px;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.4);
          border-right: 1px solid rgba(255, 255, 255, 0.1);
          &.priceLight {
            color: #fff;
          }
        }
        .desc {
          display: inline-block;
          vertical-align: top;
          line-height: 24px;
          margin: 12px 0 0 12px;
          font-size: 10px;
          color: rgba(255, 255, 255, 0.4);
        }
      }
      .right {
        flex: 0 0 105px;
        width: 105px;
        text-align: center;
        .pay {
          height: 48px;
          line-height: 48px;
          font-size: 12px;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.4);
          background-color: #2b333b;
          &.payLight {
            background-color: #FFDA61;
            color: #333;
          }
        }
      }
      // 适配 iPhone 5
      @media screen and (max-width: 320px) {
        .right {
          flex: 0 0 80px;
          width: 80px;
          text-align: center;
        }
      }
    }
    // 飞行小球
    .ball-content {
      .ball {
        position: fixed;
        left: 32px;
        bottom: 22px;
        z-index: 200;
        // http://cubic-bezier.com
        transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41);
      }
      .inner {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background-color: #FFD161;
        transition: all 0.4s linear;
      }
    }
    // 购物车列表
    .shopcart-list {
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
      width: 100%;
      transform: translate3d(0, -100%, 0);
      &.fold-enter-active, &.fold-leave-active {
        transition: all 0.5s;
      }
      &.fold-enter, &.fold-leave-active {
        transform: translate3d(0, 0, 0);
      }
      .list-header {
        height: 40px;
        line-height: 40px;
        padding: 0 18px;
        background-color: #f3f5f7;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
        .title {
          float: left;
          font-size: 14px;
          color: rgb(7, 17, 27);
        }
        .empty {
          float: right;
          font-size: 12px;
          color: rgb(0, 160, 220);
        }
      }
      .list-content {
        max-height: 217px;
        padding: 0 18px;
        background-color: #fff;
        overflow: hidden;
        .food {
          position: relative;
          padding: 12px 0;
          box-sizing: border-box;
          border-bottom: 1px solid rgba(7, 17, 27, 0.1);
          .name {
            line-height: 24px;
            font-size: 14px;
            color: rgb(7, 17, 27);
          }
          .price {
            position: absolute;
            right: 95px;
            bottom: 12px;
            line-height: 24px;
            font-size: 14px;
            font-weight: 700;
            color: rgb(240, 20, 20);
          }
          .control {
            position: absolute;
            right: 0;
            bottom: -5px;
          }
        }
      }
    }
  }
  // 模糊背景
  .background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 40;
    opacity: 1;
    backdrop-filter: blur(10px);
    background-color: rgba(7, 17, 27, 0.6);
    &.fold-enter-active, &.fold-leave-active {
      transition: all .5s;
    }
    &.fold-enter, &.fold-leave-active {
      opacity: 0;
      background: rgba(7, 17, 27, 0);
    }
  }
}
</style>
