import megaplan from 'megaplanjs';
import Vue from 'vue';
const HOST = 'agroindex.megaplan.ru';
const client = new megaplan.Client(HOST)
  .auth('d.bourim@gmail.com', 'XQKn%6Gn2w//nxBCw');
let isAuth = false;

client.on('auth', (authResult, authError) => {
  if (authError) {
    console.error(authError);
  } else {
    isAuth = true;
  }
});

const stack = [];
let inProgress = 0;
const MAX_STACK_SIZE = 3;

function callApiFromStack(decriment = false) {
  if (decriment) {
    inProgress--;
  }
  if (stack.length && inProgress < MAX_STACK_SIZE) {
    inProgress++;
    const { method, params, mutator, resolve, reject } = stack.shift();
    // console.log('API => ', method, JSON.stringify(params));
    client[method](...params).send(
      (result) => {
        callApiFromStack(true);
        resolve(mutator ? mutator(result) : result);
      },
      (error) => {
        callApiFromStack(true);
        reject(error);
      }
    );

    callApiFromStack();
  }
}

function callApi(method, params, mutator) {
  // console.log('stack.length => ', stack.length);

  const stackItem = { method, params, mutator };

  const result = new Promise((resolve, reject) => {
    stackItem.resolve = resolve;
    stackItem.reject = reject;
  });

  stack.push(stackItem);

  if (isAuth) {
    Vue.nextTick(() => { callApiFromStack(); });
  }

  return result;
}

export default {
  RECORDS_LIMIT: 100,
  client,
  projects: (...args) => callApi('projects', args, ({ projects }) => Object.values(projects)),
  tasks: (...args) => callApi('tasks', args, (tasks) => Object.values(tasks)),
  task: (...args) => callApi('task', args, ({ task }) => task),
  task_comments: (...args) => callApi('task_comments', args, ({ comments }) =>
    Object.values(comments)),

  getThumb(file, width = 200, height = 152) {
    file = file.replace('/apiattach/', '/attach/').replace(/\/[^/]+$/, '');
    if (file.search(/\.(jpg|png|gif|jpeg)$/i) > 0) {
      return `https://pc11.megaplan.ru/hosts/${HOST}/${width}x${height}${file}`;
    }
    return null;
  },
};
