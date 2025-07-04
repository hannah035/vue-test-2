import axios from "axios"

// const baseUrl = '/api/books'
// const baseUrl = "/api"
const baseUrl = "http://localhost:3000/api"


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
