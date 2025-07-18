<template>
	<div class="reviews-container">
		<!-- 載入狀態 -->
		<div v-if="loading" class="loading-container">
			<div class="loading-text">Loading reviews...</div>
		</div>
		
		<!-- 錯誤狀態 -->
		<div v-else-if="error" class="error-container">
			<div class="error-text">{{ error }}</div>
			<button @click="fetchReviews" class="retry-btn">Retry</button>
		</div>
		
		<!-- 主要內容 -->
		<div v-else-if="reviews.length > 0">
			<!-- Top Section -->
			<div class="top-section">
				<div class="tags-section">
					<span class="tag" v-for="tag in tags" :key="tag">#{{ tag }}</span>
				</div>
				<div class="sort-section">
					<label>Sorted by</label>
					<select v-model="sortBy" @change="sortReviews">
						<option value="date">Date</option>
						<option value="title">Title</option>
						<option value="rating">Rating</option>
					</select>
				</div>
			</div>

			<!-- Main Review Card -->
			<div class="main-card">
				<div class="card-header">
					<h2 class="card-title">{{ currentReview.title }}</h2>
					<div class="card-tags">
						<span class="tag" v-for="tag in currentReview.tags" :key="tag">#{{ tag }}</span>
					</div>
				</div>
				
				<div class="card-content">
					<p>{{ currentReview.content }}</p>
				</div>

				<div class="card-footer">
					<div class="rating">
						<span v-for="n in 5" :key="n" class="star" :class="{ filled: n <= currentReview.rating }">★</span>
					</div>
					<div class="author-info">
						<span class="author">{{ currentReview.author }}</span>
						<span class="date">{{ currentReview.date }}</span>
					</div>
					
					<!-- 回覆按鈕 (只有登入用戶可見) -->
					<div v-if="isLoggedIn" class="action-buttons">
						<button @click="toggleReplyForm" class="reply-btn">
							{{ showReplyForm ? 'Cancel Reply' : 'Reply to Review' }}
						</button>
					</div>
				</div>

				<!-- 回覆評論表單 -->
				<div v-if="showReplyForm && isLoggedIn" class="reply-form">
					<h4>Reply to this review</h4>
					<textarea 
						v-model="commentContent" 
						placeholder="Write your comment..."
						class="reply-textarea"
						:disabled="submittingReply"
					></textarea>
					<div class="form-buttons">
						<button @click="submitComment" :disabled="!commentContent.trim() || submittingReply" class="submit-btn">
							{{ submittingReply ? 'Posting...' : 'Post Comment' }}
						</button>
						<button @click="cancelReply" class="cancel-btn">Cancel</button>
					</div>
				</div>

				<!-- Navigation Arrows -->
				<button class="nav-arrow nav-left" @click="previousReview" :disabled="currentIndex === 0">
					&#8249;
				</button>
				<button class="nav-arrow nav-right" @click="nextReview" :disabled="currentIndex === reviews.length - 1">
					&#8250;
				</button>
			</div>

			<!-- 評論回覆區域 -->
			<div v-if="currentReview.comments && currentReview.comments.length > 0" class="comments-section">
				<h3>Comments</h3>
				<div v-for="comment in currentReview.comments" :key="comment.id" class="comment-item">
					<div class="comment-header">
						<span class="comment-author">{{ comment.author }}</span>
						<span class="comment-date">{{ comment.date }}</span>
					</div>
					<div class="comment-content">{{ comment.content }}</div>
					
					<!-- 回覆按鈕 (只有登入用戶可見) -->
					<div v-if="isLoggedIn" class="comment-actions">
						<button @click="toggleCommentReply(comment.id)" class="reply-btn small">
							{{ showCommentReply === comment.id ? 'Cancel' : 'Reply' }}
						</button>
					</div>
					
					<!-- 回覆評論表單 -->
					<div v-if="showCommentReply === comment.id && isLoggedIn" class="reply-form small">
						<textarea 
							v-model="replyContent" 
							placeholder="Write your reply..."
							class="reply-textarea"
							:disabled="submittingReply"
						></textarea>
						<div class="form-buttons">
							<button @click="submitReply(comment.id)" :disabled="!replyContent.trim() || submittingReply" class="submit-btn">
								{{ submittingReply ? 'Posting...' : 'Post Reply' }}
							</button>
							<button @click="cancelCommentReply" class="cancel-btn">Cancel</button>
						</div>
					</div>
					
					<!-- 顯示回覆 -->
					<div v-if="comment.replies && comment.replies.length > 0" class="replies-section">
						<div v-for="reply in comment.replies" :key="reply.id" class="reply-item">
							<div class="reply-header">
								<span class="reply-author">{{ reply.author }}</span>
								<span class="reply-date">{{ reply.date }}</span>
							</div>
							<div class="reply-content">{{ reply.content }}</div>
						</div>
					</div>
				</div>
			</div>

			<!-- Bottom List -->
			<div class="review-list">
				<div 
					v-for="(review, index) in reviews" 
					:key="index"
					class="review-item"
					:class="{ active: index === currentIndex }"
					@click="selectReview(index)"
				>
					<div class="item-header">
						<span class="item-author">{{ review.author }}</span>
						<span class="item-date">{{ review.date }}</span>
					</div>
					<div class="item-content">
						{{ review.content }}
					</div>
					
					<!-- 回覆按鈕 (只有登入用戶可見) -->
					<div v-if="isLoggedIn" class="item-action-buttons">
						<button @click.stop="toggleReviewReply(review.id)" class="reply-btn small">
							{{ showReviewReply === review.id ? 'Cancel' : 'Reply to Review' }}
						</button>
					</div>
					
					<!-- 回覆表單 -->
					<div v-if="showReviewReply === review.id && isLoggedIn" class="reply-form small">
						<textarea 
							v-model="reviewReplyContent" 
							placeholder="Write your reply to this review..."
							class="reply-textarea"
							:disabled="submittingReply"
						></textarea>
						<div class="form-buttons">
							<button @click="submitReviewReply(review.id)" :disabled="!reviewReplyContent.trim() || submittingReply" class="submit-btn">
								{{ submittingReply ? 'Posting...' : 'Post Reply' }}
							</button>
							<button @click="cancelReviewReply" class="cancel-btn">Cancel</button>
						</div>
					</div>
					
					<!-- 顯示該評論的回覆 -->
					<div v-if="review.comments && review.comments.length > 0" class="review-comments">
						<div v-for="comment in review.comments" :key="comment.id" class="review-comment-item">
							<div class="comment-header">
								<span class="comment-author">{{ comment.author }}</span>
								<span class="comment-date">{{ comment.date }}</span>
							</div>
							<div class="comment-content">{{ comment.content }}</div>
							
							<!-- 回覆評論按鈕 (只有登入用戶可見) -->
							<div v-if="isLoggedIn" class="comment-actions">
								<button @click.stop="toggleCommentReplyInList(comment.id)" class="reply-btn tiny">
									{{ showCommentReplyInList === comment.id ? 'Cancel' : 'Reply' }}
								</button>
							</div>
							
							<!-- 回覆評論表單 -->
							<div v-if="showCommentReplyInList === comment.id && isLoggedIn" class="reply-form tiny">
								<textarea 
									v-model="commentReplyContent" 
									placeholder="Write your reply..."
									class="reply-textarea"
									:disabled="submittingReply"
								></textarea>
								<div class="form-buttons">
									<button @click="submitCommentReplyInList(review.id, comment.id)" :disabled="!commentReplyContent.trim() || submittingReply" class="submit-btn">
										{{ submittingReply ? 'Posting...' : 'Post Reply' }}
									</button>
									<button @click="cancelCommentReplyInList" class="cancel-btn">Cancel</button>
								</div>
							</div>
							
							<!-- 顯示回覆 -->
							<div v-if="comment.replies && comment.replies.length > 0" class="replies-section">
								<div v-for="reply in comment.replies" :key="reply.id" class="reply-item">
									<div class="reply-header">
										<span class="reply-author">{{ reply.author }}</span>
										<span class="reply-date">{{ reply.date }}</span>
									</div>
									<div class="reply-content">{{ reply.content }}</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		
		<!-- 無資料狀態 -->
		<div v-else class="empty-container">
			<div class="empty-text">No reviews found</div>
		</div>
	</div>
