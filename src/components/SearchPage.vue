<template>
    <div id="search-container">
        <div id="search-head">
            <img src="../assets/logo3.png" id="search-head-img">
            <div id="text-container">
                <input type="text" id="search-text" autocomplete="off" v-model="query" tabindex="=-1" placeholder="Kok Kip Your Answer..."  v-on:keyup.13="submit">
                <button id="search-submit" title="Submit" v-on:click="submit"></button>
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
                  <a id="res-title" target="_blank" class="item-title" v-bind:href="item.url">{{item.title}}</a>
                  <p class="item-desc">{{item.description}}</p>
              </div>
            </div>
        </div>

        <!-- <div id="footer">
          <img src="../assets/logo3.png" id="search-head-img">
        </div> -->
    </div>
</template>

<script>
import jsonp from 'jsonp'
export default {
  name: 'SearchPage',
  data () {
    return {
      query: '',
      querySuggest: [],
      resData: []
      // msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    submit: function () {
      this.$router.push({
        path: '/result',
        query: {
          q: this.query
        }
      })
      this.handleQuery(this.query)
    },
    handleQuery: function (query) {
      this.$axios({
        method: 'get',
        // 这里可以考虑把 http://127.0.0.1:5000 放进 config 里面
        url: `http://127.0.0.1:5000/search?key=${query}`
      }).then((response) => {
        // 此处处理 response 返回的数据
        this.resData = []
        const data = response['data']['data']
        this.resData = data
        console.log(response)
      }).catch((error) => {
        console.log(error)
      })
    },
    updateQuery: function (data) {
      this.querySuggest = []
      for (var i = data.length - 1; i >= 0; i--) {
        this.querySuggest.push(data[i])
      }
    },
    chooseItem: function (data) {
      this.query = data
    }
  },
  created: function () {
    // 得到 query 的值
    const q = this.$route.query.q
    this.handleQuery(q)
  },
  watch: {
    query: function () {
      if (this.query === '') return

      var sugurl = 'http://suggestion.baidu.com/su?wd=#content#&cb=window.baidu.sug'
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
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="css" src="../../static/css/SearchPage.css" scoped></style>
