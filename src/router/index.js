import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import EventsView from '@/views/EventsView.vue';
import ReviewsView from '@/views/ReviewsView.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
      {
        path: '/',
        name: 'home',
        component: HomeView,
      },
      {
        path: '/events',
        name: 'events',
        component: EventsView,
      },
      {
        path: '/reviews',
        name: 'reviews',
        component: ReviewsView,
      },

    ],
  });
  
  export default router;