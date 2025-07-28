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
		<div v-else-if="reviews.length > 0" class="main-layout">
			<!-- 左側主要評論區域 -->
			<div class="main-content">
				<!-- 標題 -->
				<h1 class="main-title">{{ currentReview.title || 'Title' }}</h1>
				
				<!-- 標籤顯示 -->
				<div class="tags-display">
					<span 
						v-for="tag in currentReview.tags" 
						:key="tag" 
						class="tag-item"
						:class="{ active: selectedTags.includes(tag) }"
					>
						#{{ tag }}
					</span>
				</div>

				<!-- 評論內容 -->
				<div class="review-content">
					<p>{{ currentReview.content }}</p>
				</div>

				<!-- 評分 -->
				<div class="rating-section">
					<div class="stars">
						<span v-for="n in 5" :key="n" class="star" :class="{ filled: n <= currentReview.rating }">★</span>
					</div>
				</div>

				<!-- 作者和日期 -->
				<div class="author-section">
					<div class="author-info">
						<span class="author-name">{{ currentReview.author }}</span>
						<span class="review-date">{{ currentReview.date }}</span>
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

			<!-- 右側評論列表 -->
			<div class="comments-sidebar">
				<!-- 回覆主評論的表單 -->
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

				<!-- 評論回覆區域 -->
				<div v-if="currentReview.comments && currentReview.comments.length > 0">
					<div v-for="comment in currentReview.comments" :key="comment.id" class="comment-item">
						<div class="comment-header">
							<span class="comment-name">{{ comment.author }}</span>
						</div>
						<div class="comment-text">{{ comment.content }}</div>
						
						<!-- 回覆按鈕 (只有登入用戶可見) -->
						<div v-if="isLoggedIn" class="comment-actions">
							<button @click="toggleCommentReply(comment.id)" class="reply-arrow">
								{{ showCommentReply === comment.id ? '✕' : '←' }}
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
				
				<!-- 如果沒有評論，顯示預設的評論項目 -->
				<div v-else-if="!showReplyForm">
					<div class="comment-item" v-for="n in 3" :key="'default-' + n">
						<div class="comment-header">
							<span class="comment-name">Name</span>
						</div>
						<div class="comment-text">
							contentscontentscontentscontentscontentscontentscontentscontentscontentscontentscontentscontentscontents
						</div>
						<button class="reply-arrow">←</button>
					</div>
				</div>
				
				<!-- 新增評論按鈕 -->
				<button class="add-comment-btn" @click="toggleReplyForm" v-if="isLoggedIn">
					{{ showReplyForm ? '✕' : '＋' }}
				</button>
				
				<!-- 新增 Review 按鈕 -->
				<button class="add-review-btn" @click="toggleReviewForm" v-if="isLoggedIn">
					{{ showReviewForm ? '✕' : 'Add Review' }}
				</button>
				
				<!-- 新增 Review 表單 -->
				<div v-if="showReviewForm && isLoggedIn" class="add-review-form">
					<h4>Add New Review</h4>
					<div class="form-group">
						<label>Subject:</label>
						<input 
							v-model="newReview.subject" 
							type="text" 
							placeholder="Enter review subject..."
							class="review-input"
							:disabled="submittingReview"
						/>
					</div>
					<div class="form-group">
						<label>Rating:</label>
						<div class="rating-input">
							<span 
								v-for="n in 5" 
								:key="n" 
								class="star-input" 
								:class="{ active: n <= newReview.rate }"
								@click="setRating(n)"
							>★</span>
						</div>
					</div>
					<div class="form-group">
						<label>Content:</label>
						<textarea 
							v-model="newReview.content" 
							placeholder="Write your review..."
							class="review-textarea"
							:disabled="submittingReview"
						></textarea>
					</div>
					<div class="form-group">
						<label>Tags (comma separated):</label>
						<input 
							v-model="newReview.tagsInput" 
							type="text" 
							placeholder="e.g. 電影, 科幻, 哲學"
							class="review-input"
							:disabled="submittingReview"
						/>
					</div>
					<div class="form-buttons">
						<button @click="submitReview" :disabled="!isValidReview || submittingReview" class="submit-btn">
							{{ submittingReview ? 'Submitting...' : 'Submit Review' }}
						</button>
						<button @click="cancelReviewForm" class="cancel-btn">Cancel</button>
					</div>
				</div>
				
				<!-- 如果未登入，顯示登入提示 -->
				<div v-else class="login-prompt">
					<p>Login to add comments and reviews</p>
				</div>
			</div>

			<!-- 底部標籤選擇區域 -->
			<div class="bottom-tags">
				<!-- Tags 功能區域 -->
				<div class="tags-header-info">
					<span class="selected-count" v-if="selectedTags.length > 0">
						select {{ selectedTags.length }} tags
					</span>
					<button 
						v-if="selectedTags.length > 0" 
						@click="clearAllTags"
						class="clear-tags-btn"
					>
						清除所有
					</button>
				</div>
				
				<!-- 標籤列表 -->
				<div class="tags-container">
					<div 
						v-for="tag in tags" 
						:key="tag"
						class="tag-selector"
						:class="{ active: selectedTags.includes(tag) }"
						@click="toggleTag(tag)"
					>
						<span class="tag-text">#{{ tag }}({{ getTagCount(tag) }})</span>
					</div>
				</div>

				<!-- 排序和結果資訊 -->
				<div class="sort-info">
					<div class="results-info">
						<span class="total-count">
							Total: {{ filteredReviews.length }} reviews
							<span v-if="selectedTags.length > 0" class="filter-info">
								(filtered by {{ selectedTags.length }} tags)
							</span>
						</span>
					</div>
					<div class="sort-controls">
						<label>Sorted by</label>
						<select v-model="sortBy" @change="sortReviews">
							<option value="date">Date</option>
							<option value="title">Title</option>
							<option value="rating">Rating</option>
						</select>
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
			selectedTags: [], // 选中的标签
			reviews: [],
			allReviews: [], // 存储所有评论的原始数据
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
			submittingReply: false,
			// 新增 Review 功能
			showReviewForm: false,
			submittingReview: false,
			newReview: {
				subject: '',
				rate: 0,
				content: '',
				tagsInput: '',
				tags: []
			}
		}
	},
	computed: {
		currentReview() {
			return this.reviews[this.currentIndex] || {}
		},
		filteredReviews() {
			if (this.selectedTags.length === 0) {
				return this.allReviews
			}
			
			// 篩選包含任意選中 tags 的評論（聯集）
			const filtered = this.allReviews.filter(review => {
				return this.selectedTags.some(tag => 
					review.tags && review.tags.includes(tag)
				)
			})
			
			// 按照包含的選中 tags 數量排序，優先顯示包含更多選中 tags 的評論
			return filtered.sort((a, b) => {
				const aMatchCount = this.selectedTags.filter(tag => 
					a.tags && a.tags.includes(tag)
				).length
				const bMatchCount = this.selectedTags.filter(tag => 
					b.tags && b.tags.includes(tag)
				).length
				
				// 先按匹配數量降序排序
				if (aMatchCount !== bMatchCount) {
					return bMatchCount - aMatchCount
				}
				
				// 如果匹配數量相同，按日期降序排序
				return new Date(b.date) - new Date(a.date)
			})
		},
		isValidReview() {
			return this.newReview.subject.trim() && 
			       this.newReview.content.trim() && 
			       this.newReview.rate > 0
		}
	},
	watch: {
		filteredReviews: {
			handler(newVal) {
				this.reviews = newVal
				if (this.currentIndex >= newVal.length) {
					this.currentIndex = Math.max(0, newVal.length - 1)
				}
			},
			immediate: true
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
					this.allReviews = response.data
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

		// 更新显示的评论列表
		updateReviews() {
			// 由于使用了 watcher，这里可以简化
			this.currentIndex = 0
		},

		// 切换标签选择
		toggleTag(tag) {
			const index = this.selectedTags.indexOf(tag)
			if (index > -1) {
				this.selectedTags.splice(index, 1)
			} else {
				this.selectedTags.push(tag)
			}
		},

		// 清除所有选中的标签
		clearAllTags() {
			this.selectedTags = []
		},

		// 获取标签对应的评论数量
		getTagCount(tag) {
			return this.allReviews.filter(review => 
				review.tags && review.tags.includes(tag)
			).length
		},

		// 获取评论匹配的选中标签数量
		getMatchingTagsCount(review) {
			if (!this.selectedTags.length || !review.tags) return 0
			return this.selectedTags.filter(tag => review.tags.includes(tag)).length
		},

		// 获取评论匹配的选中标签列表
		getMatchingTags(review) {
			if (!this.selectedTags.length || !review.tags) return []
			return this.selectedTags.filter(tag => review.tags.includes(tag))
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
			this.currentIndex = 0
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
					const reviewsResponse = await reviewsService.getAllReviews()
					if (reviewsResponse.success) {
						this.allReviews = reviewsResponse.data
					}
					
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

		// 新增 Review 相關方法
		toggleReviewForm() {
			this.showReviewForm = !this.showReviewForm
			if (!this.showReviewForm) {
				this.resetReviewForm()
			}
		},

		cancelReviewForm() {
			this.showReviewForm = false
			this.resetReviewForm()
		},

		resetReviewForm() {
			this.newReview = {
				subject: '',
				rate: 0,
				content: '',
				tagsInput: '',
				tags: []
			}
		},

		setRating(rating) {
			this.newReview.rate = rating
		},

		async submitReview() {
			if (!this.isValidReview || !this.isLoggedIn) {
				return
			}

			try {
				this.submittingReview = true
				
				// 處理標籤
				const tags = this.newReview.tagsInput
					.split(',')
					.map(tag => tag.trim())
					.filter(tag => tag.length > 0)

				const reviewData = {
					userId: this.currentUser._id,
					subject: this.newReview.subject.trim(),
					rate: this.newReview.rate,
					content: this.newReview.content.trim(),
					tags: tags
				}

				const response = await reviewsService.createReview(reviewData)
				
				if (response.success) {
					// 重新獲取評論列表以顯示新的評論
					await this.fetchReviews()
					await this.fetchTags()
					
					// 清空表單
					this.resetReviewForm()
					this.showReviewForm = false
					
					// 顯示成功訊息
					alert('Review posted successfully!')
				} else {
					alert('Failed to post review')
				}
			} catch (error) {
				console.error('Error posting review:', error)
				alert('Failed to post review')
			} finally {
				this.submittingReview = false
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

/* 主要布局 */
.main-layout {
	display: grid;
	grid-template-columns: 1fr 350px;
	grid-template-rows: 1fr auto;
	gap: 20px;
	height: calc(100vh - 40px);
	grid-template-areas: 
		"content sidebar"
		"tags tags";
}

.main-content {
	grid-area: content;
	display: flex;
	flex-direction: column;
	gap: 20px;
	overflow-y: auto;
	padding: 20px;
	border: 1px solid #333;
	position: relative;
	max-height: calc(100vh - 200px);
}

.comments-sidebar {
	grid-area: sidebar;
	display: flex;
	flex-direction: column;
	gap: 15px;
	padding: 20px;
	border: 1px solid #333;
	overflow-y: auto;
	min-height: 0;
	max-height: calc(100vh - 200px);
}

.bottom-tags {
	grid-area: tags;
	display: flex;
	flex-direction: column;
	gap: 15px;
	padding: 15px;
	border: 1px solid #333;
}

/* 左側主要內容樣式 */
.main-title {
	font-size: 24px;
	font-weight: bold;
	margin: 0 0 15px 0;
	color: #fff;
}

.tags-display {
	display: flex;
	gap: 10px;
	flex-wrap: wrap;
	margin-bottom: 20px;
}

.tag-item {
	background-color: #333;
	color: #fff;
	padding: 4px 8px;
	border-radius: 4px;
	font-size: 12px;
}

.tag-item.active {
	background-color: #007acc;
}

.review-content {
	flex: 1;
	line-height: 1.6;
	margin-bottom: 20px;
}

.review-content p {
	margin: 0;
	word-break: break-word;
}

.rating-section {
	margin-bottom: 20px;
}

.stars {
	display: flex;
	gap: 2px;
}

.star {
	color: #444;
	font-size: 20px;
}

.star.filled {
	color: #ffd700;
}

.author-section {
	border-top: 1px solid #333;
	padding-top: 15px;
	margin-bottom: 15px;
}

.author-info {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.author-name {
	font-weight: bold;
	color: #fff;
}

.review-date {
	color: #ccc;
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

/* 右側評論區域 */
.comment-item {
	background-color: #111;
	border-radius: 8px;
	padding: 15px;
	position: relative;
	border: 1px solid #333;
}

.comment-header {
	margin-bottom: 8px;
}

.comment-name {
	font-weight: bold;
	color: #fff;
}

.comment-text {
	color: #ccc;
	line-height: 1.4;
	word-break: break-word;
}

.reply-arrow {
	position: absolute;
	bottom: 10px;
	right: 10px;
	background: none;
	border: none;
	color: #007acc;
	font-size: 16px;
	cursor: pointer;
}

.add-comment-btn {
	background-color: #333;
	border: 1px solid #555;
	color: #fff;
	width: 40px;
	height: 40px;
	border-radius: 50%;
	font-size: 20px;
	cursor: pointer;
	transition: background-color 0.3s;
}

.add-comment-btn:hover {
	background-color: #444;
}

.add-review-btn {
	background-color: #007acc;
	border: 1px solid #0056b3;
	color: #fff;
	padding: 12px 20px;
	border-radius: 6px;
	font-size: 14px;
	cursor: pointer;
	transition: background-color 0.3s;
	margin-top: 10px;
	width: 100%;
}

.add-review-btn:hover {
	background-color: #0056b3;
}

.add-review-form {
	margin-top: 15px;
	padding: 20px;
	background-color: #1a1a1a;
	border-radius: 8px;
	border: 1px solid #333;
	position: relative;
}

.add-review-form h4 {
	margin: 0 0 15px 0;
	color: #fff;
	font-size: 16px;
}

.form-group {
	margin-bottom: 18px;
}

.form-group label {
	display: block;
	margin-bottom: 6px;
	color: #ccc;
	font-size: 14px;
	font-weight: 500;
}

.review-input {
	width: 100%;
	background-color: #333;
	color: #fff;
	border: 1px solid #555;
	border-radius: 4px;
	padding: 10px 12px;
	font-family: inherit;
	font-size: 14px;
	box-sizing: border-box;
	min-height: 40px;
}

.review-input:focus {
	outline: none;
	border-color: #777;
}

.review-input:disabled {
	opacity: 0.6;
	cursor: not-allowed;
}

.review-textarea {
	width: 100%;
	min-height: 120px;
	background-color: #333;
	color: #fff;
	border: 1px solid #555;
	border-radius: 4px;
	padding: 10px 12px;
	font-family: inherit;
	font-size: 14px;
	resize: vertical;
	box-sizing: border-box;
	line-height: 1.4;
}

.review-textarea:focus {
	outline: none;
	border-color: #777;
}

.review-textarea:disabled {
	opacity: 0.6;
	cursor: not-allowed;
}

.rating-input {
	display: flex;
	gap: 5px;
	margin-top: 5px;
}

.star-input {
	color: #555;
	font-size: 24px;
	cursor: pointer;
	transition: color 0.2s;
	user-select: none;
}

.star-input:hover,
.star-input.active {
	color: #ffd700;
}

.login-prompt {
	text-align: center;
	padding: 20px;
	color: #ccc;
	font-style: italic;
}

.login-prompt p {
	margin: 0;
}

/* 底部標籤區域 */
.tags-header-info {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 10px;
}

.selected-count {
	color: #007acc;
	font-size: 14px;
}

.clear-tags-btn {
	background-color: #666;
	color: #fff;
	border: none;
	padding: 4px 8px;
	border-radius: 4px;
	cursor: pointer;
	font-size: 12px;
	transition: background-color 0.3s;
}

.clear-tags-btn:hover {
	background-color: #777;
}

.tags-container {
	display: flex;
	gap: 10px;
	align-items: center;
	flex-wrap: wrap;
	margin-bottom: 15px;
}

.tag-selector {
	background-color: #222;
	border: 1px solid #444;
	color: #fff;
	padding: 8px 12px;
	border-radius: 6px;
	cursor: pointer;
	transition: all 0.3s;
	white-space: nowrap;
}

.tag-selector:hover {
	background-color: #333;
}

.tag-selector.active {
	background-color: #007acc;
	border-color: #0056b3;
}

.tag-text {
	font-size: 14px;
}

.sort-info {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.results-info {
	display: flex;
	flex-direction: column;
}

.total-count {
	color: #fff;
	font-size: 14px;
	font-weight: bold;
}

.filter-info {
	color: #007acc;
	font-size: 12px;
	font-weight: normal;
}

.sort-controls {
	display: flex;
	align-items: center;
	gap: 10px;
}

.sort-controls label {
	color: #fff;
	font-size: 14px;
}

.sort-controls select {
	background-color: #333;
	color: #fff;
	border: 1px solid #555;
	padding: 5px 10px;
	border-radius: 4px;
	font-family: inherit;
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
	.main-layout {
		grid-template-columns: 1fr;
		grid-template-rows: 1fr auto auto;
		grid-template-areas: 
			"content"
			"sidebar"
			"tags";
	}
	
	.reviews-container {
		padding: 10px;
	}
	
	.main-content, .comments-sidebar {
		padding: 15px;
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
