<template lang="pug">
  div.actions: slot
</template>

<script>
  export default {
    name: 'ui-actions',
  };
</script>

<style lang="stylus">
  .actions
    > *
      display        block
      vertical-align top
      width          22px
      line-height    @width
      height         @width
      box-shadow     0 0 0 1px #0001
      text-align     center
      border-radius  50%
      margin-bottom  5px
      transition     all .15s ease

      &:hover
        box-shadow 0 0 0 1px #09F
        cursor     pointer

</style>
