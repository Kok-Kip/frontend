<template>
    <div id="search-container" v-on:click="hiddenContent">
        <transition name="fade">
            <loading v-if="isLoading"></loading>
        </transition>
        <div id="search-head">
            <img src="../assets/logo3.png" id="search-head-img" v-on:click="returnToMainPage">
            <div id="text-container" :class="[inputBoxFocus?'text-container-border-blue':'text-container-border-grey']">
                <input type="text" id="search-text" autocomplete="off" v-model="query" tabindex="=-1" placeholder="Kok Kip Your Answer..."  v-on:keyup.13="submit" v-on:click="showContent" @focus="onFocus()" @blur="onBlur()" @keyup.up="upClick()" @keyup.down="downClick()">
                <button id="voice-btn" title="search by voice" v-on:click="voiceInput"></button>
                <div id="dropdown-content">
                  <div v-for="item in querySuggest" :key="item" v-on:click="chooseItem(item)">
                    {{ item }}
                  </div>
                </div>
            </div>
        </div>

        <div id="search-result">
            <div v-for="(item, index) in resData" :key="index">
              <div class="search-item">
                  <span id="tipText">[{{keyWord}}]</span><span id="res-title" class="item-title" v-html="brighten(item.title)"></span>
                  <p class="item-desc" v-html="brighten(item.text)"></p>
                  <p class="date-desc">{{item.date}}</p>
              </div>
            </div>
        </div>
    </div>
</template>

<script>
import jsonp from 'jsonp'
import Loading from '@/components/LoadBar'
import axios from 'axios'
export default {
  name: 'SearchPage',
  data () {
    return {
      query: '',
      keyWord: '', // keyWord shown on results
      querySuggest: [],
      resData: [],
      isFirst: true,
      shouldShow: true,
      inputBoxFocus: false,
      isLoading: false,
      request_url: ''
    }
  },
  components: {Loading},
  methods: {
    brighten: function (content) {
      if (this.keyWord) {
        const reg = new RegExp(this.keyWord, 'g')
        let result = content.replace(reg, '<span style="color: #ff7866;">' + this.keyWord + '</span>')
        // let result = content.replace(reg, '<span id="red-text">' + this.keyWord + '</span>')
        return result
      }
    },
    submit: function () {
      this.$router.push({
        path: '/result',
        query: {
          q: this.query
        }
      })
      this.handleQuery(this.query)
    },
    returnToMainPage: function () {
      this.$router.push({
        path: '/'
      })
    },
    handleQuery: function (query) {
      this.hiddenContent()
      this.isLoading = true // show loading bar
      this.resData = []
      axios({
        method: 'get',
        // 这里可以考虑把 http://127.0.0.1:5000 放进 config 里面
        // server_api = 'http://111.230.212.14:5000/search?key='
        // url: `http://127.0.0.1:5000/search?key=${query}`
        url: this.request_url + `/search?key=${query}`
      }).then((response) => {
        // 此处处理 response 返回的数据
        this.resData = []
        const data = response['data']['data']
        this.resData = data
        this.keyWord = query
        // console.log(response)

        this.isLoading = false // hide loading bar
      }).catch((error) => {
        console.log(error)
        this.isLoading = false // hide loading bar
        alert('Sorry! Our service is unavailable now')
      })
    },
    updateQuery: function (data) {
      this.querySuggest = []
      for (var i = data.length - 1; i >= 0; i--) {
        this.querySuggest.push(data[i])
      }
      this.idx = -1
    },
    chooseItem: function (data) {
      this.query = data
      var dropdownContainer = document.getElementById('dropdown-content')
      if (dropdownContainer === null) {
        return
      }
      dropdownContainer.style.display = 'none'
      this.shouldShow = false
      this.submit()
    },
    showContent: function () {
      var dropdownContainer = document.getElementById('dropdown-content')
      if (dropdownContainer === null) {
        return
      }
      dropdownContainer.style.display = 'block'
    },
    hiddenContent: function () {
      var dropdownContainer = document.getElementById('dropdown-content')
      if (dropdownContainer === null) {
        return
      }
      dropdownContainer.style.display = 'none'
    },
    onFocus: function () {
      console.log('onFocus')
      this.inputBoxFocus = true
    },
    onBlur: function () {
      console.log('onBlur')
      this.inputBoxFocus = false
    },
    upClick: function () {
      console.log('upClick')
      if (this.idx <= 0) {
        return
      }
      this.query = this.querySuggest[this.idx - 1]
    },
    downClick: function () {
      console.log('downClick')
      if (this.idx > 9) {
        return
      }
      this.query = this.querySuggest[this.idx + 1]
    },
    voiceInput: function () {
      console.log('inputByVoice')
      this.$router.push({
        path: '/voice'
      })
    }
  },
  created: function () {
    this.request_url = process.env.HOST
    console.log(this.request_url)
    // Get query from URL
    const q = this.$route.query.q
    this.isFirst = true
    this.query = q
    this.handleQuery(q)
  },
  watch: {
    query: function () {
      console.log('In watch query')
      console.log(this.isFirst)
      if (this.query === '' || this.isFirst || !this.shouldShow) {
        this.isFirst = false
        this.shouldShow = true
        this.querySuggest = []
        return
      }

      var sugurl = 'https://suggestion.baidu.com/su?wd=#content#&cb=window.baidu.sug'
      var content = this.query
      sugurl = sugurl.replace('#content#', content)
      var param = {
        param: 'cb'
      }
      jsonp(sugurl, param, (err, data) => {
        if (err) {
          console.error(err.message)
        } else {
          console.log(data.s)
          this.updateQuery(data.s)
          this.showContent()
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="css" src="../../static/css/SearchPage.css" scoped></style>
