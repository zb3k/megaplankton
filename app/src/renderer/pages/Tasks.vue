<template lang="pug">
  div

    header
      button(@click="sync") Sync
      |  {{ loaderStack }} | projects: {{ projects.length }} | tasks: {{ tasks.length }}

    aside
      project-row(v-for="project in filteredProjects" :project="project" :key="project.id" v-if="project.childrens.length")
        template(slot="info"): small {{ project.childrens.length }}
        task-row(v-for="task in project.childrens" :task="task" :key="task.id" :childrens="task.childrens")
</template>

<script>
  import { mapState } from 'vuex';
  import ProjectRow from 'components/ProjectRow';
  import TaskRow from 'components/TaskRow';

  function objectSort(field) {
    return (a, b) => {
      if (a[field] > b[field]) return 1;
      if (a[field] < b[field]) return -1;
      return 0;
    };
  }

  export default {
    components: {
      ProjectRow,
      TaskRow,
    },

    computed: {
      ...mapState({
        projects: state => state.projects.all,
        tasks: state => state.tasks.all,
        loaderStack: state => state.loader.stack,
      }),

      taskTree() {
        const tree = {};
        const tasks = [...this.tasks];
        if (tasks) {
          tasks.forEach(task => {
            const parentId = task.super_task ? task.super_task.id : 0;
            if (!tree[parentId]) {
              tree[parentId] = [];
            }
            tree[parentId].push(task);
          });
          tasks.forEach(task => {
            task.childrens = tree[task.id] || [];
            delete(tree[task.id]);
          });
        }

        const projectTree = {};
        if (tree[0]) {
          tree[0].forEach(task => {
            const pid = task.project ? task.project.id : 0;
            if (!projectTree[pid]) {
              projectTree[pid] = task.project || { name: '???' };
              projectTree[pid].childrens = [];
            }
            projectTree[pid].childrens.push(task);
          });
        }
        return Object.values(projectTree);
      },

      filteredProjects() {
        return this.taskTree
          .filter(project => (project.childrens ? project.childrens.length > 0 : false))
          .sort(objectSort('name'));
      },
    },

    methods: {
      sync() {
        this.$store.dispatch('syncProjects');
        this.$store.dispatch('syncTasks');
      },
    },

    mounted() {
      this.sync();
    },
  };
</script>


<style lang="stylus">
  header
    background #DDD
    padding    10px 20px
  aside
    width 30%
    min-width 300px
  button
    padding       5px 10px
    border        1px solid #0003
    border        none
    background    #09d
    border-radius 3px
    color         #FFF
</style>
