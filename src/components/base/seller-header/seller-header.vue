<!-- 商家模块头部 组件 -->

<template>
  <div class="seller-header" v-if="seller">
    <!-- 主要内容：左侧头像、右侧描述 -->
    <div class="content-wrapper">
      <div class="avatar">
        <img :src="seller.avatar">
      </div>

      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{ seller.name }}</span>
        </div>

        <div class="description">
          <span>{{ seller.description }} / {{ seller.deliveryTime }}</span>分钟送达
        </div>

        <!-- 活动 -->
        <div class="supports" v-if="seller.supports">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{ seller.supports[0].description }}</span>
        </div>
      </div>

      <!-- 活动个数 -->
      <div class="supports-count" v-if="seller.supports" @click="detailShow = true">
        <span>{{ seller.supports.length }}个活动</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>

    <!-- 公告 -->
    <div class="bulletin-wrapper" @click="detailShow = true">
      <span class="brand"></span>
      <span class="text">{{ seller.bulletin }}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>

    <!-- 背景 -->
    <div class="background">
      <img :src="seller.avatar">
    </div>

    <!-- 浮层详情 -->
    <transition name="fade">
      <div class="detail" v-show="detailShow">
        <div class="detail-wrapper clearfix">
          <div class="detail-main">
            <h1 class="name">{{ seller.name }}</h1>

            <div class="star-wrapper">
              <star :size="48" :score="seller.score"></star>
            </div>

            <div class="title">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>

            <ul class="detail-supports" v-if="seller.supports">
              <li class="supports-item" v-for="(item, index) in seller.supports">
                <span class="icon" :class="classMap[seller.supports[index].type]"></span>
                <span class="text">{{ seller.supports[index].description }}</span>
              </li>
            </ul>

            <div class="title">
              <div class="line"></div>
              <div class="text">商家公告</div>
              <div class="line"></div>
            </div>

            <div class="detail-text">
              <p class="text">{{ seller.bulletin }}</p>
            </div>
          </div>
        </div>

        <div class="detail-close" @click="detailShow = false">
          <i class="icon-close"></i>
        </div>
      </div>
    </transition>

    <!-- 返回按钮 -->
    <div class="back" @click="back">
      <i class="icon-arrow_lift"></i>
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
    return {
      detailShow: false,
      classMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    }
  },
  props: {
    seller: {
      type: Object
    }
  },
  watch: {},
  methods: {
    back () {
      this.$router.push({
        path: '/index'
      })
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

.seller-header {
  position: relative;
  color: #fff;
  line-height: 1;
  font-size: 13px;
  font-weight: 200;
  overflow: hidden;
  background-color: rgba(7, 17, 27, 0.5);
  .content-wrapper {
    position: relative;
    padding: 24px 12px 18px 24px;
    font-size: 0;
    .avatar {
      display: inline-block;
      font-size: 14px;
      vertical-align: top;
      img {
        width: 64px;
        height: 64px;
        border-radius: 2px;
      }
    }
    .content {
      display: inline-block;
      margin-left: 16px;
      .title {
        margin: 2px 0 8px 0;
        .brand {
          width: 30px;
          height: 18px;
          display: inline-block;
          vertical-align: top;
          background-size: 30px 18px;
          background-repeat: no-repeat;
          @include bg-image('./img/brand');
        }
        .name {
          margin-left: 6px;
          font-size: 16px;
          line-height: 18px;
          font-weight: bold;
        }
      }
      .description {
        margin-bottom: 10px;
        font-size: 13px;
        line-height: 13px;
      }
      .supports {
        .icon {
          display: inline-block;
          width: 12px;
          height: 12px;
          margin-right: 4px;
          background-size: 12px 12px;
          background-repeat: no-repeat;
          vertical-align: top;
          &.decrease {
            @include bg-image('./img/decrease_1');
          }
          &.discount {
            @include bg-image('./img/discount_1');
          }
          &.guarantee {
            @include bg-image('./img/guarantee_1');
          }
          &.invoice {
            @include bg-image('./img/invoice_1');
          }
          &.special {
            @include bg-image('./img/special_1');
          }
        }
        .text {
          font-size: 10px;
          line-height: 12px;
        }
      }
    }
    .supports-count {
      position: absolute;
      right: 12px;
      bottom: 18px;
      padding: 0 8px;
      height: 24px;
      line-height: 24px;
      text-align: center;
      border-radius: 14px;
      background-color: rgba(0, 0, 0, 0.2);
      span {
        font-size: 10px;
        line-height: 24px;
      }
      i {
        position: relative;
        top: 1px;
        font-size: 10px;
        margin-left: 2px;
        line-height: 24px;
      }
    }
  }
  .bulletin-wrapper {
    position: relative;
    height: 28px;
    line-height: 28px;
    padding: 0 22px 0 12px;
    background-color: rgba(7, 17, 27, 0.2);
    @include ellipsis(1);
    .brand {
      display: inline-block;
      width: 22px;
      height: 12px;
      @include bg-image('./img/bulletin');
      background-size: 22px 12px;
      background-repeat: no-repeat;
      vertical-align: top;
      margin-top: 7px;
    }
    .text {
      font-size: 10px;
      margin: 0 4px;
      vertical-align: top;
    }
    i {
      position: absolute;
      top: 8px;
      right: 12px;
      font-size: 10px;
    }
  }
  .background {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
    img {
      width: 100%;
      height: 100%;
      filter: blur(10px);
    }
  }
  .detail {
    @include over-screen();
    z-index: 100;
    overflow: auto;
    background-color: rgba(7, 17, 27, 0.8);
    backdrop-filter: blur(10px);
    .detail-wrapper {
      min-height: 100%;
      .detail-main {
        padding-top: 64px;
        padding-bottom: 64px;
        .name {
          text-align: center;
          font-weight: 700;
          font-size: 16px;
          line-height: 16px;
        }
        .star-wrapper {
          margin-top: 18px;
          padding: 2px 0;
          text-align: center;
        }
        .title {
          display: flex;
          width: 80%;
          margin: 28px auto;
          .line {
            flex: 1;
            position: relative;
            top: -6px;
            left: 0;
            border-bottom: 1px solid rgba(255, 255, 255, 0.2)
          }
          .text {
            text-align: center;
            padding: 0 12px;
            font-size: 14px;
            font-weight: 600;
          }
        }
        .detail-supports {
          width: 80%;
          margin: 0 auto;
          .supports-item {
            padding: 0 12px;
            margin-bottom: 12px;
            font-size: 0;
            &:last-child {
              margin-bottom: 0;
            }
            .icon {
              width: 16px;
              height: 16px;
              vertical-align: top;
              margin-right: 6px;
              background-size: 16px 16px;
              background-repeat: no-repeat;
              display: inline-block;
              &.decrease {
                @include bg-image('./img/decrease_2');
              }
              &.discount {
                @include bg-image('./img/discount_2');
              }
              &.guarantee {
                @include bg-image('./img/guarantee_2');
              }
              &.invoice {
                @include bg-image('./img/invoice_2');
              }
              &.special {
                @include bg-image('./img/special_2');
              }
            }
            .text {
              display: inline-block;
              line-height: 16px;
              font-size: 12px;
              font-weight: normal;
            }
          }
        }
        .detail-text {
          width: 80%;
          margin: 0 auto;
          .text {
            font-weight: normal;
            text-align: left;
            text-indent: 2em;
            font-size: 12px;
            line-height: 24px;
            padding: 0 12px;
          }
        }
        @media screen and (max-width: 320px) {
          .detail-supports {
            width: 90%;
          }
          .detail-text {
            width: 90%;
          }
        }
      }
    }
    .detail-close {
      position: relative;
      clear: both;
      width: 32px;
      height: 32px;
      font-size: 32px;
      margin: -50px auto 0;
    }
  }
  // 返回按钮
  .back {
    position: fixed;
    top: 25px;
    right: 19px;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.2);
    z-index: 1;
    i {
      display: block;
      padding: 7px;
      font-size: 20px;
      color: #fff;
    }
  }
}

// 淡入淡出
.fade-enter-active, .fade-leave-active {
  transition: all .5s ease;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
