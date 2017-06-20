const route = (name, path, component) => ({
  path,
  name,
  component,
});

export default [
  // route('landing-page', '/', require('components/LandingPageView')),
  route('tasks', '/:id?', require('pages/Tasks')),
  // route('tasks', '/', require('pages/Tasks')),
  { path: '*', redirect: { name: 'tasks' } },
];
