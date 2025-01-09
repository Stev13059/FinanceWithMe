export const routers = [
  {
    path: "/",
    name: "Layout",
    redirect: "/transactions",
    component: () => import("../Layout/index"),
    children: [
      {
        path: "/transactions",
        name: "TransactionsPage",
        meta: { title: 'Transactions', icon: 'table' },
        component: () => import('../views/transactions/index')
      },
      {
        path: "/savingGoals",
        name: "GoalsPage",
        meta: { title: 'Saving Goals', icon: 'trophy' },
        component: () => import('../views/savingGoals/index')
      },
      {
        path: "/analytics",
        name: "AnalyticsPage",
        meta: { title: 'Analytics', icon: 'fund' },
        component: () => import('../views/analytics/index')
      },
      {
        path: "/groups",
        name: "GroupsPage",
        meta: { title: 'Groups', icon: 'usergroup-add' },
        component: () => import('../views/groups/index')
      },
    ]
  },
  {
    path: '/login',
    name: "LoginPage",
    component: () => import('../views/user/login.vue')
  },
  {
    path: '/register',
    name: 'RegisterPage',
    component: () => import('../views/user/register.vue')
  },
  {
    path: '/404',
    name: "Exception404Page",
    component: () => import('../views/exception/404')
  }
]