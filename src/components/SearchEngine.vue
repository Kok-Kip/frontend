<template>
  <div id="search-container">
<!--     <div id="search-text">{{PlaceHolder}}</div> -->
    <input type="text" id="search-text" v-model="query" tabindex="=-1" placeholder="Input your message, and search on Kok-Kip">
<!--     <button id="search-submit" title="Submit"></button> -->
  </div>
</template>

<script>
export default {
  name: 'SearchEngine',
  data () {
    return {
      // msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="css" src="../../static/css/SearchEngine.css" scoped></style>
