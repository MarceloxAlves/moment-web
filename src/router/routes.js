
export default [

  // DEFAULT
  {
    path: '/',
    component: () => import('layouts/home'),
    children: [
      { path: '', component: () => import('pages/index') }
    ]
  },

  // USUÁRIO
  {
    path: '/cadastro',
    component: () => import('layouts/home'),
    children: [
      { path: '', component: () => import('pages/usuario/usuario-form') }
    ]
  },

  {
    path: '/acesso',
    component: () => import('layouts/home'),
    children: [
      { path: '', component: () => import('pages/usuario/login') }
    ]
  },

  // EVENTO
  {
    path: '/painel',
    component: () => import('layouts/logado'),
    children: [
      { path: '', component: () => import('pages/painel') }
    ]
  },
  {
    path: '/evento/atividade-evento',
    component: () => import('layouts/logado'),
    children: [
      { path: '', component: () => import('pages/atividade/atividade-evento') }
    ]
  },
  {
    path: '/evento/list-atividade-evento',
    component: () => import('layouts/home'),
    children: [
      { path: '', component: () => import('pages/atividade/list-atividade-evento') }
    ]
  },
  {
    path: '/eventos',
    component: () => import('layouts/home'),
    children: [
      { path: '', component: () => import('pages/evento/listagem-evento') }
    ]
  },

  // 404
  { // Always leave this as last one
    path: '*',
    component: () => import('pages/404')
  },
]
