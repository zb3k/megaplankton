<template lang="pug">
  div.user-panel
    avatar(v-if="value.avatar" :value="value.avatar")
    .user-panel-info(v-if="label || value.name")
      .label(v-if="label") {{label}}
      .username(v-if="value.name") {{value.name}}
    slot
</template>

<script>
  import Avatar from 'components/Avatar';
  export default {
    name: 'user-panel',

    components: {
      Avatar,
    },

    props: {
      value: {
        default: () => ({}),
      },
      label: String,
    },
  };
</script>

<style lang="stylus">
  .user-panel
    display       flex
    flex-direction row
    font-size     0.9rem
    box-shadow 0 0 0 1px #0001
    display       inline-block
    padding       10px
    position      relative
    border-radius 30px
    background    #FFF
    margin-bottom 10px
    >*
      display inline-block
      vertical-align top

    + .user-panel
      margin-left 10px
    .user-panel-info
      margin-left 5px
      margin-right 10px
    .avatar
      +.avatar
        margin-left -7px
        box-shadow 0 0 0 2px #FFF
      margin-right 5px
      left         10px
      &:last-child
        margin-right 0
    .label
      opacity .5
    .username
      font-weight bold

</style>
