
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

  // EVENTO
  {
    path: '/painel',
    component: () => import('layouts/logado'),
    children: [
      { path: '', component: () => import('pages/painel') }
    ]
  },

  // 404
  { // Always leave this as last one
    path: '*',
    component: () => import('pages/404')
  },
]
