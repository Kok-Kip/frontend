<template>
    <div id="search-container">
        <div id="search-head">
            <img src="../assets/logo3.png" id="search-head-img">
            <div id="text-container">
                <input type="text" id="search-text" v-model="query" tabindex="=-1" placeholder="Kok Kip Your Answer...">
                <button id="search-submit" title="Submit" v-on:click="submit"></button>
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
export default {
  name: 'SearchPage',
  data () {
    return {
      query: '',
      response: []
      // msg: 'Welcome to Your Vue.js App'
    }
  },
  computed: {
    // queryResponse: function() {

    // }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="css" src="../../static/css/SearchPage.css" scoped></style>
