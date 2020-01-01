<template>
    <div id="search-container">
        <div id="search-head">
            <img src="../assets/logo3.png" id="search-head-img">
            <div id="text-container">
                <input type="text" id="search-text" v-model="query" tabindex="=-1" placeholder="Kok Kip Your Answer...">
                <button id="search-submit" title="Submit" v-on:click="submit"></button>
                <div id="dropdown-content">
                  <div v-for="item in querySuggest" :key="item" v-on:click="chooseItem(item)">
                    {{ item }}
                  </div>
                </div>
            </div>
            <div id="curve">
              <hr align="center" size="1">
            </div>
        </div>

        <div id="search-result">
        <!--    <div v-for="item in queryResponse">
                <a id="res-title" v-bind:href="item.url" target="_blank" class="item-title">{{item.title}}</a>
                <p class="res-desc">{{item.description}}</p>
                <li id="date">{{item.date}}</li>
            </div> -->
        </div>
        <div id="footer"></div>
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
      response: []
      // msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    submit: function () {
      console.log('Hello')
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
    console.log(q)
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