</template>

<script>
import reviewsService from '@/services/reviewsService'

export default {
	name: "ReviewsView2",
	data() {
		return {
			currentIndex: 0,
			sortBy: "date",
			tags: [],
			reviews: [],
			loading: true,
			error: null,
			// 登入狀態
			isLoggedIn: false,
			currentUser: null,
			// 回覆功能
			showReplyForm: false,
			showCommentReply: null, // 存儲特定評論的 ID (主卡片區域)
			showReviewReply: null, // 存儲特定評論的 ID (列表區域)
			showCommentReplyInList: null, // 存儲列表區域評論回覆的 ID
			replyContent: '',
			commentContent: '',
			reviewReplyContent: '', // 列表區域評論回覆內容
			commentReplyContent: '', // 列表區域評論的回覆內容
			submittingReply: false
		}
	},
	computed: {
		currentReview() {
			return this.reviews[this.currentIndex] || {}
		}
	},
	methods: {
		// 檢查登入狀態
		checkLoginStatus() {
			const isLoggedIn = localStorage.getItem('isLoggedIn')
			const userData = localStorage.getItem('currentUser')
			
			console.log('Checking login status:')
			console.log('- isLoggedIn:', isLoggedIn)
			console.log('- userData:', userData)
			
			if (isLoggedIn === 'true' && userData) {
				try {
					this.currentUser = JSON.parse(userData)
					this.isLoggedIn = true
					console.log('Login status: true, currentUser:', this.currentUser)
				} catch (error) {
					console.error('Error parsing user data:', error)
					this.isLoggedIn = false
					this.currentUser = null
					console.log('Login status: false (parse error)')
				}
			} else {
				this.isLoggedIn = false
				this.currentUser = null
				console.log('Login status: false (no valid login data)')
			}
		},

		async fetchReviews() {
			try {
				this.loading = true
				this.error = null
				
				const response = await reviewsService.getAllReviews()
				if (response.success) {
					this.reviews = response.data
					this.currentIndex = 0
				} else {
					this.error = 'Failed to load reviews'
				}
			} catch (error) {
				console.error('Error fetching reviews:', error)
				this.error = 'Failed to connect to server'
			} finally {
				this.loading = false
			}
		},

		async fetchTags() {
			try {
				const response = await reviewsService.getAllTags()
				if (response.success) {
					this.tags = response.data
				}
			} catch (error) {
				console.error('Error fetching tags:', error)
			}
		},

		nextReview() {
			if (this.currentIndex < this.reviews.length - 1) {
				this.currentIndex++
			}
		},
		
		previousReview() {
			if (this.currentIndex > 0) {
				this.currentIndex--
			}
		},
		
		selectReview(index) {
			this.currentIndex = index
		},
		
		sortReviews() {
			switch (this.sortBy) {
				case "date":
					this.reviews.sort((a, b) => new Date(b.date) - new Date(a.date))
					break
				case "title":
					this.reviews.sort((a, b) => a.title.localeCompare(b.title))
					break
				case "rating":
					this.reviews.sort((a, b) => b.rating - a.rating)
					break
			}
		},

		// 切換回覆評論表單
		toggleReplyForm() {
			this.showReplyForm = !this.showReplyForm
			if (!this.showReplyForm) {
				this.commentContent = ''
			}
		},

		// 取消回覆評論
		cancelReply() {
			this.showReplyForm = false
			this.commentContent = ''
		},

		// 提交評論
		async submitComment() {
			if (!this.commentContent.trim() || !this.isLoggedIn) {
				return
			}

			try {
				this.submittingReply = true
				const commentData = {
					userId: this.currentUser._id,
					content: this.commentContent.trim(),
					parentId: null // 主評論，沒有父評論
				}

				const response = await reviewsService.createComment(this.currentReview.id, commentData)
				
				if (response.success) {
					// 重新獲取評論列表以顯示新的評論
					await this.fetchReviews()
					
					// 清空表單
					this.commentContent = ''
					this.showReplyForm = false
					
					// 顯示成功訊息
					alert('Comment posted successfully!')
				} else {
					alert('Failed to post comment')
				}
			} catch (error) {
				console.error('Error posting comment:', error)
				alert('Failed to post comment')
			} finally {
				this.submittingReply = false
			}
		},

		// 切換評論回覆表單
		toggleCommentReply(commentId) {
			if (this.showCommentReply === commentId) {
				this.showCommentReply = null
				this.replyContent = ''
			} else {
				this.showCommentReply = commentId
				this.replyContent = ''
			}
		},

		// 取消評論回覆
		cancelCommentReply() {
			this.showCommentReply = null
			this.replyContent = ''
		},

		// 提交回覆
		async submitReply(commentId) {
			if (!this.replyContent.trim() || !this.isLoggedIn) {
				return
			}

			try {
				this.submittingReply = true
				const replyData = {
					userId: this.currentUser._id,
					content: this.replyContent.trim(),
					parentId: commentId // 回覆特定評論
				}

				const response = await reviewsService.createComment(this.currentReview.id, replyData)
				
				if (response.success) {
					// 重新獲取評論列表以顯示新的回覆
					await this.fetchReviews()
					
					// 清空表單
					this.replyContent = ''
					this.showCommentReply = null
					
					// 顯示成功訊息
					alert('Reply posted successfully!')
				} else {
					alert('Failed to post reply')
				}
			} catch (error) {
				console.error('Error posting reply:', error)
				alert('Failed to post reply')
			} finally {
				this.submittingReply = false
			}
		},

		// 列表區域 - 切換評論回覆表單
		toggleReviewReply(reviewId) {
			if (this.showReviewReply === reviewId) {
				this.showReviewReply = null
				this.reviewReplyContent = ''
			} else {
				this.showReviewReply = reviewId
				this.reviewReplyContent = ''
			}
		},

		// 列表區域 - 取消評論回覆
		cancelReviewReply() {
			this.showReviewReply = null
			this.reviewReplyContent = ''
		},

		// 列表區域 - 提交評論回覆
		async submitReviewReply(reviewId) {
			if (!this.reviewReplyContent.trim() || !this.isLoggedIn) {
				return
			}

			try {
				this.submittingReply = true
				const commentData = {
					userId: this.currentUser._id,
					content: this.reviewReplyContent.trim(),
					parentId: null // 主評論，沒有父評論
				}

				const response = await reviewsService.createComment(reviewId, commentData)
				
				if (response.success) {
					// 重新獲取評論列表以顯示新的評論
					await this.fetchReviews()
					
					// 清空表單
					this.reviewReplyContent = ''
					this.showReviewReply = null
					
					// 顯示成功訊息
					alert('Reply posted successfully!')
				} else {
					alert('Failed to post reply')
				}
			} catch (error) {
				console.error('Error posting reply:', error)
				alert('Failed to post reply')
			} finally {
				this.submittingReply = false
			}
		},

		// 列表區域 - 切換評論的回覆表單
		toggleCommentReplyInList(commentId) {
			if (this.showCommentReplyInList === commentId) {
				this.showCommentReplyInList = null
				this.commentReplyContent = ''
			} else {
				this.showCommentReplyInList = commentId
				this.commentReplyContent = ''
			}
		},

		// 列表區域 - 取消評論的回覆
		cancelCommentReplyInList() {
			this.showCommentReplyInList = null
			this.commentReplyContent = ''
		},

		// 列表區域 - 提交評論的回覆
		async submitCommentReplyInList(reviewId, commentId) {
			if (!this.commentReplyContent.trim() || !this.isLoggedIn) {
				return
			}

			try {
				this.submittingReply = true
				const replyData = {
					userId: this.currentUser._id,
					content: this.commentReplyContent.trim(),
					parentId: commentId // 回覆特定評論
				}

				const response = await reviewsService.createComment(reviewId, replyData)
				
				if (response.success) {
					// 重新獲取評論列表以顯示新的回覆
					await this.fetchReviews()
					
					// 清空表單
					this.commentReplyContent = ''
					this.showCommentReplyInList = null
					
					// 顯示成功訊息
					alert('Reply posted successfully!')
				} else {
					alert('Failed to post reply')
				}
			} catch (error) {
				console.error('Error posting reply:', error)
				alert('Failed to post reply')
			} finally {
				this.submittingReply = false
			}
		},

		// 處理 localStorage 變化
		handleStorageChange(event) {
			if (event.key === 'isLoggedIn' || event.key === 'currentUser') {
				this.checkLoginStatus()
			}
		},

		// 輔助方法：獲取 localStorage 項目（用於除錯）
		getLocalStorageItem(key) {
			try {
				return localStorage.getItem(key) || 'null'
			} catch (error) {
				return 'error'
			}
		},
	},
	mounted() {
		// 檢查登入狀態
		this.checkLoginStatus()
		
		// 監聽 localStorage 變化（當用戶在其他頁面登入/登出時）
		window.addEventListener('storage', this.handleStorageChange)
		
		// 初始化載入資料
		this.fetchReviews()
		this.fetchTags()
		
		// 支援鍵盤導航
		document.addEventListener('keydown', (e) => {
			if (e.key === 'ArrowLeft') {
				this.previousReview()
			} else if (e.key === 'ArrowRight') {
				this.nextReview()
			}
		})
	},

	beforeUnmount() {
		// 清除事件監聽器
		window.removeEventListener('storage', this.handleStorageChange)
	},
}
</script>

