import * as types from './mutation-types';
import api from './api';

const storage = {
  get(key) {
    let data = window.localStorage.getItem(key);
    if (data) {
      data = JSON.parse(data);
    }
    return data;
  },

  set(key, data) {
    window.localStorage.setItem(key, JSON.stringify(data));
  },
};

export const syncProjects = ({ commit }) => {
  const data = storage.get('projects');
  if (data) {
    commit(types.SET_PROJECTS, data);
  } else {
    api.projects().then(data => {
      commit(types.SET_PROJECTS, data);
      storage.set('projects', data);
    });
  }
};

export const syncTasks = ({ commit, dispatch, state }, params = { offset: 0 }) => {
  const data = storage.get('tasks');
  if (data) {
    commit(types.SET_TASKS, data);
  } else {
    if (!params.offset) {
      params.offset = 0;
      commit(types.SET_TASKS, []);
    }
    params.limit = api.RECORDS_LIMIT;

    api.tasks(params).then(data => {
      commit(types.ADD_TASKS, data);

      if (data.length === api.RECORDS_LIMIT) {
        params.offset += api.RECORDS_LIMIT;
        dispatch('syncTasks', params);
      } else {
        storage.set('tasks', state.tasks.all);
      }
    });
  }
};
