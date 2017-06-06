import megaplan from 'megaplanjs';
import Vue from 'vue';

const client = new megaplan.Client('agroindex.megaplan.ru')
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
    console.log('API => ', method, params);
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
  console.log('stack.length => ', stack.length);

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
};
