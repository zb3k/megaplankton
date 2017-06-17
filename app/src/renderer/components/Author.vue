<template lang="pug">
  div.author {{ value.name }}
</template>

<script>
  export default {
    name: 'author',

    props: {
      value: null,
    },
  };
</script>

<style lang="stylus">
  .author
    display inline-block
    font-weight bold
</style>
