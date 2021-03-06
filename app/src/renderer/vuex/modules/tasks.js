import * as types from '../mutation-types';

const state = {
  all: [],
};

const mutations = {
  [types.ADD_TASKS](state, tasks) {
    const newTasks = [];
    tasks.forEach(task => {
      newTasks.push({ ...task });
    });
    state.all = [...state.all, ...newTasks];
  },
  [types.SET_TASKS](state, tasks) {
    state.all = [...tasks];
  },
  [types.UPDATE_TASK](state, { index, task }) {
    if (index) {
      const tasks = [...state.all];
      tasks[index] = { ...tasks[index], ...task };
      state.all = tasks;
    }
  },
  [types.RESET_TASKS](state) {
    state.all = [];
  },
};

export default {
  state,
  mutations,
};
