<template lang="pug">
  div

    header
      button(@click="sync(true)") Sync
      button(v-if="unreadIds.length" @click="markCommentsAsRead") Mark as read
      button(@click="test") test
      .pull-right
        badge route id: {{ $route.params.id }}
        badge projects: {{ projects.length }}
        badge tasks: {{ tasks.length }}
        badge comments: {{ comments.length }}
        badge unread: {{ unreadIds.length }}

    .layout
      .aside
        project-row(v-for="project in filteredProjects" :project="project" :key="project.id" v-if="project.childrens.length")
          template(slot="info"): badge(v-if="project.unread") {{ project.unread }}
          task-row(v-for="task in project.childrens" :task="task" :key="task.id" :childrens="task.childrens" :click="selectTask" :activeIds="currentTaskIds")
      .content
        .task-container(v-if="task"): task(:value="task")
        .comments-container(v-if="filteredComments.length"): comment(v-for="comment in filteredComments" :value="comment" :taskId="task.id")
</template>

<script>
  import { mapState } from 'vuex';
  import api from '../vuex/api';

  import ProjectRow from 'components/ProjectRow';
  import TaskRow from 'components/TaskRow';
  import Badge from 'components/Badge';
  import Task from 'components/Task';
  import Comment from 'components/Comment';

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
      Task,
      Comment,
    },

    data: () => ({
      task: null,
      comments: [],
    }),

    computed: {
      ...mapState({
        projects: state => state.projects.all,
        tasks: state => state.tasks.all,
      }),

      taskIdIndex() {
        const result = {};
        this.tasks.forEach((task, index) => {
          result[task.id] = index;
        });
        return result;
      },

      filteredComments() {
        const max = 30;
        if (this.comments.length > max) {
          const latest = this.comments.length;
          return this.comments.slice(latest - max, latest);
        }
        return this.comments;
      },

      unreadIds() {
        if (!this.comments) {
          return [];
        }
        return this.comments.filter((item) => item.is_unread).map(item => item.id);
      },

      currentTaskIds() {
        return this.$route.params ? [this.$route.params.id] : [];
      },

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
              // if (task.comments_unread) {
              //   console.log('task.comments_unread => ', task.comments_unread,
              //     task.project.name, task.super_task.name, task.name);
              // }
            }
          });
          tasks.forEach(task => {
            task.childrens = tree[task.id] || [];
            delete(tree[task.id]);
          });
        }

        const projectTree = {};
        if (tree[0]) {
          // let projectTasks = [];
          // projectTasks = tree[0];
          // delete(tree[0]);
          // projectTasks = [...projectTasks, ...Object.values(tree)];
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

      markCommentsAsRead() {
        if (this.unreadIds && this.unreadIds.length) {
          api.markCommentsAsRead(this.unreadIds).then(() => {
            this.loadTask();
          });
        }
      },

      selectTask({ id }) {
        this.loadTask(id);

        this.$router.push({
          name: 'tasks',
          params: { id },
        });
      },

      loadTask(id = 0) {
        if (!id && this.$route.params) {
          id = this.$route.params.id;
        }
        if (id) {
          this.task = {};
          this.comments = [];
          api.task(id).then((task) => {
            this.task = task;
            api.taskComments(id).then((comments) => {
              this.comments = comments || [];
              // this.$nextTick(() => {
              //   console.log('this.unreadIds => ', this.unreadIds);
              //   this.$store.dispatch('updateTask', {
              //     id: this.task.id,
              //     comments_unread: this.unreadIds.length,
              //   });
              // });
            });
          });
        }
      },
      test() {
        // this.$store.dispatch('updateTask', {
        //   id: this.$route.params.id,
        //   comments_unread: 10,
        // });
      },
    },

    mounted() {
      this.sync();
      // this.$nextTick(() => {
      //   this.loadTask();
      // });
    },
  };
</script>


<style lang="stylus">
  header
    background #383C3E
    box-shadow inset 0 1px 0 #FFF2, inset 0 -1px 0 #0001
    padding    10px 20px
    .pull-right
      float right
  .layout
    // display flex
    > .aside
      width        30%
      min-width    300px
      border-right 1px solid #EEE
      overflow     auto
      position     fixed
      z-index      1
      bottom       0
      top          43px
      background   #fff
    > .content
      width 70%
      position fixed
      right    0
      left     30%
      top      43px
      bottom   0
      //       height 100%
      overflow auto
      // padding  40px
  button
    padding       5px 10px
    border        1px solid #0003
    border        none
    background    #09d
    border-radius 2px
    color         #FFF
    + button
      margin-left 5px

  .task-container
    background #E8EFEF
    padding 30px
  .comments-container
    // padding 30px 0
    padding-bottom 60px
    border-top 1px solid #DDD
</style>
