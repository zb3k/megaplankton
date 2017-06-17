<template lang="pug">
  section.task(v-if="value")
    h1 {{ value.name }}
    html-content(:value="value.statement")
    //- attaches(:value="value.attaches")
    //- | {{ task.sub_tasks }}

    //- | {{ task.auditors }}
    //- | {{ task.executors }}
    //- | {{ task.owner }}
    //- | {{ task.responsible }}


    //- | {{ task.completed }}
    //- | {{ task.favorite }}
</template>

<script>
  import HtmlContent from 'components/HtmlContent';
  import Attaches from 'components/Attaches';

  export default {
    name: 'task',

    components: {
      HtmlContent,
      Attaches,
    },

    props: {
      value: null,
    },
  };
</script>

