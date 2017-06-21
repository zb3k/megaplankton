export const mainCounter = state => state.counters.main;

export const taskIdIndex = (state) => {
  const result = {};
  const tasks = state.tasks.all;
  for (let i = 0; i < tasks.length; i++) {
    result[tasks[i].id] = i;
  }
  return result;
};
