import router from '@/router'
import tool from '@/utils/tool'

router.beforeEach((to, from, next) => {
  if (!tool.sessionGet('userType')) {
    if (to.path !== '/home') {
      tool.message('请先登录')
      next({ path: '/home' })
    } else {
      next()
    }
  } else {
    next()
  }
})
