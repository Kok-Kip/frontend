<template>
  <div>
    <div id="app">
      <img src="../assets/logo3.png">
    </div>
    <div id="search-container">
      <input type="text" id="search-text" autocomplete="off" v-model="query" tabindex="=-1" placeholder="Kok Kip Your Answer..." v-on:keyup.13="submit">
      <button id="search-submit" title="Submit" v-on:click="submit"></button>
      <div id="dropdown-content">
        <div v-for="item in querySuggest" :key="item" v-on:click="chooseItem(item)">
          {{ item }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import jsonp from 'jsonp'
export default {
  name: 'SearchEngine',
  data () {
    return {
      query: '',
      querySuggest: []
      // msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    submit: function () {
      if (this.query === '') {
        return
      }

      this.$router.push({
        path: '/result',
        query: {
          q: this.query
        }
      })
    },
    updateQuery: function (data) {
      this.querySuggest = []
      for (var i = 0; i <= data.length - 1; i++) {
        this.querySuggest.push(data[i])
      }
    },
    chooseItem: function (data) {
      this.query = data
    }
  },
  mounted () {

  },
  watch: {
    query: function () {
      if (this.query === '') {
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
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="css" src="../../static/css/SearchEngine.css" scoped></style>
