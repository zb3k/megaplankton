import * as types from '../mutation-types';

const state = {
  all: [],
};

const mutations = {
  [types.SET_PROJECTS](state, projects) {
    state.all = [...projects];
  },
};

export default {
  state,
  mutations,
};
