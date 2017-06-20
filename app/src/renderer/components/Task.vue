<template lang="pug">
  section.task(v-if="value")
    .panel
      ui-actions
        favorite(:active="value.is_favorite")
        ext-link(:href="taskLink") #
      h1 {{ value.name }}
      //- .panel
      user-panel(:value="value.owner" label="Постановщик")
      user-panel(:value="value.responsible" label="Исполнитель")
        avatar(v-for="executor in value.executors" :value="executor.avatar")
      user-panel(v-if="value.auditors && value.auditors.length")
        avatar(v-for="auditor in value.auditors" :value="auditor.avatar")

    html-content(:value="value.statement")
    //- | {{ value.sub_tasks }}
    //- | {{ value.completed }}
    //- | {{ value.favorite }}
</template>

<script>
  import api from '../vuex/api';
  import HtmlContent from 'components/HtmlContent';
  import Attaches from 'components/Attaches';
  import ExtLink from 'components/ExtLink';
  import UiActions from 'components/UiActions';
  import Favorite from 'components/Favorite';
  import UserPanel from 'components/UserPanel';
  import Avatar from 'components/Avatar';

  export default {
    name: 'task',

    components: {
      HtmlContent,
      Attaches,
      ExtLink,
      UiActions,
      Favorite,
      UserPanel,
      Avatar,
    },

    props: {
      value: null,
    },

    computed: {
      taskLink() {
        return this.value.id ? api.getTaskLink(this.value.id) : '';
      },
    },
  };
</script>

<style lang="stylus">
  .task
    margin-top -30px
    .actions
      float right
    .panel
      padding 30px 30px 20px
      margin 0 -30px 30px
      background rgba(#FFF, 1)
      box-shadow 0 1px 0 #0001
      border-width 1px 0

      + .panel
        margin-top -30px

</style>
