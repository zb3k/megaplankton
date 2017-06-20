<template lang="pug">
  div.html-content(v-html="content")
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
        return this.markdown ? md(this.value.replace(/<br>/ig, '\n\n')) : this.value;
      },
    },
  };
</script>

<style lang="stylus">
  .html-content
    >*:last-child,
    >*:last-child >*:last-child,
    >*:last-child >*:last-child >*:last-child
      margin-bottom 0 !important
    p
      margin-bottom 10px
    a
      color #09D
    ul, ol
      margin 5px 20px
      li
        margin-bottom 5px

    blockquote
      background    rgba(#000, .03)
      color         #555
      font-size     0.8rem
      padding       5px 10px
      margin-bottom 5px
      border-left   2px solid #0003
      max-width     100%
      float         left

      & + *
        clear both
      p
        margin-bottom 5px
      & p:last-child
        margin-bottom 0
</style>
