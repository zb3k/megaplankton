<template lang="pug">
  div
    button(@click="sync") Sync
    div {{ loaderStack }}
    div projects: {{ projects.length }}
    div tasks: {{ tasks.length }}

    project-row(v-for="project in projects" :project="project" v-if="projectTasks[project.id]")
      tamplate(slot="info") {{ projectTasks[project.id].length }}

    //- ul
    //-   li(v-for="project in projects" v-if="projectTasks[project.id]") {{ project.name }}

    //-     span ({{ projectTasks[project.id].length }})

</template>

<script>
  import { mapState } from 'vuex';
  import ProjectRow from 'components/ProjectRow';
  import UiTable from 'components/UiTable';

  export default {
    components: {
      ProjectRow,
      UiTable,
    },

    computed: {
      ...mapState({
        projects: state => state.projects.all,
        tasks: state => state.tasks.all,
        loaderStack: state => state.loader.stack,
      }),

      filteredTasks() {
        return this.tasks.slice(0, 10);
      },

      projectTasks() {
        const tasks = {};
        this.tasks.forEach(task => {
          const projectId = task.project ? task.project.id : 0;
          if (!tasks[projectId]) {
            tasks[projectId] = [];
          }
          tasks[projectId].push(task);
        });
        return tasks;
      },
    },

    // watch: {
    //   // projects(projects) {
    //   //   console.log('projects => ', projects);
    //   // },
    // },

    methods: {
      sync() {
        this.$store.dispatch('syncProjects');
        this.$store.dispatch('syncTasks');
      },
    },

    mounted() {
      // this.sync();
    },
  };
</script>
