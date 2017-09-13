<!-- 商家详情 -->

<template>
  <div class="restaurant-detail">
    <!-- 商家模块头部 -->
    <seller-header :seller="seller"></seller-header>

    <div class="tab">
      <div class="tab-item">
        <router-link to="./goods">点菜</router-link>
      </div>
      <div class="tab-item">
        <router-link to="./ratings">评价</router-link>
      </div>
      <div class="tab-item">
        <router-link to="./seller">商家</router-link>
      </div>
    </div>

    <keep-alive>
      <router-view :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>

<script>
import SellerHeader from '@/components/base/seller-header/seller-header'
import axios from 'axios'
import utils from '@/assets/js/utils.js'

export default {
  components: {
    SellerHeader
  },
  data () {
    return {
      // 商家数据
      // 获取不同商家的 id
      // getId () {
      //   // http://localhost:8080/?id=001#/restaurant/seller
      //   // console.log(utils.http.urlParse())
      //   return utils.http.urlParse().id
      // }
      seller: {
        id: utils.http.urlParse().id || '0001'
      }
    }
  },
  props: {},
  watch: {},
  methods: {
    // 初始化商家数据
    _initData () {
      // vue-resource
      // this.$http.get('/api/seller').then(res => {
      //   console.log(res)
      //   // this.someData = response.body;
      // }, err => {
      //   console.log(err)
      // })

      axios.get('/api/seller?id=' + this.seller.id).then(res => {
        if (res.data.code === 0) {
          // this.seller = res.data.data

          // 添加 ID 属性
          this.seller = Object.assign({}, this.seller, res.data.data)
        }
      }).catch(err => {
        console.log(err)
      })
    }
  },
  filters: {},
  computed: {},
  created () {
    // 初始化商家数据
    this._initData()
  },
  mounted () {},
  destroyed () {}
}
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/const.scss';
@import '~@/assets/scss/mixin.scss';

.restaurant-detail {
  .tab {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    @include onepx('bottom');
    .tab-item {
      flex: 1;
      background-color: #fff;
      a {
        display: block;
        font-size: 14px;
        color: rgb(77, 85, 93);
        &.router-link-active {
          color: rgb(240, 20, 20);
        }
      }
    }
  }
}
</style>
