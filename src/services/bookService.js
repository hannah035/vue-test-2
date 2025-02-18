import api from "@/services/api"

const ROUTE = "book"
class bookService {
	static queryBook(query) {
		return api.get(ROUTE, { params: { query } })
	}
	static allBooks() {
		return this.queryBook("*")
	}
}
export default bookService
