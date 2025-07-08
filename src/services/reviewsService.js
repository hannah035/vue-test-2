import api from './api'

export default {
  // 獲取所有評論
  async getAllReviews() {
    try {
      const response = await api.get('reviews')
      return response
    } catch (error) {
      console.error('Error fetching reviews:', error)
      throw error
    }
  },

  // 獲取所有標籤
  async getAllTags() {
    try {
      const response = await api.get('reviews/tags')
      return response
    } catch (error) {
      console.error('Error fetching tags:', error)
      throw error
    }
  },

  // 新增評論
  async createReview(reviewData) {
    try {
      const response = await api.post('/reviews', reviewData)
      return response.data
    } catch (error) {
      console.error('Error creating review:', error)
      throw error
    }
  },

  // 新增評論回覆
  async createComment(reviewId, commentData) {
    try {
      const response = await api.post(`/reviews/${reviewId}/comments`, commentData)
      return response.data
    } catch (error) {
      console.error('Error creating comment:', error)
      throw error
    }
  },

  // 用戶登入
  async login(email, password) {
    try {
      const response = await api.post('reviews/login', { email, password })
      return response
    } catch (error) {
      console.error('Error during login:', error)
      throw error
    }
  }
}
