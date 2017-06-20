<template lang="pug">
  div.avatar: img(:src="value")
</template>

<script>
  export default {
    name: 'avatar',

    props: {
      value: null,
    },
  };
</script>

<style lang="stylus">
  .avatar
    width         35px
    height        @width
    border-radius 50%
    overflow      hidden
    img
      max-width 100%
      max-height 100%
</style>
