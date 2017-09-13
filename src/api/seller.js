import jsonp from '@/assets/js/jsonp.js'

const opts = {
  param: 'jsonpCallback'
}

/**
 * jsonp 抓取发现页列表数据
 * 接口：https://m.dianping.com/toplist/page?cityid=184&offset=6&t=1&token=&utm_source=tpl_index_item&source=2
 */
export function getFindListData () {
  let url = 'https://m.dianping.com/toplist/page'
  let data = {
    cityid: 184,
    offset: 6,
    t: 1,
    token: '',
    utm_source: 'tpl_index_item',
    source: 2
  }

  return jsonp(url, data, opts)
}
