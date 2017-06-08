<template lang="pug">
  div.task-row-box(:class="{active:showContent}" @click.stop="showContent=!showContent")
    div.task-row()
      div.task-info
        slot(name="info")
        badge(type="danger" v-if="childUnread") {{ childUnread }}
        badge(type="warning" v-if="task.comments_unread") {{ task.comments_unread }}
      div.task-name(:style="`margin-left:${level*18+5}px`")
        span.task-icon(@click.stop="showContent=!showContent")
          i.fa(:class="showContent ? 'fa-minus-square' : 'fa-plus-square'" v-if="task.childrens && task.childrens.length")
        | {{ task.name }}
      //- div.parent-task-name(v-if="task.super_task") {{ task.super_task.name }}
    slot(v-if="showContent")
      div.childrens(v-if="task.childrens")
        task-row(v-for="task in childrens" :task="task" :key="task.id" :childrens="task.childrens" :level="level+1")
</template>

<script>
  import Badge from 'components/Badge';

  function countDeep(tasks) {
    let count = 0;
    if (tasks) {
      tasks.forEach(task => {
        count += task.comments_unread + countDeep(task.childrens);
      });
    }
    return count;
  }

  export default {
    name: 'task-row',

    components: {
      Badge,
    },

    props: {
      task: Object,
      childrens: Array,
      level: {
        default: 1,
      },
    },

    data: () => ({
      showContent: false,
    }),

    computed: {
      childUnread() {
        return countDeep(this.task.childrens);
      },
    },

  };
</script>

<style lang="stylus">
  .task-row-box .task-row-box .task-name
    font-size 0.9rem
  //     padding-left 20px
  .task-row
    border-bottom 1px solid #EEE
    cursor        pointer
    display       table
    width         100%

    //            padding       8px 20px
    transition    all .15s ease
    &:hover
      background-color #EEF5F4

    > div
      padding    8px 18px
      // display    table-cell
      // text-align left

    .task-name
      position  relative
      //        font-weight 600
      font-size 1rem
    .task-icon
      position absolute
      left 0
      display inline-block
      width 18px
      color #999
    .parent-task-name
      color       #999
      font-size   .9rem
      // display     inline-block
      // margin-left 5px
    .task-info
      // width 60px
      float right
      text-align right

</style>
