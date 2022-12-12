import { createRouter, createWebHistory } from 'vue-router'
import Home from '../view/Home.vue'
const router = createRouter({
    history: createWebHistory(),
    routes: [
    {
      path: '/',
      name: 'Home',
      component:Home
    },
    {
      path: '/:name',
      name: 'Categories',
      component: ()=> import('../view/Categories.vue')
    },
    {
      path: '/Cart',
      name: 'Cart',
      component: ()=> import('../view/Cart.vue')
    },
    {
      path: '/Details/:id',
      name: 'Details',
      component: ()=> import('../view/Detail.vue'),
      props:true,
    },
    {
      path: '/Catalog',
      name: 'Catalog',
      component: ()=> import('../view/Search.vue')
    },
    {
      path: "/:catchAll(.*)",
      name: 'NotFound',
      component: ()=> import('../view/NotFound.vue')
    },

  ] 
})

export default router
  