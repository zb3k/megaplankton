<template lang="pug">
  section.comment(:class="{'comment-unread': value.is_unread, 'comment-favorite': isFavorite}")
    .comment-wrapper
      avatar(:value="value.avatar")

      .comment-header
        ui-actions
          favorite(:active="isFavorite" :id="value.id" type="comment" @update="updateFavorite")
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

    data: () => ({
      localFavorite: null,
    }),

    computed: {
      message() {
        return this.value.text.replace(/\n/g, '<br>');
      },
      exteranlLink() {
        return api.getCommentLink(this.taskId, this.value.id);
      },

      isFavorite() {
        return this.localFavorite !== null ? this.localFavorite : this.value.is_favorite;
      },
    },

    methods: {
      updateFavorite(isFavorite) {
        this.localFavorite = isFavorite;
      },
    },
  };
</script>

<style lang="stylus">

  .comment
    padding    20px 40px 20px 30px
    box-shadow inset 0 -1px 0 #0001
    transition all .15s ease

    &.comment-unread
      position relative
      background #FFFEE9

    &.comment-favorite
      background #F6F2EE
      box-shadow inset 0 -1px 0 #0001, inset 5px 0 0 #F90
      .actions > .favorite
        display block
    .comment-content
      >*:last-child
        margin-bottom 0
    .comment-header
      margin-bottom 4px
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
      top      4px
</style>
