import axios from "axios"
// This is for local development
// If you are using a different port or domain, change the baseUrl accordingly
const baseUrl = "http://localhost:3000/api"

// This is for production
// const baseUrl = "/api"


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
		return axios.post(`${baseUrl}/${route}`,  data )
	},
	delete(route, key) {
		return axios.delete(`${baseUrl}/${route}`, { data: { key } })
	},
}
