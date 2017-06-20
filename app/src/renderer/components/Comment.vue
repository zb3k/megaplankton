<template lang="pug">
  section.comment(:class="{'comment-unread': value.is_unread, 'comment-favorite': value.is_favorite}")
    .comment-wrapper
      avatar(:value="value.avatar")

      .comment-header
        ui-actions
          favorite(:active="value.is_favorite")
          ext-link(:href="exteranlLink") #
        .comment-tray
          datetime(:value="value.time_created")
        .comment-info
          author(:value="value.author")
      .comment-content
        html-content(:value="message" markdown)
        attaches(:value="value.attaches")
</template>

<script>
  import HtmlContent from 'components/HtmlContent';
  import Avatar from 'components/Avatar';
  import Attaches from 'components/Attaches';
  import Author from 'components/Author';
  import Datetime from 'components/Datetime';
  import Favorite from 'components/Favorite';
  import ExtLink from 'components/ExtLink';
  import UiActions from 'components/UiActions';

  import api from '../vuex/api';

  export default {
    name: 'comment',

    components: {
      HtmlContent,
      Attaches,
      Avatar,
      Author,
      Datetime,
      Favorite,
      ExtLink,
      UiActions,
    },

    props: {
      value: null,
      taskId: null,
    },

    computed: {
      message() {
        return this.value.text.replace(/\n/g, '<br>');
      },
      exteranlLink() {
        return api.getCommentLink(this.taskId, this.value.id);
      },
    },
  };
</script>

<style lang="stylus">

  .comment
    padding    20px 40px 20px 30px
    box-shadow inset 0 -1px 0 #0001

    &.comment-unread
      position relative
      background #FFFEE9

    &.comment-favorite
      background #F7F7F7
      // background linear-gradient(0deg, #F7F7F7, #FFF)
      // .comment-content
      //   padding 20px
      //   border-radius 4px
      //   background #EEE
      // border-top 2px solid #4994FF
      // border-left 12px solid #999
      border-right 12px solid #f90
      // border-right 12px solid #09f
      // border-width 0 5px
      .actions > .favorite
        display block
    .comment-content
      >*:last-child
        margin-bottom 0
    .comment-header
      margin-bottom 0
      padding 1px 0

    .comment-wrapper
      padding-left  45px
      position relative

    .comment-info
      font-size 0.9rem
      > *
        margin-right 10px
    .comment-tray
      font-size 0.9rem
      float right
      transition all .1s ease

    .actions
      position absolute
      right    -25px
      top      -2px

      > *
        display        none

    &:hover
      cursor default

      .actions > *
        display block

    .avatar
      position absolute
      left     0
      top      1px
</style>
