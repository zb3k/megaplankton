<template lang="pug">
  div.datetime {{ formatedValue }}
</template>

<script>
  import moment from 'moment';

  export default {
    name: 'datetime',

    props: {
      value: null,
    },

    computed: {
      formatedValue() {
        return moment(this.value).format('DD.MM.YYYY');
      },
    },
  };
</script>

<style lang="stylus">
  .datetime
    display inline-block
    // font-weight bold
</style>
