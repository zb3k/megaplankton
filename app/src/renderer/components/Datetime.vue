<template lang="pug">
  div.datetime
    badge(v-if="showHumanize" :type="badgeType") {{ humanizeDate }}

    span.date {{ formatedDate }}
</template>

<script>
  import Badge from 'components/Badge';

  import moment from 'moment';
  moment.locale('ru');

  export default {
    name: 'datetime',

    components: {
      Badge,
    },

    props: {
      value: null,
    },

    computed: {
      formatedDate() {
        return moment(this.value).format('D MMMM - HH:mm');
      },
      unixDate() {
        return moment(this.value).format('X');
      },
      humanizeDate() {
        return moment(this.value).from(moment());
      },
      showHumanize() {
        return this.diffHours < 24 * 3;
      },
      diffHours() {
        return (moment().format('X') - this.unixDate) / (60 * 60);
      },
      badgeType() {
        if (this.diffHours < 2) {
          return 'danger';
        }
        if (this.diffHours < 6) {
          return 'warning';
        }
        return 'info';
      },
    },
  };
</script>

<style lang="stylus">
  .datetime
    display inline-block
    color   #777
    font-size 0.9rem

    >*
      margin-right 5px
</style>
