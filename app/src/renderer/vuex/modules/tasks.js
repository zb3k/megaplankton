import * as types from '../mutation-types';

const state = {
  all: [],
};

const mutations = {
  [types.ADD_TASKS](state, tasks) {
    state.all = [...state.all, ...tasks];
  },
  [types.SET_TASKS](state, tasks) {
    state.all = [...tasks];
  },
  [types.RESET_TASKS](state) {
    state.all = [];
  },
};

export default {
  state,
  mutations,
};
