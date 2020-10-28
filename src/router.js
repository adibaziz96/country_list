import Vue from 'vue'
import Router from 'vue-router'
import Country from './views/Country.vue'
import CountryDetail from './views/CountryDetail.vue'
import BorderDetail from './views/BorderDetail.vue'

Vue.use(Router)

const router =  new Router({
  routes: [
    {
      path: '/',
      redirect: '/country'
    },
    {
      path: '/country',
      name: 'country',
      component: Country
    },
    {
      path: '/countrydetail/:name',
      name: 'countrydetail',
      component: CountryDetail
    },
    {
      path: '/borderdetail/:name',
      name: 'borderdetail',
      component: BorderDetail
    }
  ]
})
export default router
