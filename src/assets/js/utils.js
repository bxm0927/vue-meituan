/*
* @Author:    白小明
* @Created:   2017-08-01
* @Modified:  2017-08-30
*/

// 这四个非常有用的弱封装JavaScript工具库你都使用过吗：http://www.360doc.com/content/17/0207/13/13792507_627244171.shtml
// store.js：https://github.com/jaywcjlove/store.js

let utils = {
  dom: {
    // 显示
    show (obj) {
      obj.style.display = ''
    },

    // 隐藏
    hide (obj) {
      obj.style.display = 'none'
    },

    // 判断是否有该 class
    hasClass (el, className) {
      let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
      return reg.test(el.className)
    },

    // 添加 class
    addClass (el, className) {
      if (this.hasClass(el, className)) {
        return
      }
      let newClass = el.className.split(' ')
      newClass.push(className)
      el.className = newClass.join(' ')
    },

    // 删除类名
    removeClass (el, className) {
      if (this.hasClass(el, className)) {
        var reg = new RegExp('(\\s|^)' + className + '(\\s|$)')
        el.className = el.className.replace(reg, '')
      }
    },

    // 替换类名
    replaceClass (obj, newName, oldName) {
      this.removeClass(obj, oldName)
      this.addClass(obj, newName)
    },

    /**
     * 获取/设置 自定义属性 data-${name}=val
     * 如果传入了 val 就设置自定义属性 `data-${name}` 的值为 val
     * 如果没有传入了 val 就获取自定义属性 `data-${name}` 的值
     */
    customAttribute (el, name, val) {
      if (val) {
        return el.setAttribute(`data-${name}`, val)
      } else {
        return el.getAttribute(`data-${name}`)
      }
    },

    /**
     * 去抖（节流）
     * 有一些浏览器事件可以很快地在短时间内多次触发，
     * 例如调整窗口大小、向下滚动页面、搜索框节流等。
     * 如果你将事件监听器绑定到窗口滚动事件，并且用户不断快速地向下滚动页面，
     * 则你的事件可能在1秒内触发数千次。这可能会导致一些严重的性能问题。
     * 解决这个问题的一种方法是去抖，通过限制再次调用函数之前必须经过的时间。
     * 因此，去抖的正确实现是将几个函数调用组合成一个，并且在经过一段时间后仅执行一次。
     *
     * document.addEventListener('scroll', debounce(function () {
     *   console.log('hello')
     * }, 1000))
     *
     * @param  {Function} fn    要节流的函数
     * @param  {number}   delay 延迟毫秒数
     */
    debounce (fn, delay) {
      let timer = null

      return function (...args) {
        if (timer) {
          clearTimeout(timer)
        }

        timer = setTimeout(() => {
          fn.apply(this, args)
        }, delay)
      }
    },

    /**
     * 获取元素相对屏幕的位置
     * let one = document.getElementById('one')
     * console.log(getPos(one)) -> {top: 8, left: 8}
     */
    getPos (elem) {
      if (!elem) return {left: 0, top: 0}

      let top = 0
      let left = 0

      top = elem.getBoundingClientRect().top
      left = elem.getBoundingClientRect().left

      return {top, left}
    },

    /**
     * 类 Vue 双向数据绑定
     * <input type="text" id="one">
     * <span id="two"></span>
     *
     * dataBinding('one', 'two')
     */
    dataBinding (inputId, outputId, objName = {}) {
      inputId = document.getElementById(inputId)
      outputId = document.getElementById(outputId)

      Object.defineProperty(objName, 'str', {
        get () {},
        set (newVal) {
          outputId.innerText = newVal
        }
      })
      inputId.addEventListener('keyup', function () {
        objName.str = event.target.value
      })
    },

    /**
     * 键盘事件 keyCode 兼容性写法
     */
    getKeyCode (e) {
      // e = e ? e : (window.event ? window.event : '')
      return e.keyCode ? e.keyCode : e.which
    }
  },
  num: {
    /**
     * 返回一个 [min, max] 之间的随机整数
     * @param  {number} min 下界
     * @param  {number} max 上界
     */
    getRandomNum (min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min)
    },

    /**
     * 让两个整数交换数值
     */
    convertInt (a = 1, b = 2) {
      a ^= b
      b ^= a
      a ^= b
    },

    /**
     * 符号相同
     * 异或运算:同为 1 或 0 时候等于 0，否则为 1
     * 如 a= 10110，b = 10011 , a ^ b = 00101
     * 二进制第一位：1 表示负，0 表示正
     *
     * sameSign(1, 2) -> true
     * sameSign(1, -2) -> false
     */
    sameSign (a, b) {
      return (a ^ b) >= 0
    },

    /**
     * 向量
     */
    vector (a, b) {
      return {
        x: b.x - a.x,
        y: b.y - a.y
      }
    },

    /**
     * 向量叉乘公式
     */
    vectorPro (v1, v2) {
      return v1.x * v2.y - v1.y * v2.x
    },

    /**
     * 点 p 是否在 △abc 中
     * http://oph264zoo.bkt.clouddn.com/17-8-29/42222.jpg
     * @param  {[type]}  p [description]
     * @param  {[type]}  a [description]
     * @param  {[type]}  b [description]
     * @param  {[type]}  c [description]
     * @return {Boolean}   [description]
     */
    isPointInTrangle (p, a, b, c) {
      var pa = utils.num.vector(p, a)
      var pb = utils.num.vector(p, b)
      var pc = utils.num.vector(p, c)

      var t1 = utils.num.vectorPro(pa, pb)
      var t2 = utils.num.vectorPro(pb, pc)
      var t3 = utils.num.vectorPro(pc, pa)

      return utils.num.sameSign(t1, t2) && utils.num.sameSign(t2, t3) && utils.num.sameSign(t1, t3)
    }
  },
  arr: {
    // 克隆数组
    cloneArr (arr) {
      // 从第一个字符就开始 copy
      // slice(start,end) 方法可从已有的数组中返回选定的元素。
      return arr.slice(0)
    },

    /**
     * 洗牌函数
     * @param  {Array} arr 原数组
     * @param  {boolean} flag 是否改变原数组，默认不改变
     * @return {Array}     新数组
     */
    shuffle (arr, flag = false) {
      let newArr = []
      if (flag) {
        newArr = arr
      } else {
        newArr = arr.slice(0)
      }

      for (let i = 0; i < newArr.length; i++) {
        let j = utils.num.getRandom(0, i)
        let temp = newArr[i]
        newArr[i] = newArr[j]
        newArr[j] = temp
      }
      return newArr
    },

    // 随机获取数组的一个成员
    randomOne (arr) {
      return arr[Math.floor(Math.random() * arr.length)]
    },

    // 数组去重
    removeRepeat (arr) {
      return Array.from(new Set(arr))
    },
    // [1,2,3,1,'a',1,'a'].filter(function(ele,index,array){
    //     return index===array.indexOf(ele)
    // })

    // 数组最大值
    maxArr (arr) {
      return Math.max.apply(null, arr)

      // var numbers = [5, 458 , 120 , -215 , 228 , 400 , 122205, -85411];
      // var maxInNumbers = Math.max.apply(Math, numbers);
      // var minInNumbers = Math.min.apply(Math, numbers);
    },

    // 数组最小值
    minArr (arr) {
      return Math.min.apply(null, arr)
    },

    // 数组数字总和 (必须保证数组每个元素都是 Number)
    sumArr (arr) {
      let sum = 0

      for (let i = 0; i < arr.length; i++) {
        sum += arr[i]
      }

      return sum
    },

    // 数组数字平均值，小数点可能会有很多位，这里不做处理，处理了使用就不灵活了！
    averageArr (arr) {
      let average = this.sumArr(arr) / arr.length
      return average
    },

    /**
     * 一个元素出现的次数
     * getEleCount('asd56+asdasdwqe', 'a') -> 3
     * getEleCount([1, 2, 3, 4, 2], 3) -> 1
     * @param  {[type]} obj 可以是对象或者数组
     * @param  {[type]} ele [description]
     * @return {[type]}     [description]
     */
    getEleCount (obj, ele) {
      let num = 0

      for (let i = 0; i < obj.length; i++) {
        if (ele === obj[i]) {
          num++
        }
      }

      return num
    }
  },
  str: {
    /**
     * 正则验证(可扩展)
     * @param  {String} str  需要检测的字符串
     * @param  {String} type 检测类型
     * @return {Boolean}     返回布尔值
     */
    testReg (str, type) {
      switch (type) {
        case 'email':
          return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str)
        case 'phone':
          return /^1[3|4|5|7|8][0-9]{9}$/.test(str)
        case 'tel':
          return /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/.test(str)
        case 'number':
          return /^[0-9]$/.test(str)
        case 'english':
          return /^[a-zA-Z]+$/.test(str)
        case 'chinese':
          return /^[\u4E00-\u9FA5]+$/.test(str)
        case 'lower':
          return /^[a-z]+$/.test(str)
        case 'upper':
          return /^[A-Z]+$/.test(str)
        default:
          return true
      }
    },

    /**
     * 检测密码强度
     * checkPwdLv('12asdASAD') -> 3
     * @param  {[type]} str [description]
     * @return {[type]}     [description]
     */
    checkPwdLv (str) {
      let nowLv = 0

      // 密码长度 < 6，强度为 0
      if (str.length < 6) {
        return nowLv
      }
      // 密码长度 >= 6，全为数字，强度加 1
      if (/[0-9]/.test(str)) {
        nowLv++
      }
      // 密码长度 >= 6，全为小写字母，强度加 1
      if (/[a-z]/.test(str)) {
        nowLv++
      }
      // 密码长度 >= 6，全为大写字母，强度加 1
      if (/[A-Z]/.test(str)) {
        nowLv++
      }

      return nowLv
    },

    /**
     * 产生随机颜色
     * #d9d264 #d09293 #0e608e
     * @param  {Number} need 1:十六进制颜色值 2:RGB颜色值
     */
    getRandomColor (need = 1) {
      if (need === 1) {
        return `#${Math.random().toString(16).substr(2, 6)}`
      } else if (need === 2) {
        return `rgb(${this.getRandom(0, 255)}, ${this.getRandom(0, 255)}, ${this.getRandom(0, 255)})`
      }
    },

    /**
     * 返回一个随机字符串
     * @param  {Number} n      字符数量 [0, 13]
     * @param  {String} prefix 随机字符串前缀
     * @return {[type]}        [description]
     */
    getRandomStr (n = 5, prefix = '') {
      return prefix + Math.random().toString(16).substr(2, n)
    },

    /**
     * 动态创建 <script>
     */
    createScript (url, charset = 'utf-8') {
      let script = document.createElement('script')
      script.setAttribute('type', 'text/javascript')
      script.setAttribute('charset', charset)
      script.setAttribute('src', url)
      script.async = true

      return script
    },

    /**
     * 单行写一个评级组件
     * rate [1, 5]
     * 传入一个 1-5 的数字
     * @return {[type]} [description]
     */
    getStar (rate = 1) {
      '★★★★★☆☆☆☆☆'.slice(5 - rate, 10 - rate)
    },

    /**
     * 去掉前后空格
     * 1:前后空格(默认)  2:所有空格  3:前空格 4:后空格
     * @param  {[type]} str  [description]
     * @param  {Number} type [description]
     * @return {[type]}      [description]
     */
    trim (str, type = 1) {
      switch (type) {
        case 1:
          return str.replace(/(^\s*)|(\s*$)/g, '')
        case 2:
          return str.replace(/\s+/g, '')
        case 3:
          return str.replace(/(^\s*)/g, '')
        case 4:
          return str.replace(/(\s*$)/g, '')
        default:
          return str
      }
    },

    /**
     * 大小写转换
     * 1:首字母大写 2:首页母小写 3:大小写转换 4:全部大写 5:全部小写
     */
    changeCase (str, type) {
      function ToggleCase (str) {
        var itemText = ''
        str.split('').forEach(
          function (item) {
            if (/^([a-z]+)/.test(item)) {
              itemText += item.toUpperCase()
            } else if (/^([A-Z]+)/.test(item)) {
              itemText += item.toLowerCase()
            } else {
              itemText += item
            }
          })
        return itemText
      }

      switch (type) {
        case 1:
          return str.replace(/^(\w)(\w+)/, function (v, v1, v2) {
            return v1.toUpperCase() + v2.toLowerCase()
          })
        case 2:
          return str.replace(/^(\w)(\w+)/, function (v, v1, v2) {
            return v1.toLowerCase() + v2.toUpperCase()
          })
        case 3:
          return ToggleCase(str)
        case 4:
          return str.toUpperCase()
        case 5:
          return str.toLowerCase()
        default:
          return str
      }
    },

    /**
     * HTML 实体字符转义
     */
    htmlEncode (str) {
      let s = ''
      if (str.length === 0) {
        return ''
      }
      s = str.replace(/&/g, '&amp;')
      s = str.replace(/>/g, '&gt;')
      s = str.replace(/</g, '&lt;')
      s = str.replace(/\s/g, '&nbsp;')
      // s = str.replace(/\'/g, '&#39;')
      // s = str.replace(/\"/g, '&quot;')
      s = str.replace(/\n/g, '<br>')
      return s
    },

    /**
     * 如何装逼用代码骂别人SB
     * http://www.jfh.com/jfperiodical/article/3224
     * @return {[type]} [description]
     */
    getSB () {
      console.log((!(~+[]) + {})[--[~+''][+[]] * [~+[]] + ~~!+[]] + ({} + [])[[~!+[]] * ~+[]])
    },

    /**
     * 如何用代码优雅的证明自己NB
     * @return {[type]} [description]
     */
    getNB () {
      console.log(([][[]] + [])[+!![]] + ([] + {})[!+[] + !![]])
    },

    /**
     * 如何优雅的实现金钱格式化
     * 1234567890 --> 1,234,567,890
     * @return {[type]}       [description]
     */
    formatMoney (str = '1234567890') {
      return str.replace(/\B(?=(\d{3})+(?!\d))/g, ',') // 1,234,567,890

      // return str.split('').reverse().reduce((prev, next, index) => {
         // return ((index % 3) ? next : (next + ',')) + prev
      // })
    },

    /**
     * 实现标准JSON的深拷贝
     * 不考虑IE的情况下，标准JSON格式的对象蛮实用，不过对于undefined和function的会忽略掉。
     * @param  {[type]} a [description]
     * @return {[type]}   [description]
     */
    deepCopy (a) {
      return JSON.parse(JSON.stringify(a))

      // var a = {
      //     a: 1,
      //     b: { c: 1, d: 2 }
      // }
      // var b=JSON.parse(JSON.stringify(a))
    }
  },
  time: {
    /**
     * 获取当前时间
     * 2017-08-11 22:52:13 星期六
     * @param  {Boolean} hasDay  是否需要年月日
     * @param  {Boolean} hasHour 是否需要十分秒
     * @param  {Boolean} hasWeek 是否需要星期
     * @param  {String} sign1 分隔符
     * @param  {String} sign2 分隔符
     */
    getNowDate (hasDay = true, hasHour = true, hasWeek = true, sign1 = '-', sign2 = ':') {
      let date = new Date()
      let year = date.getFullYear()
      let month = (date.getMonth() + 1).toString().padStart(2, '0')
      let day = (date.getDate()).toString().padStart(2, '0')
      let hour = (date.getHours()).toString().padStart(2, '0')
      let minutes = (date.getMinutes()).toString().padStart(2, '0')
      let seconds = (date.getSeconds()).toString().padStart(2, '0')
      let weekArr = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天']
      let week = weekArr[date.getDay()]

      let time1 = hasDay ? `${year}${sign1}${month}${sign1}${day}` : ''
      let time2 = hasHour ? `${hour}${sign2}${minutes}${sign2}${seconds}` : ''
      let time3 = hasWeek ? `${week}` : ''

      return `${time1} ${time2} ${time3}`.replace(/(^\s*)|(\s*$)/g, '')
    },

    /**
     * 格式化时间戳 (分:秒)
     * 61 -> 01:01
     * @param  {Number} timestamp 时间戳
     * @param  {String} sign      分隔符，默认 :
     * @return {[type]}           [description]
     */
    format (timestamp, sign = ':') {
      timestamp = Math.floor(timestamp)

      let minute = (Math.floor(timestamp / 60)).toString().padStart(2, '0')
      let second = (timestamp % 60).toString().padStart(2, '0')
      return `${minute}${sign}${second}`
    },

    /**
     * 倒计时
     * countDown('2017-8-11 24:0:0') -> 剩余0天0小时54分钟41秒
     * @param  {Date} endTime 结束时间
     * @return {[type]}         [description]
     */
    countDown (endTime) {
      let start = new Date()
      let end = new Date(endTime)
      let dif = end.getTime() - start.getTime()

      let d = 0
      let h = 0
      let m = 0
      let s = 0

      if (dif >= 0) {
        d = Math.floor(dif / 1000 / 3600 / 24)
        h = Math.floor(dif / 1000 / 60 / 60 % 24)
        m = Math.floor(dif / 1000 / 60 % 60)
        s = Math.floor(dif / 1000 % 60)
      }

      return `仅剩${d}天${h}小时${m}分钟${s}秒`
    }
  },
  http: {
    /**
     * 封装 AJAX
     * @param {Object}        obj 默认是一个空对象
     * @param {string}        obj.type http连接的方式，包括POST和GET两种方式
     * @param {string}        obj.url 发送请求的url
     * @param {boolean}       obj.async 是否为异步请求，true为异步的，false为同步的
     * @param {object}        obj.data 发送的参数，格式为对象类型
     * @param {function}      obj.success ajax发送并接收成功调用的回调函数
     * @param {function}      obj.error ajax发送失败或者接收失败调用的回调函数
     *
     * ajax({
     *  type: 'get',
     *  url: 'xxx',
     *  data: {
     *    id: '111'
     *  },
     *  success: function(res){
     *    console.log(res)
     *  }
     * })
     *
     */
    ajax (obj = {}) {
      obj.type = obj.type.toUpperCase() || 'POST'
      obj.url = obj.url || ''
      obj.async = obj.async || true
      obj.data = obj.data || null
      obj.success = obj.success || function () {}
      obj.error = obj.error || function () {}

      // 能力检测 IE5 IE6
      let xhr = window.XMLHttpRequest ? new window.XMLHttpRequest() : new window.ActiveXObject('Microsoft.XMLHTTP')

      let dataArr = []
      for (let key in obj.data) {
        dataArr.push(key + '=' + obj.data[key])
      }

      // 处理 POST 与 GET
      let postData = dataArr.join('&')

      if (obj.type === 'POST') {
        xhr.open(obj.type, obj.url, obj.async)
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8')
        xhr.send(postData)
      } else if (obj.type === 'GET') {
        xhr.open(obj.type, obj.url + '?' + postData, obj.async)
        xhr.send()
      }

      // 异步处理
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            // let res = JSON.parse(xhr.responseText)
            // obj.success(res)
            obj.success(xhr.responseText)
          } else {
            obj.error(xhr.status)
          }
        }
      }
    },

    /**
     * 封装 JSONP
     * @param  {[type]} url       [description]
     * @param  {[type]} onsuccess [description]
     * @param  {[type]} onerror   [description]
     * @param  {[type]} charset   [description]
     * @return {[type]}           [description]
     */
    jsonp (url, onsuccess, onerror, charset) {
      // 必须与服务器回调函数名称一致
      let callbackName = utils.str.getRandomStr(5, 'tt_player')

      window[callbackName] = function () {
        if (onsuccess) {
          onsuccess(arguments[0])
        }
      }

      // 动态创建 script
      let script = utils.str.createScript(url + '&callback=' + callbackName)

      // 时间监听
      script.onload = script.onreadystatechange = function () {
        if (!script.readyState || /loaded|complete/.test(script.readyState)) {
          // 移除该 script 的 DOM 对象
          script.onload = script.onreadystatechange = null
          script.parentNode && script.parentNode.removeChild(script)
          window[callbackName] = null
        }
      }

      // 错误处理
      script.onerror = function () {
        if (onerror) {
          onerror()
        }
      }

      // 发送请求
      document.getElementsByTagName('head')[0].appendChild(script)
    },

    /**
     * 设置 url 参数
     * setUrlParam({a:1,b:2}) -> a=1&b=2
     * @param {[type]} obj 传入一个对象
     */
    setUrlParam (obj) {
      let query = []

      for (let i in obj) {
        if (obj[i] != null && obj[i] !== '') {
          query.push(i + '=' + obj[i])
        }
      }

      return query.join('&')
    },

    /**
     * 解析 URL 参数
     * http://localhost:8080/?id=123&key=vaule#/restaurant/seller
     * "?id=123&key=vaule"
     * {id: "123", key: "vaule"}
     */
    urlParse (url = window.location.search) {
      // window.location.href 当前文件的绝对地址
      // window.location.search 当前文件的哈希地址
      let obj = {}
      let reg = /[?&][^?&]+=[^?&]+/g
      let arr = url.match(reg) // ["?id=123", "&key=vaule"]

      if (arr) {
        arr.forEach((item) => {
          // 删除 ? 和 &，以 = 为标志分割数组
          let tempArr = item.substring(1).split('=') // ["id", "123"]  ["key", "vaule"]
          // 使用 decodeURIComponent() 对编码后的 URI 进行解码
          let key = decodeURIComponent(tempArr[0])
          let value = decodeURIComponent(tempArr[1])
          obj[key] = value
        })
      }
      return obj
    }
  },
  store: {
    // 存储 cookie
    setCookie (name, value, iDay) {
      var oDate = new Date()
      oDate.setDate(oDate.getDate() + iDay)
      document.cookie = name + '=' + value + ';expires=' + oDate
    },

    // 获取 cookie
    getCookie (name) {
      var arr = document.cookie.split('; ')
      for (var i = 0; i < arr.length; i++) {
        var arr2 = arr[i].split('=')
        if (arr2[0] === name) {
          return arr2[1]
        }
      }
      return ''
    },

    // 删除 cookie
    removeCookie (name) {
      this.setCookie(name, 1, -1)
    },

    // https://github.com/ustbhuangyi/storage

    // 存储 localstorage
    // localStorage.key="value"
    // localStorage.setItem(key, value)
    setLocalstorage (key = '__test__', value) {
      if (typeof value !== 'string') {
        value = JSON.stringify(value)
      }
      return window.localStorage.setItem(key, value)
    },

    // 获取 localstorage
    // localStorage.key
    getLocalstorage (key = '__test__', def = '') {
      if (localStorage.key) {
        return window.localStorage.getItem(key)
      } else {
        return def
      }
    },

    // 删除单个数据 localstorage
    // localStorage.removeItem("key");
    removeLocalstorage (key = '__test__') {
      window.localStorage.removeItem(key)
    },

    // 删除所有数据 localstorage
    clearLocalstorage () {
      return window.localStorage.clear()
    }
  },
  event: {
    // event 兼容
    getEvent (event) {
      return event || window.event
    },

    // type 兼容
    getType (event) {
      return event.type
    },

    // target 兼容
    getTarget (event) {
      return event.target ? event.target : event.srcElement
    },

    // 添加事件句柄
    addHandler (elem, type, listener) {
      if (elem.addEventListener) {
        elem.addEventListener(type, listener, false)
      } else if (elem.attachEvent) {
        elem.attachEvent('on' + type, listener)
      } else {
        // 在这里由于.与'on'字符串不能链接，只能用 []
        elem['on' + type] = listener
      }
    },

    // 移除事件句柄
    removeHandler (elem, type, listener) {
      if (elem.removeEventListener) {
        elem.removeEventListener(type, listener, false)
      } else if (elem.detachEvent) {
        elem.detachEvent('on' + type, listener)
      } else {
        elem['on' + type] = null
      }
    },

    // 添加事件代理
    addAgent (elem, type, agent, listener) {
      elem.addEventListener(type, function (e) {
        if (e.target.matches(agent)) {
          listener.call(e.target, e) // this 指向 e.target
        }
      })
    },

    // 取消默认行为
    preventDefault (event) {
      if (event.preventDefault) {
        event.preventDefault()
      } else {
        event.returnValue = false
      }
    },

    // 阻止事件冒泡
    stopPropagation (event) {
      if (event.stopPropagation) {
        event.stopPropagation()
      } else {
        event.cancelBubble = true
      }
    }
  },
  others: {
    /**
     * 获取浏览器信息
     * @return {string} 浏览器名称
     */
    whatBrowser () {
      let BrowserAgent = navigator.userAgent // 返回由客户机发送服务器的 user-agent 头部的值。
      // let BrowserName = navigator.appName // 返回浏览器的名称。
      // let BrowserCode = navigator.appCodeName // 返回浏览器的代码名。
      // let BrowserVersion = navigator.appVersion // 返回浏览器的平台和版本信息。
      // let BrowserCookie = navigator.cookieEnabled // 返回指明浏览器中是否启用 cookie 的布尔值。
      // let BrowserOnline = navigator.onLine //返回指明系统是否处于脱机模式的布尔值。
      // let BrowserPlatform = navigator.platform // 返回运行浏览器的操作系统平台。
      // let BrowserLanguage = navigator.language // 返回 OS 的自然语言设置。

      let browser = 'Failed to identify the browser'

      if (BrowserAgent.indexOf('Firefox') > -1) {
        browser = 'Firefox'
      } else if (BrowserAgent.indexOf('Chrome') > -1) {
        browser = 'Chrome'
      } else if (BrowserAgent.indexOf('MSIE') > -1 && BrowserAgent.indexOf('Trident') > -1) {
        browser = 'IE(8-10)'
      }

      return browser
    }
  }
}

export default utils
