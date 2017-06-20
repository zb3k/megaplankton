<template lang="pug">
  span.badge(:class="className"): slot
</template>

<script>
  export default {
    props: {
      type: String,
      rounded: Boolean,
    },

    computed: {
      className() {
        return {
          [`badge-${this.type}`]: true,
          'badge-rounded': this.rounded,
        };
      },
    },
  };
</script>

<style lang="stylus">
  .badge
    display       inline-block
    background    #9999
    border-radius 2px
    padding       1px 5px
    font-size     0.8rem
    color         #FFF

    & + .badge
      margin-left 5px

    &.badge-rounded
      border-radius 20px
      padding-right 5px
      min-width 7px
      text-align center
      padding-left @padding-right

    &.badge-info
      background-color #09f
    &.badge-warning
      background-color #f90
    &.badge-danger
      background-color #D30
    &.badge-success
      background-color #093

</style>
