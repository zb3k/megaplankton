<template lang="pug">
  span.favorite: i.fa(:class="active ? 'fa-star' : 'fa-star-o'")
</template>

<script>
  export default {
    name: 'favorite',
    props: {
      active: {},
    },
  };
</script>

<style lang="stylus">
  .favorite
    display        inline-block
    color          #F90
    font-size      1.1rem
    vertical-align middle
</style>
