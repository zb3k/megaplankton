const route = (name, path, component) => ({
  path,
  name,
  component,
});

export default [
  // route('landing-page', '/', require('components/LandingPageView')),
  route('tasks', '/tasks/:id?', require('pages/Tasks')),
  route('login', '/', require('pages/Login')),
  { path: '*', redirect: { name: 'login' } },
];
