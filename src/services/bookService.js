import api from "@/services/api"

const ROUTE = "book"
class bookService {
	static queryBook(query) {
		return api.get(ROUTE, query)
	}
	static allBooks() {
		return this.queryBook("*")
	}
}
