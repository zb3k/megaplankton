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
  *
    margin  0
    padding 0

  html, body
    height 100%
</style>
