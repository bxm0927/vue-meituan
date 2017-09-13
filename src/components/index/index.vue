<!-- 首页 -->

<template>
  <div class="index">
    <!-- 轮播图 -->
    <div class="slider">
      <mt-swipe :auto="3000">
        <mt-swipe-item v-for="item in swipeData" :key="item.pic">
          <img :src="item.pic">
        </mt-swipe-item>
      </mt-swipe>
    </div>

    <!-- 种类 -->
    <div class="types">
      <types-item v-for="item in types"
                  :key="item.ico"
                  :ico="item.ico"
                  :txt="item.txt" @toList="toList(item)"></types-item>
    </div>

    <!-- 横线分隔条 -->
    <cross-line></cross-line>

    <!-- 附近商家 -->
    <div class="nearby">
      <title-bar txt="附近商家"></title-bar>
      <seller-list-item v-for="item in indexList"
                        :key="item.name"
                        :data="item"
                        @toRestaurant="toRestaurant()"></seller-list-item>
    </div>

    <tab-bar></tab-bar>
  </div>
</template>

<script>
import TabBar from '@/components/base/tab-bar/tab-bar'
import TypesItem from '@/components/base/types-item/types-item'
import CrossLine from '@/components/base/cross-line/cross-line'
import TitleBar from '@/components/base/title-bar/title-bar'
import SellerListItem from '@/components/base/seller-list-item/seller-list-item'
import axios from 'axios'

export default {
  components: {
    TabBar,
    TypesItem,
    CrossLine,
    TitleBar,
    SellerListItem
  },
  data () {
    return {
      swipeData: [
        {
          pic: require('./img/swipe/bannertemp.e8a6fa63.jpg')
        }
      ],
      types: [
        {
          ico: require('./img/types/types (7).png'),
          txt: '美食'
        },
        {
          ico: require('./img/types/types (0).png'),
          txt: '美团超市'
        },
        {
          ico: require('./img/types/types (1).png'),
          txt: '生鲜果蔬'
        },
        {
          ico: require('./img/types/types (5).png'),
          txt: '甜点饮品'
        },
        {
          ico: require('./img/types/types (4).png'),
          txt: '正餐优选'
        },
        {
          ico: require('./img/types/types (2).png'),
          txt: '美团专送'
        },
        {
          ico: require('./img/types/types (3).png'),
          txt: '能量西餐'
        },
        {
          ico: require('./img/types/types (6).png'),
          txt: '精品小吃'
        }
      ],
      indexList: []
    }
  },
  props: {},
  watch: {},
  methods: {
    toList (item) {
      this.$router.push({
        path: '/restaurant_list'
      })
    },
    toRestaurant () {
      this.$router.push({
        path: '/restaurant'
      })
    },
    // 初始化列表数据
    _initIndexListData () {
      axios.get('/api/indexList').then(res => {
        // console.log(res)
        if (res.data.code === 0) {
          this.indexList = res.data.data.data.poilist
        }
      }).catch(err => {
        console.log(err)
      })
    }
  },
  filters: {},
  computed: {},
  created () {
    // 初始化列表数据
    this._initIndexListData()
  },
  mounted () {},
  destroyed () {}
}
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/const.scss';
@import '~@/assets/scss/mixin.scss';

.index {
  .slider {
    height: 170px;
    font-size: 30px;
    text-align: center;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .types {
    overflow: hidden;
    padding-bottom: 20px;
    background-color: #fff;
  }
  .nearby {
    margin-bottom: 50px;
    background-color: #fff;
  }
}
</style>
