import Vue from 'vue'
import Router from 'vue-router'
import Cropper from './views/Cropper.vue'
import Mosaic from './views/Mosaic.vue'

Vue.use(Router)

export default new Router({
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'mosaic',
      component: Mosaic,
      meta: {
        page: 1
      }
    },
    {
      path: '/cropper',
      name: 'collection',
      component: Cropper,
      meta: {
        page: 2,
      }
    }
  ]
})
