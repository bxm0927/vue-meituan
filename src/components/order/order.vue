<!-- 订单 -->

<template>
  <div class="order">
    <div v-for="item in orderData">
      <order-item :data="item"></order-item>
    </div>

    <tab-bar></tab-bar>
  </div>
</template>

<script>
import TabBar from '@/components/base/tab-bar/tab-bar'
import OrderItem from '@/components/base/order-item/order-item'
import axios from 'axios'

export default {
  components: {
    TabBar,
    OrderItem
  },
  data () {
    return {
      orderData: []
    }
  },
  props: {},
  watch: {},
  methods: {
    // 初始化列表数据
    _initIndexListData () {
      axios.get('/api/indexList').then(res => {
        // console.log(res)
        if (res.data.code === 0) {
          this.orderData = res.data.data.data.poilist
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

.order {}
</style>
