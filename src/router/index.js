import { createRouter, createWebHistory } from "vue-router"
import HomeView from "@/views/HomeView.vue"
import EventsView from "@/views/EventsView.vue"
import ReviewsView from "@/views/ReviewsView.vue"
import AboutView from "@/views/AboutView.vue"
import BooksView from '@/views/BooksView.vue'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: "home",
			component: HomeView,
		},
		{
			path: "/events",
			name: "events",
			component: EventsView,
		},
		{
			path: "/reviews",
			name: "reviews",
			component: ReviewsView,
		},
		{
			path: "/about",
			name: "about",
			component: AboutView,
		},
		{
			path: "/books",
			name: "books",
			component: BooksView,
		},
	],
})

export default router
