import api from "./api"

const ROUTE = "book"
class bookService {
	static queryBook(query) {
		return api.get(ROUTE, { params: { query } })
	}
	static allBooks() {
		return this.queryBook("*")
	}
	static postBook(key, value) {
		return api.post(ROUTE, { key: key, value: value })
	}
}
export default bookService
