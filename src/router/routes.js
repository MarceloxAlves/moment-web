
export default [
  {
    path: '/',
    component: () => import('layouts/default'),
    children: [
      { path: '', component: () => import('pages/index') }
    ]
  },

  {
    path: '/cadastro',
    component: () => import('layouts/default'),
    children: [
      { path: '', component: () => import('pages/usuario/usuario-form') }
    ]
  },

  {
    path: '/marcelo',
    component: () => import('layouts/default')
  },
  { // Always leave this as last one
    path: '*',
    component: () => import('pages/404')
  },
]
