<template lang="pug">
  div.project-row
    div.project-info: slot(name="info")
    div.project-name {{ project.name }}
    div.parent-project-name(v-if="project.super_project") {{ project.super_project.name }}
</template>

<script>
  export default {
    props: {
      project: Object,
    },
  };
</script>

<style lang="stylus">
  .project-row
    border-bottom 1px solid #EEE
    transition    all .15s ease
    cursor        pointer
    padding       10px

    &:hover
      background-color #EEF5F4

    .project-name
      // font-weight 600
      font-size 1.1rem

    .parent-project-name
      color       #999
      font-size   .9rem
      // display     inline-block
      // margin-left 5px
    .project-info
      float right

</style>
