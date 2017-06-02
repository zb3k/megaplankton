import * as types from '../mutation-types';

const state = {
  stack: [],
};

const mutations = {
  [types.ADD_LOADER_ITEM](state, item) {
    state.stack.push(item);
  },
  [types.REMOVE_LOADER_ITEM](state, item) {
    const index = state.stack.indexOf(item);
    if (index > -1) {
      const newStack = [...state.stack];
      newStack.splice(index, 1);
      state.stack = newStack;
    }
  },
};

export default {
  state,
  mutations,
};
