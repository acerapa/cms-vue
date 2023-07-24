import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

// import ContactForm view
import ContactForm from '../views/ContactForm.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/contact/:id?',
      name: 'Form',
      component: ContactForm
    },
    {
      path: '/',
      name: 'Home',
      component: HomeView
    }
  ]
})

export default router
