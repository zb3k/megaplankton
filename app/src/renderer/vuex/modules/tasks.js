import * as types from '../mutation-types';

const state = {
  all: [],
};
let indexes = {};

function updateIndexes(all) {
  indexes = {};
  for (let i = 0; i < all.length; i++) {
    indexes[all[i].id] = i;
  }
}

const mutations = {
  [types.ADD_TASKS](state, tasks) {
    const newTasks = [];
    tasks.forEach(task => {
      newTasks.push({ ...task });
    });
    state.all = [...state.all, ...newTasks];
    updateIndexes(state.all);
  },
  [types.SET_TASKS](state, tasks) {
    state.all = [...tasks];
    updateIndexes(state.all);
  },
  [types.UPDATE_TASK](state, task) {
    const index = indexes[task.id];
    // console.log('task.id => ', index, task.id);
    if (index) {
      const tasks = [...state.all];
      tasks[index] = { ...tasks[index], ...task };
      state.all = tasks;
    }
  },
  [types.RESET_TASKS](state) {
    state.all = [];
    updateIndexes(state.all);
  },
};

export default {
  state,
  mutations,
};
