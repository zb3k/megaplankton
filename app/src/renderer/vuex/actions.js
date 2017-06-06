import * as types from './mutation-types';
import api from './api';

// const loaded = {};
// function once(key) {
//   return loaded[key] ? false : (loaded[key] = true);
// }
function resetLocalData(key) {
  window.localStorage.setItem(key, '');
}
function localData(key, api, commit, success, append = false) {
  commit(types.ADD_LOADER_ITEM, key);
  let data = window.localStorage.getItem(key);
  if (data) {
    data = JSON.parse(data);
  }
  if (data && !append) {
    success(data);
    commit(types.REMOVE_LOADER_ITEM, key);
  } else {
    api().then(newData => {
      newData = [...data, ...newData];
      window.localStorage.setItem(key, JSON.stringify(newData));
      success(newData);
      commit(types.REMOVE_LOADER_ITEM, key);
    });
  }
}


export const decrementMain = ({ commit }) => {
  commit(types.DECREMENT_MAIN_COUNTER);
};

export const incrementMain = ({ commit }) => {
  commit(types.INCREMENT_MAIN_COUNTER);
};

export const syncProjects = ({ commit }, force = false) => {
  // if (once('syncProjects')) {
  if (force) {
    resetLocalData('projects');
    commit(types.SET_PROJECTS, []);
  }
  localData('projects', () => api.projects(), commit, data => {
    commit(types.SET_PROJECTS, data);
  });
  // }
};

export const syncTasks = ({ commit, dispatch }, force = false, params = { offset: 0 }) => {
  if (!params.offset) {
    params.offset = 0;
  }
  if (force) {
    resetLocalData('tasks');
    commit(types.RESET_TASKS);
  }

  params.limit = api.RECORDS_LIMIT;
  localData('tasks', () => api.tasks(params), commit, data => {
    commit(types.SET_TASKS, data);

    if (data.length === api.RECORDS_LIMIT && params.offset < 100) {
      dispatch('syncTasks', false, { ...params, offset: params.offset + api.RECORDS_LIMIT });
    }
  }, true);
};
