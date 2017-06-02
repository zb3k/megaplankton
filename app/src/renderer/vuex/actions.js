import * as types from './mutation-types';
import api from './api';

const loaded = {};
function once(key) {
  return loaded[key] ? false : (loaded[key] = true);
}

function localData(key, fetch, commit, success) {
  commit(types.ADD_LOADER_ITEM, 'projects');

  const data = window.localStorage.getItem(key);
  if (data) {
    success(JSON.parse(data));
    commit(types.REMOVE_LOADER_ITEM, 'projects');
  } else {
    fetch().then(data => {
      window.localStorage.setItem(key, JSON.stringify(data));
      success(data);
      commit(types.REMOVE_LOADER_ITEM, 'projects');
    });
  }
}


export const decrementMain = ({ commit }) => {
  commit(types.DECREMENT_MAIN_COUNTER);
};

export const incrementMain = ({ commit }) => {
  commit(types.INCREMENT_MAIN_COUNTER);
};

export const loadProjects = ({ commit }) => {
  if (once('loadProjects')) {
    localData('projects', () => api.projects(), commit, data => {
      commit(types.SET_PROJECTS, data);
    });
  }
};

export const loadTasks = ({ commit }) => {
  if (once('loadTasks')) {
    localData('tasks', () => api.tasks({ limit: 100, offset: 0 }), commit, data => {
      commit(types.ADD_TASKS, data);
    });
  }
};
