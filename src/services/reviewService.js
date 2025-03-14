import api from "./api"

const ROUTE = "review"
class reviewService {
	static queryReview(query) {
		return api.get(ROUTE, query)
	}
	static allReviews() {
		return this.queryReview("*")
	}
	static postReview(key, value) {
		return api.post(ROUTE, { key: key, value: value })
	}
}
export default reviewService
