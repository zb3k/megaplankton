const route = (name, path, component) => ({
  path,
  name,
  component,
});

export default [
  // route('landing-page', '/', require('components/LandingPageView')),
  route('tasks', '/', require('pages/Tasks')),
  { path: '*', redirect: { name: 'tasks' } },
];
