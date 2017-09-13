<!-- 发现 -->

<template>
  <div class="find">
    <div v-for="item in findListData">
      <find-item :data="item"></find-item>
    </div>

    <tab-bar></tab-bar>
  </div>
</template>

<script>
import axios from 'axios'
import TabBar from '@/components/base/tab-bar/tab-bar'
import FindItem from '@/components/base/find-item/find-item'

export default {
  components: {
    TabBar,
    FindItem
  },
  data () {
    return {
      findListData: []
    }
  },
  props: {},
  watch: {},
  methods: {
    _initFindListData () {
      axios.get('/api/findList').then(res => {
        if (res.data.code === 0) {
          this.findListData = res.data.data.data
        }
      }).catch(err => {
        console.log(err)
      })
    }
  },
  filters: {},
  computed: {},
  created () {
    this._initFindListData()
  },
  mounted () {},
  destroyed () {}
}
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/const.scss';
@import '~@/assets/scss/mixin.scss';

.find {
  margin-bottom: 50px;
}
</style>
