import Vue from 'vue'
import VueRouter from 'vue-router'

import Main from '@/components/Main/Main'

// import ChampionBuilder from '@/components/ChampionBuilder/ChampionBuilder'

// import PotentialRoleSource from '@/components/ChampionBuilder/Potential/PotentialRoleSource'
import Potential from '@/components/ChampionBuilder/Potential/Potential'

import Background from '@/components/ChampionBuilder/Background/Background'
import Skills from '@/components/ChampionBuilder/Skills/Skills'
import Account from '@/components/Account/Account'

Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/champion-build/new',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // },
  {
    path: '/view',
    name: 'ChampionView',
    component: Main
  },
  {
    path: '/account*',
    name: 'AccountLogIn',
    component: Account
  },
  {
    path: '/build/potential',
    name: 'ChampionBuilderPotential',
    component: Potential
  },
  {
    path: '/build/skills',
    name: 'ChampionBuilderSkills',
    component: Background
  },
  {
    path: '/build/background',
    name: 'ChampionBuilderBackground',
    component: Skills
  },
  // {
  //   path: '/build*',
  //   redirect: '/build/potential/rolesource',
  //   name: 'ChampionBuilder',
  //   component: ChampionBuilder
  // },



// All else fails, fall back on 'view' (Welcome) page.
  {
    path: '/*',
    redirect: '/view',
    component: Main
  }
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
