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

  remove(key) {
    window.localStorage.removeItem(key);
  },
};

export const syncProjects = ({ commit }, force = false) => {
  if (force) storage.remove('projects');
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
  if (params.force && !params.offset) {
    storage.remove('tasks');
  }
  const tasks = storage.get('tasks') || [];
  if (tasks && tasks.length && !params.force) {
    commit(types.SET_TASKS, tasks);
  } else {
    if (!params.offset) {
      params.offset = 0;
      commit(types.SET_TASKS, []);
    }
    params.limit = api.RECORDS_LIMIT;

    api.tasks(params).then(data => {
      storage.set('tasks', [...tasks, ...data]);
      commit(types.ADD_TASKS, data);

      if (data.length === api.RECORDS_LIMIT) {
        params.offset += api.RECORDS_LIMIT;
        dispatch('syncTasks', params);
      }
    });
  }
};

export const updateTask = ({ commit, state }, task) => {
  commit(types.UPDATE_TASK, task);
  // storage.set('tasks', state.tasks.all);
};
