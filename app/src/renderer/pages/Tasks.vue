<template lang="pug">
  div

    header
      button(@click="sync(true)") Sync
      .pull-right
        badge projects: {{ projects.length }}
        badge tasks: {{ tasks.length }}

    aside
      project-row(v-for="project in filteredProjects" :project="project" :key="project.id" v-if="project.childrens.length")
        template(slot="info"): badge(type="danger" v-if="project.unread") {{ project.unread }}
        //- / {{ project.childrens.length }}
        task-row(v-for="task in project.childrens" :task="task" :key="task.id" :childrens="task.childrens")
</template>

<script>
  import { mapState } from 'vuex';
  import ProjectRow from 'components/ProjectRow';
  import TaskRow from 'components/TaskRow';
  import Badge from 'components/Badge';

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
      Badge,
    },

    computed: {
      ...mapState({
        projects: state => state.projects.all,
        tasks: state => state.tasks.all,
      }),

      taskTree() {
        const tree = {};
        const tasks = [];
        const projectUnread = {};

        this.tasks.forEach(task => {
          tasks.push({ ...task });
        });

        if (tasks) {
          tasks.forEach(task => {
            const parentId = task.super_task ? task.super_task.id : 0;
            if (!tree[parentId]) {
              tree[parentId] = [];
            }
            tree[parentId].push(task);

            if (task.comments_unread) {
              const projectId = task.project ? task.project.id : 0;
              if (!projectUnread[projectId]) {
                projectUnread[projectId] = 0;
              }
              projectUnread[projectId] += window.parseInt(task.comments_unread);
            }
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
              projectTree[pid].unread = projectUnread[pid] || 0;
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
      sync(force = false) {
        this.$store.dispatch('syncProjects', force);
        this.$store.dispatch('syncTasks', { force });
      },
    },

    mounted() {
      this.sync();
    },
  };
</script>


<style lang="stylus">
  header
    background #D2D0D2
    box-shadow inset 0 1px 0 #FFF2, inset 0 -1px 0 #0001
    padding    10px 20px
    .pull-right
      float right
  aside
    width 30%
    min-width 300px
    border-right 1px solid #EEE
  button
    padding       5px 10px
    border        1px solid #0003
    border        none
    background    #09d
    border-radius 3px
    color         #FFF
</style>
