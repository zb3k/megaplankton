import megaplan from 'megaplanjs';

const client = new megaplan.Client('agroindex.megaplan.ru')
  .auth('d.bourim@gmail.com', 'XQKn%6Gn2w//nxBCw');

function callApi(method, args, mutator) {
  return new Promise((resolve, reject) => {
    client.on('auth', (authResult, authError) => {
      if (authError) {
        reject(authError);
      } else {
        client[method](...args).send(
          (result) => { resolve(mutator ? mutator(result) : result); },
          (error) => { reject(error); }
        );
      }
    });
  });
}

export default {
  projects: (...args) => callApi('projects', args, ({ projects }) => Object.values(projects)),
  tasks: (...args) => callApi('tasks', args, (tasks) => Object.values(tasks)),
};
