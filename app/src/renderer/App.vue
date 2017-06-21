<template lang="pug">
  #app
    router-view
</template>


<script>
  import store from 'renderer/vuex/store';

  export default {
    store,

    // mounted() {
    //   const taskId = window.localStorage.getItem('last-task-id');
    //   if (taskId) {
    //     console.log('taskId => ', taskId);
    //     this.$router.push({
    //       name: 'tasks',
    //       params: { id: taskId },
    //     });
    //   }
    // },
  };
</script>


<style lang="stylus">
  @import url('https://fonts.googleapis.com/css?family=Open+Sans:400,600&subset=cyrillic,cyrillic-ext')
  @import url('https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css')

  *
    margin  0
    padding 0

  html, body
    height 100%
  html, input, textarea
    font-size 14px
    font-family "Open Sans"
  h1
    margin-bottom 30px
  hr
    border     none
    height     1px
    background #0001
    margin     20px 0
</style>
