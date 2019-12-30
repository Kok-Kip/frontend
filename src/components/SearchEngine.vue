<template>
  <div>
    <div id="app">
      <img src="../assets/logo3.png">
    </div>
    <div id="search-container">
      <input type="text" id="search-text" v-model="query" tabindex="=-1" placeholder="Kok Kip Your Answer...">
      <button id="search-submit" title="Submit" v-on:click="submit"></button>
      <span id="search-comment">{{comment}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchEngine',
  data () {
    return {
      query: '',
      comment: 'Search'
      // msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    // submit: function() {
    // }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="css" src="../../static/css/SearchEngine.css" scoped></style>
