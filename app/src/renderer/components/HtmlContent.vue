<template lang="pug">
  div(v-html="content")
</template>

<script>
  import md from 'marked';

  export default {
    name: 'html-content',

    props: {
      value: null,
      markdown: Boolean,
    },

    computed: {
      content() {
        // return this.value.replace(/\n/g, '\n\n');
        return this.markdown ? md(this.value.replace(/\n/g, '\n\n')) : this.value;
      },
    },
  };
</script>

<style lang="stylus">
  p
    margin-bottom 20px
  a
    color #09D
  ul
    margin 20px
    li
      margin-bottom 5px
  blockquote
    background #DDD
</style>
