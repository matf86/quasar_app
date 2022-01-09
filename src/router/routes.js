import MainLayout from 'layouts/MainLayout'
import GuestLayout from 'layouts/GuestLayout'
import Login from 'pages/Login'
import Register from 'pages/Register'


const routes = [
  {
    path: '/dashboard',
    name: 'dashboard',
    component: MainLayout,
    children: [
      { path: '', component: 'pages/Index.vue'}
    ]
  },
  {
    path: '/',
    component: GuestLayout,
    children: [
      { path: 'login',
        name: 'login',
        component: Login
      },
      { path: 'register',
        name: 'register',
        component: Register
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
