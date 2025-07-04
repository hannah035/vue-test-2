import api from "./api"

const ROUTE = "review"
class reviewService {
	// Returns reviews based on the query
	// If query is "*", it returns all reviews
	// If query is a string, it returns reviews that match the query
	static queryReview(query) {
		return api.get(ROUTE, query)
	}
	// Returns all reviews
	static allReviews() {
		return this.queryReview("*")
	}
	static postReview(key, value) {
		return api.post(ROUTE, { key: key, value: value })
	}
}
export default reviewService
