<template lang="pug">
  span.badge(:class="`badge-${type}`"): slot
</template>

<script>
  export default {
    props: {
      type: String,
    },
  };
</script>

<style lang="stylus">
  .badge
    display       inline-block
    background    #999
    border-radius 3px
    padding       2px 5px
    font-size     0.8rem
    color         #FFF
    margin        0 2px

    &.badge-info
      background #09d
    &.badge-danger
      background #D30
    &.badge-warning
      background #D90

</style>
