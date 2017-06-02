import * as types from '../mutation-types';

const state = {
  all: [],
};

const mutations = {
  [types.ADD_TASKS](state, tasks) {
    state.all = [...state.all, ...tasks];
  },
};

export default {
  state,
  mutations,
};
