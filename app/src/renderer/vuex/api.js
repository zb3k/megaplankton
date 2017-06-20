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
    const task = stack.shift();
    const { params, mutator, resolve, reject } = task;
    let { method } = task;
    if (method[0] === ':') {
      params.unshift(method);
      method = '__request';
    }
    console.log('api => ', method, params);
    client[method](...params).send(
      (result) => {
        console.log('   success', method, params);
        callApiFromStack(true);
        resolve(mutator ? mutator(result) : result);
      },
      (error) => {
        console.log('   error', method, params);
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
  taskComments: (...args) => callApi('task_comments', args, ({ comments }) =>
    Object.values(comments)),
  markCommentsAsRead: (ids) => callApi('::comment/markAsRead.api', [{ IdList: ids }], (result) =>
    result),

  getThumb(file, width = 200, height = 152) {
    file = file.replace('/apiattach/', '/attach/').replace(/\/[^/]+$/, '');
    if (file.search(/\.(jpg|png|gif|jpeg)$/i) > 0) {
      return `https://pc11.megaplan.ru/hosts/${HOST}/${width}x${height}${file}`;
    }
    return null;
  },

  getCommentLink(taskId, commentId) {
    return `https://${HOST}/task/${taskId}/card/#c${commentId}`;
  },

  getTaskLink(taskId) {
    return `https://${HOST}/task/${taskId}/card/`;
  },
};
