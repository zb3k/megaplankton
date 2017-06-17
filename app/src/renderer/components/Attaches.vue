<template lang="pug">
  div.attaches(v-if="value")
    div(v-for="file in files" :key="file.name")
      .thumb
        img(v-if="file.thumb" :src="file.thumb")
        div.ext(v-else) {{ file.ext }}
      .filename {{ file.name }}
</template>

<script>
  import api from '../vuex/api';

  export default {
    name: 'attaches',

    props: {
      value: null,
    },

    computed: {
      files() {
        let result = Object.values(this.value);
        result = result.map((item) => {
          item.thumb = api.getThumb(item.url);
          item.ext = item.name.replace(/.*\.(\w+)/i, '$1');
          return item;
        });
        return result;
      },
    },

  };
</script>

<style lang="stylus">
  .attaches
    // background #F9F9F9
    // padding    10px
    margin 20px -5px

    // border 2px solid #DDD
    // border-radius 5px

    > div
      display        inline-block
      //             border  1px solid #EE
      box-shadow     0 1px 3px #0002
      //             padding 5px
      overflow       hidden
      margin         5px
      border-radius  3px
      background     #fff
      vertical-align top
      width          200px

      .thumb
        width   200px
        height  125px
        display         flex
        align-items     center
        justify-content center
        background      #E2EDF0
        img
          max-width  100%
          max-height 100%
          display    block
      .ext
        text-transform uppercase
        font-size      2rem
        color          #8D9596
        text-shadow    0 1px 0 #FFF3
    .filename
      font-size 0.8rem
      text-overflow ellipsis
      white-space nowrap
      padding 8px
      overflow hidden
      background #FFF
      color #333
      box-shadow 0 0 3px #0003
      position relative
      z-index 1

</style>