<style scoped>
.reviews-container {
	width: 100%;
	min-height: 100vh;
	background-color: #000;
	color: #fff;
	font-family: 'Courier New', monospace;
	padding: 20px;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
}

/* Top Section */
.top-section {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 30px;
}

.tags-section {
	display: flex;
	gap: 15px;
}

.tag {
	color: #fff;
	font-size: 16px;
}

.sort-section {
	display: flex;
	align-items: center;
	gap: 10px;
}

.sort-section label {
	color: #fff;
	font-size: 16px;
}

.sort-section select {
	background-color: #333;
	color: #fff;
	border: 1px solid #555;
	padding: 5px 10px;
	border-radius: 4px;
	font-family: inherit;
}

/* Main Card */
.main-card {
	background-color: #333;
	border-radius: 15px;
	padding: 30px;
	margin-bottom: 30px;
	position: relative;
	min-height: auto;
	height: auto;
}

.card-header {
	margin-bottom: 20px;
}

.card-title {
	font-size: 16px;
	font-weight: bold;
	margin: 0 0 10px 0;
}

.card-tags {
	display: flex;
	gap: 10px;
}

.card-content {
	margin-bottom: 30px;
	line-height: 1.6;
	font-size: 16px;
	word-wrap: break-word;
	overflow-wrap: break-word;
	white-space: pre-wrap;
}

