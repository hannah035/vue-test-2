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
				</div>

				<!-- Navigation Arrows -->
				<button class="nav-arrow nav-left" @click="previousReview" :disabled="currentIndex === 0">
					&#8249;
				</button>
				<button class="nav-arrow nav-right" @click="nextReview" :disabled="currentIndex === reviews.length - 1">
					&#8250;
				</button>
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
					<div class="nested-item" v-if="review.nested">
						<div class="nested-header">
							<span class="nested-author">{{ review.nested.author }}</span>
							<span class="nested-date">{{ review.nested.date }}</span>
						</div>
						<div class="nested-content">
							{{ review.nested.content }}
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
			error: null
		}
	},
	computed: {
		currentReview() {
			return this.reviews[this.currentIndex] || {}
		}
	},
	methods: {
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
		}
	},
	mounted() {
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
	}
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
