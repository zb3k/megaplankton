<template lang="pug">
  div.task-row-box(:class="{opened:isOpen, active:isActive}" @click.stop="onClick")
    div.task-row()
      div.task-name(:style="`margin-left:${level*18+5}px`")
        span.task-icon(@click.stop="toggleContent")
          i.fa(class="fa-angle-right" v-if="task.childrens && task.childrens.length")
        | {{ task.name }}
      div.task-info
        slot(name="info")
        badge(v-if="childUnread") {{ childUnread }}
        badge(type="info" v-if="task.comments_unread") {{ task.comments_unread }}
    slot(v-if="isOpen")
      div.childrens(v-if="task.childrens")
        task-row(v-for="task in childrens" :task="task" :key="task.id" :childrens="task.childrens" :level="level+1" :click="click" :activeIds="activeIds")
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
      click: Function,
      activeIds: Array,
      level: {
        default: 1,
      },
    },

    data: () => ({
      isOpen: false,
      // isActive: false,
    }),

    computed: {
      childUnread() {
        return countDeep(this.task.childrens);
      },
      isActive() {
        return this.activeIds ? this.activeIds.indexOf(this.task.id * 1) >= 0 : false;
      },
    },

    methods: {
      toggleContent() {
        this.isOpen = !this.isOpen;
      },
      showContent() {
        this.isOpen = true;
      },

      onClick() {
        this.showContent();
        // this.isActive = this.isOpen;
        if (this.click) {
          this.click(this.task);
        }
      },
    },

  };
</script>

<style lang="stylus">
  .task-row-box .task-row-box .task-name
    font-size 0.85rem

  .task-row-box
      position relative
    .task-row
      box-shadow 0 1px 0 rgba(#000, .03)
      cursor     pointer
      display    table
      width      100%
      transition all .15s ease

      &:hover
        background-color #EEF5F4
        box-shadow none

      > div
        padding    5px 10px 5px 18px
        // display    table-cell
        // text-align left

    .task-name
      position  relative
      //        font-weight 600
      font-size 0.9rem

    .task-icon
      position   absolute
      left       0
      display    inline-block
      width      18px
      color      #BBB
      text-align center
      transition all .2s ease
      font-size  1.15rem
      margin-top -3px
      margin-left -5px

    &.active > .task-row
      background #09f
      color #FFF
      *
        color #FFF

    &.opened > .task-row > .task-name > .task-icon
      color #09F
      transform rotate(90deg)

    .parent-task-name
      color       #999
      font-size   .9rem
      // display     inline-block
      // margin-left 5px
    .task-info
      // width 60px
      position absolute
      right 0
      top 0
      bottom 0
      text-align right
      padding-right 5px !important

      > *
        vertical-align top
      // background #000


</style>
