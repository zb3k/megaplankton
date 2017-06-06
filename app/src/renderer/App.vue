<template lang="pug">
  #app
    router-view
</template>


<script>
  import store from 'renderer/vuex/store';

  export default {
    store,
  };
</script>


<style lang="stylus">
  @import url('https://fonts.googleapis.com/css?family=Open+Sans:400,600&subset=cyrillic,cyrillic-ext')

  *
    margin  0
    padding 0

  html, body
    height 100%
  html
    font-size 14px
    font-family "Open Sans"
</style>
