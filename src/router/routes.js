const routes = [
  {
    path: '/',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      {
        path: '',
        name: 'loginDefault',
        component: () => import('pages/Login.vue')
      },
      {
        path: 'login',
        name: 'login',
        component: () => import('pages/Login.vue')
      },
      {
        path: 'register',
        name: 'register',
        component: () => import('pages/Register.vue')
      },
      {
        path: 'email-confirmation',
        name: 'email-confirmation',
        component: () => import('pages/EmailConfirmation.vue')
      },
      {
        path: 'reset-password',
        name: 'reset-password',
        component: () => import('pages/ResetPassword.vue')
      },
      {
        path: 'forgot-password',
        name: 'forgot-password',
        component: () => import('pages/ForgotPassword.vue')
      }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'me', name: 'me', component: () => import('pages/Me.vue') },
      {
        path: 'category',
        name: 'category',
        component: () => import('pages/category/List.vue')
      },
      {
        path: 'form-category/:id?',
        name: 'form-category',
        component: () => import('pages/category/FormCategory.vue')
      },
      {
        path: 'atletas',
        name: 'atletas',
        component: () => import('pages/atletas/List.vue')
      },
      {
        path: 'atletas-convocacao',
        name: 'atletas-convocacao',
        component: () => import('pages/atletas/ListConvocao.vue')
      },
      {
        path: 'form-atletas/:id?',
        name: 'form-atletas',
        component: () => import('pages/atletas/FormAtletas.vue')
      }
    ],
    meta: {
      requiresAuth: true
    }
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
