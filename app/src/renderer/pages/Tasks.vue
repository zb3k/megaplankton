<template lang="pug">
  div
    div {{ loaderStack }}
    div projects: {{ projects.length }}
    div tasks: {{ tasks.length }}
    ul
      li(v-for="project in projects") {{project.name}}
        span(v-if="project.super_project" v-html="` / ${project.super_project.name}`")
</template>

<script>
  import { mapState } from 'vuex';

  export default {
    computed: {
      ...mapState({
        projects: state => state.projects.all,
        tasks: state => state.tasks.all,
        loaderStack: state => state.loader.stack,
      }),
      // projectsTree() {
      //   const tree = {};
      //   const allProjects = {};
      //   this.projects.forEach(project => {});

      //   this.projects.forEach(project => {
      //     const pid = project.super_project ? project.super_project.id : 0;
      //     if (!tree[pid]) {
      //       tree[pid] = [];
      //     }
      //     tree[pid].push(project);
      //   });

      //   return tree;
      // },
    },
    watch: {
      projects(projects) {
        console.log('projects => ', projects);
      },
    },
    mounted() {
      console.log('this.projects => ', this.projects.length);
      this.$store.dispatch('loadProjects');
      this.$store.dispatch('loadTasks');
    },
  };
</script>
