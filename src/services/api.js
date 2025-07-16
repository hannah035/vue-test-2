import axios from "axios"

// const baseUrl = '/api/books'
// const baseUrl = "/api"
// const baseUrl = "http://localhost:3000/api"
const baseUrl = "/api"  // 使用 Vite 代理


export default {
	get(route, params) {
		return axios
			.get(`${baseUrl}/${route}`, params)
			.then((res) => {
				return res.data
			})
			.catch((err) => {
				throw err
			})
	},
	post(route, data) {
		return axios
			.post(`${baseUrl}/${route}`, data)
			.then((res) => {
				return res.data
			})
			.catch((err) => {
				throw err
			})
	},
	put(route, data) {
		return axios
			.put(`${baseUrl}/${route}`, data)
			.then((res) => {
				return res.data
			})
			.catch((err) => {
				throw err
			})
	},
	delete(route, key) {
		return axios
			.delete(`${baseUrl}/${route}`, { data: { key } })
			.then((res) => {
				return res.data
			})
			.catch((err) => {
				throw err
			})
	},
}
