<template>
  <div v-on:click="hiddenContent">
    <div id="app" v-on:click="hiddenContent">
      <img src="../assets/logo3.png">
    </div>
    <div id="search-container" :class="[inputBoxFocus?'search-box-border-blue':'search-box-border-grey']">
      <input type="text" id="search-text" autocomplete="off" v-model="query" tabindex="=-1" placeholder="Kok Kip Your Answer..." v-on:keyup.13="submit" v-on:click="showContent" @focus="onFocus()" @blur="onBlur()" @keyup.up="upClick()" @keyup.down="downClick()">
      <button id="voice-btn" title="search by voice" v-on:click="voiceInput"></button>
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
      querySuggest: [],
      inputBoxFocus: false,
      idx: 0
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
      this.idx = -1
    },
    chooseItem: function (data) {
      this.query = data
      this.submit()
    },
    showContent: function () {
      var dropdownContainer = document.getElementById('dropdown-content')
      dropdownContainer.style.display = 'block'
    },
    hiddenContent: function () {
      var dropdownContainer = document.getElementById('dropdown-content')
      dropdownContainer.style.display = 'none'
    },
    onFocus: function () {
      this.inputBoxFocus = true
    },
    onBlur: function () {
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
          this.showContent()
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="css" src="../../static/css/SearchEngine.css" scoped></style>