.card-footer {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.rating {
	display: flex;
	gap: 2px;
}

.star {
	color: #444;
	font-size: 16px;
	transition: color 0.3s;
}

.star.filled {
	color: #ffd700;
}

.author-info {
	display: flex;
	gap: 20px;
	align-items: center;
}

.author {
	font-weight: bold;
	font-size: 16px;
}

.date {
	color: #ccc;
	font-size: 16px;
}

/* Navigation Arrows */
.nav-arrow {
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
	background-color: rgba(255, 255, 255, 0.1);
	border: none;
	color: #fff;
	font-size: 16px;
	width: 50px;
	height: 50px;
	border-radius: 50%;
	cursor: pointer;
	transition: all 0.3s;
	backdrop-filter: blur(10px);
}

.nav-arrow:hover:not(:disabled) {
	background-color: rgba(255, 255, 255, 0.2);
	transform: translateY(-50%) scale(1.1);
}

.nav-arrow:disabled {
	opacity: 0.3;
	cursor: not-allowed;
}

.nav-left {
	left: -25px;
}

.nav-right {
	right: -25px;
}

/* Review List */
.review-list {
	display: flex;
	flex-direction: column;
	gap: 15px;
	margin-bottom: 50px;
}

.review-item {
	background-color: #222;
	border-radius: 10px;
	padding: 20px;
	cursor: pointer;
	transition: all 0.3s;
	border: 2px solid transparent;
	min-height: auto;
	height: auto;
}

.review-item:hover {
	background-color: #2a2a2a;
	transform: translateX(5px);
}

.review-item.active {
	border-color: #555;
	background-color: #2a2a2a;
}

.item-header {
	display: flex;
	justify-content: space-between;
	margin-bottom: 10px;
	font-weight: bold;
}

.item-author {
	color: #fff;
	font-size: 16px;
}

.item-date {
	color: #ccc;
	font-size: 16px;
}

.item-content {
	color: #ddd;
	line-height: 1.4;
	margin-bottom: 10px;
	font-size: 16px;
	word-wrap: break-word;
	overflow-wrap: break-word;
}

.nested-item {
	margin-left: 20px;
	padding-left: 15px;
	border-left: 2px solid #555;
	margin-top: 10px;
}

.nested-header {
	display: flex;
	justify-content: space-between;
	margin-bottom: 5px;
	font-size: 16px;
}

.nested-author {
	color: #ccc;
	font-size: 16px;
}

.nested-date {
	color: #999;
	font-size: 16px;
}

.nested-content {
	color: #bbb;
	font-size: 16px;
	line-height: 1.4;
	word-wrap: break-word;
	overflow-wrap: break-word;
}

/* 回覆功能樣式 */
.action-buttons {
	margin-top: 15px;
	display: flex;
	gap: 10px;
}

.reply-btn {
	background-color: #444;
	color: #fff;
	border: 1px solid #666;
	padding: 8px 16px;
	border-radius: 4px;
	cursor: pointer;
	font-family: inherit;
	font-size: 14px;
	transition: background-color 0.3s;
}

.reply-btn:hover {
	background-color: #555;
}

.reply-btn.small {
	padding: 5px 10px;
	font-size: 12px;
}

.reply-btn.tiny {
	padding: 3px 8px;
	font-size: 11px;
}

.reply-form {
	margin-top: 15px;
	padding: 15px;
	background-color: #2a2a2a;
	border-radius: 8px;
	border: 1px solid #444;
}

.reply-form.small {
	margin-top: 10px;
	padding: 10px;
}

.reply-form.tiny {
	margin-top: 8px;
	padding: 8px;
}

.reply-form h4 {
	margin: 0 0 10px 0;
	color: #fff;
	font-size: 16px;
}

.reply-textarea {
	width: 100%;
	min-height: 80px;
	background-color: #333;
	color: #fff;
	border: 1px solid #555;
	border-radius: 4px;
	padding: 10px;
	font-family: inherit;
	font-size: 14px;
	resize: vertical;
	box-sizing: border-box;
}

.reply-textarea:focus {
	outline: none;
	border-color: #777;
}

.reply-textarea:disabled {
	opacity: 0.6;
	cursor: not-allowed;
}

.form-buttons {
	display: flex;
	gap: 10px;
	margin-top: 10px;
}

.submit-btn {
	background-color: #007acc;
	color: #fff;
	border: none;
	padding: 8px 16px;
	border-radius: 4px;
	cursor: pointer;
	font-family: inherit;
	font-size: 14px;
	transition: background-color 0.3s;
}

.submit-btn:hover:not(:disabled) {
	background-color: #0056b3;
}

.submit-btn:disabled {
	background-color: #555;
	cursor: not-allowed;
}

.cancel-btn {
	background-color: #666;
	color: #fff;
	border: none;
	padding: 8px 16px;
	border-radius: 4px;
	cursor: pointer;
	font-family: inherit;
	font-size: 14px;
	transition: background-color 0.3s;
}

.cancel-btn:hover {
	background-color: #777;
}

/* 評論區域樣式 */
.comments-section {
	margin-top: 30px;
	padding-top: 20px;
	border-top: 1px solid #444;
}

.comments-section h3 {
	margin: 0 0 20px 0;
	color: #fff;
	font-size: 18px;
}

.comment-item {
	margin-bottom: 20px;
	padding: 15px;
	background-color: #2a2a2a;
	border-radius: 8px;
	border: 1px solid #444;
}

.comment-header {
	display: flex;
	justify-content: space-between;
	margin-bottom: 10px;
}

.comment-author {
	font-weight: bold;
	color: #fff;
	font-size: 14px;
}

.comment-date {
	color: #ccc;
	font-size: 14px;
}

.comment-content {
	color: #ddd;
	line-height: 1.4;
	margin-bottom: 10px;
	word-wrap: break-word;
	overflow-wrap: break-word;
}

.comment-actions {
	display: flex;
	gap: 10px;
}

.replies-section {
	margin-top: 15px;
	padding-left: 20px;
	border-left: 2px solid #555;
}

.reply-item {
	margin-bottom: 15px;
	padding: 10px;
	background-color: #222;
	border-radius: 6px;
}

.reply-header {
	display: flex;
	justify-content: space-between;
	margin-bottom: 8px;
}

.reply-author {
	font-weight: bold;
	color: #ccc;
	font-size: 13px;
}

.reply-date {
	color: #999;
	font-size: 13px;
}

.reply-content {
	color: #bbb;
	line-height: 1.4;
	font-size: 14px;
	word-wrap: break-word;
	overflow-wrap: break-word;
}

/* 列表區域回覆功能樣式 */
.item-action-buttons {
	margin-top: 10px;
	display: flex;
	gap: 5px;
}

.reply-form.tiny {
	margin-top: 8px;
	padding: 8px;
}

.review-comments {
	margin-top: 15px;
	padding: 10px;
	background-color: #1a1a1a;
	border-radius: 6px;
	border: 1px solid #333;
}

.review-comment-item {
	margin-bottom: 12px;
	padding: 8px;
	background-color: #252525;
	border-radius: 4px;
	border: 1px solid #333;
}

.review-comment-item:last-child {
	margin-bottom: 0;
}

.review-comment-item .comment-header {
	display: flex;
	justify-content: space-between;
	margin-bottom: 6px;
}

.review-comment-item .comment-author {
	font-weight: bold;
	color: #ddd;
	font-size: 12px;
}

.review-comment-item .comment-date {
	color: #aaa;
	font-size: 12px;
}

.review-comment-item .comment-content {
	color: #ccc;
	line-height: 1.3;
	margin-bottom: 8px;
	font-size: 13px;
	word-wrap: break-word;
	overflow-wrap: break-word;
}

.review-comment-item .comment-actions {
	display: flex;
	gap: 5px;
}

.review-comment-item .replies-section {
	margin-top: 10px;
	padding-left: 15px;
	border-left: 2px solid #444;
}

.review-comment-item .reply-item {
	margin-bottom: 8px;
	padding: 6px;
	background-color: #1f1f1f;
	border-radius: 3px;
}

.review-comment-item .reply-header {
	display: flex;
	justify-content: space-between;
	margin-bottom: 4px;
}

.review-comment-item .reply-author {
	font-weight: bold;
	color: #bbb;
	font-size: 11px;
}

.review-comment-item .reply-date {
	color: #888;
	font-size: 11px;
}

.review-comment-item .reply-content {
	color: #aaa;
	line-height: 1.3;
	font-size: 12px;
	word-wrap: break-word;
	overflow-wrap: break-word;
}

/* 響應式設計 */
@media (max-width: 768px) {
	.reviews-container {
		padding: 10px;
	}
	
	.main-card {
		padding: 20px;
		min-height: auto;
		height: auto;
	}
	
	.nav-arrow {
		width: 40px;
		height: 40px;
		font-size: 16px;
	}
	
	.nav-left {
		left: -20px;
	}
	
	.nav-right {
		right: -20px;
	}
	
	.top-section {
		flex-direction: column;
		gap: 15px;
		align-items: flex-start;
	}

	.review-list {
		margin-bottom: 30px;
	}
}

/* 載入和錯誤狀態樣式 */
.loading-container, .error-container, .empty-container {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	min-height: 50vh;
	text-align: center;
}

.loading-text, .error-text, .empty-text {
	font-size: 18px;
	color: #ccc;
	margin-bottom: 20px;
}

.retry-btn {
	background-color: #333;
	color: #fff;
	border: 1px solid #555;
	padding: 10px 20px;
	border-radius: 5px;
	cursor: pointer;
	font-family: inherit;
	font-size: 16px;
	transition: background-color 0.3s;
}

.retry-btn:hover {
	background-color: #444;
}
</style>
