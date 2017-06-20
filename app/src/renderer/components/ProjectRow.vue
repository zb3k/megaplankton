<template lang="pug">
  div.project-row-box(:class="{active:showContent}")
    div.project-row(@click="showContent=!showContent")
      div.project-info: slot(name="info")
      div.project-name
        span.project-icon: i.fa(:class="showContent ? 'fa-folder-open' : 'fa-folder'")
        |  {{ project.name }}
      //- div.parent-project-name(v-if="project.super_project") {{ project.super_project.name }}
    slot(v-if="showContent")
</template>

<script>
  export default {
    props: {
      project: Object,
    },

    data: () => ({
      showContent: false,
    }),
  };
</script>

<style lang="stylus">
  .project-row
    position relative
    background    #f9f9f9
    border-bottom 1px solid #EEE
    transition    all .15s ease
    cursor        pointer
    // display       table
    width         100%
    color         #555
    // background linear-gradient(0deg, #f9f9f9, #FFF)

    // .active > &
    //   box-shadow 0 1px 5px #0001

    > div
      padding    5px 10px 5px 20px
      // display    table-cell
      // text-align left

    &:hover
      background-color #EEF5F4

    .project-icon
      display inline-block
      width 18px
    .project-name
      // width 50%
      // font-weight 600
      font-size 1rem

    .parent-project-name
      color       #999
      font-size   .9rem
      // display     inline-block
      // margin-left 5px
    .project-info
      position absolute
      right 0
      top 0
      bottom 0
      text-align right
      padding-right 5px !important
      // >*
      //   vertical-align middle

</style>
