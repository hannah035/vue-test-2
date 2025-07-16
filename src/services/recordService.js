import api from "./api"

const ROUTE = "records"
class recordService {
	static async queryRecord(query) {
		const response = await api.get(ROUTE, { params: { query } })
		return response.success ? response.data : []
	}
	static async allRecords() {
		const response = await api.get(ROUTE)
		return response.success ? response.data : []
	}
	static async postRecord(value) {
		const response = await api.post(ROUTE, { value: value })
		return response
	}
	static async deleteRecord(id) {
		const response = await api.delete(`${ROUTE}/${id}`)
		return response
	}
	static async updateRecord(id, data) {
		const response = await api.put(`${ROUTE}/${id}`, data)
		return response
	}
}
export default recordService
