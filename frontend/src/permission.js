import router from './router'
import { routers } from './router/routers'

const loginRoutePath = '/login'
const registerRoutePath = '/register'
const defaultRoutePath = '/transactions'
// Permission control
router.beforeEach((to, _from, next) => {
  let userId = localStorage.getItem('userId')
  if (userId) {
    if (to.path === loginRoutePath) {
      next(defaultRoutePath)
    } else {
      const fIndex = routers.find(f => f.name === 'Layout').children.findIndex(f => f.path === to.path)
      if (to.path == '/404') {
        next()
      } else if (fIndex === -1 && to.path !== '/') {
        next('/404')
      } else {
        next()
      }
    }
  } else {
    if (to.path === loginRoutePath || to.path === registerRoutePath) {
      next()
    } else {
      next(loginRoutePath)
    }
  }
})
