import { createRouter, createWebHistory } from "vue-router"
import HomeView from "../views/HomeView.vue"
import EventsView from "../views/EventsView.vue"
import ReviewsView from "../views/ReviewsView.vue"
import ReviewsView2 from "../views/ReviewsView2.vue"
import AboutView from "../views/AboutView.vue"
import BooksView from "../views/BooksView.vue"

const routes = [
	{
		path: "/",
		name: "home",
		component: HomeView,
	},
	{
		path: "/events",
		name: "Events",
		component: () => import("../views/EventsView.vue"), // Lazy loading
	},
	{
		path: "/reviews",
		name: "Reviews",
		component: () => import("../views/ReviewsView.vue"), // Lazy loading
	},
	{
		path: "/reviews2",
		name: "Reviews2",
		component: () => import("../views/ReviewsView2.vue"), // Lazy loading
	},
	{
		path: "/books",
		name: "Books",
		component: () => import("../views/BooksView.vue"), // Lazy loading
	},
	{
		path: "/about",
		name: "About",
		component: () => import("../views/AboutView.vue"), // Lazy loading
	},
]

const router = createRouter({
	history: createWebHistory(),
	routes,
})

export default router
