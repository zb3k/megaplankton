<template lang="pug">
  a.ext-link(@click="open"): slot
</template>

<script>
  import electron from 'electron';

  export default {
    name: 'favorite',

    props: {
      href: String,
    },

    methods: {
      open() {
        electron.shell.openExternal(this.href);
      },
    },
  };
</script>

<style lang="stylus">
  .ext-link
    display inline-block
    color #999
</style>
