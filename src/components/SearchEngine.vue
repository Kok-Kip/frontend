<template>
  <div id="search-container">
    <div id="search"></div>
    <div id="search-icon"></div>
    <div id="search-text"></div>
    <input type="text" id="text" v-model="query">
    <div id="search-cursor"></div>
    <button id="search-submit" title="Submit"></button>
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
<style scoped>
#search-container {
  margin: 0 auto 0 auto;
}

#search {

}

#search-icon {

}

#search-text {

}

#text {
  width: 43%;
  height: 41px;

  border: solid 1px #39F;
  border-radius: 25px;
  font-size: 24px;
  padding: 0px;
  margin: 10px 0 0 0px;
}

#search-text {

}

#search-cursor {
}

#search-submit {
  height: 45px;
  width: 10%;
/*  background-color: #39F;*/
  border-width: 1px;
  border-style: solid;
  font-size: 24px;
  color: #FFF;
  margin: -2px 0 0 -5px;
  padding: 0px;
}

</style>
