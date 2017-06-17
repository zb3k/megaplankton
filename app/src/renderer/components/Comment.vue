<template lang="pug">
  section.comment(:class="{unread: value.is_unread}")
    .comment-content
      avatar(:value="value.avatar")
      author(:value="value.author")
      datetime(:value="value.time_created")

      html-content(:value="message" markdown)
      attaches(:value="value.attaches")
    //- | {{ value.author }}
    //- | {{ value.avatar }}
    //- | {{ value.is_favorite }}
</template>

<script>
  import HtmlContent from 'components/HtmlContent';
  import Avatar from 'components/Avatar';
  import Attaches from 'components/Attaches';
  import Author from 'components/Author';
  import Datetime from 'components/Datetime';

  export default {
    name: 'comment',

    components: {
      HtmlContent,
      Attaches,
      Avatar,
      Author,
      Datetime,
    },

    props: {
      value: null,
    },

    computed: {
      message() {
        return this.value.text.replace(/\n/g, '<br>');
      },
    },
  };
</script>

<style lang="stylus">

  .comment
    // background #eee
    padding    10px 40px
    margin     0 -40px 0
    box-shadow inset 0 1px 0 #0001
    &.unread
      position relative
      background #FEFBD2
    .comment-content
      padding-left  45px
      position relative

    .avatar
      position absolute
      left     0
      top      2px
</style>
