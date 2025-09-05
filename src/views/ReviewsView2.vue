<template>
	<div v-if="showReviewForm && isLoggedIn" class="backdrop"></div>
	<div v-if="showReviewForm && isLoggedIn" class="backdrop-blur"></div>
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
					@hover="hoverRating = n"
					>★</span
				>
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
			<div class="tags-container">
				<div
					v-for="tag in tags"
					:key="tag"
					class="tag-selector"
					:class="{ active: newReview.tags.includes(tag) }"
					@click="newReviewToggleTag(tag)"
				>
					<span class="tag-text">#{{ tag }}</span>
				</div>
			</div>

			<input
				v-model="newReview.tagsInput"
				type="text"
				placeholder="e.g. 電影, 科幻, 哲學"
				class="review-input"
				:disabled="submittingReview"
			/>
		</div>
		<div class="form-buttons">
			<button
				@click="cancelReviewForm"
				class="cancel-btn"
				aria-label="Cancel"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
				>
					<path
						d="M12 21C10.8181 21 9.64778 20.7672 8.55585 20.3149C7.46392 19.8626 6.47177 19.1997 5.63604 18.364C4.80031 17.5282 4.13738 16.5361 3.68508 15.4442C3.23279 14.3522 3 13.1819 3 12C3 10.8181 3.23279 9.64778 3.68508 8.55585C4.13738 7.46392 4.80031 6.47177 5.63604 5.63604C6.47177 4.80031 7.46392 4.13738 8.55585 3.68508C9.64778 3.23279 10.8181 3 12 3C13.1819 3 14.3522 3.23279 15.4442 3.68508C16.5361 4.13738 17.5282 4.80031 18.364 5.63604C19.1997 6.47177 19.8626 7.46392 20.3149 8.55585C20.7672 9.64778 21 10.8181 21 12C21 13.1819 20.7672 14.3522 20.3149 15.4442C19.8626 16.5361 19.1997 17.5282 18.364 18.364C17.5282 19.1997 16.5361 19.8626 15.4441 20.3149C14.3522 20.7672 13.1819 21 12 21L12 21Z"
						stroke="white"
						stroke-linecap="round"
					/>
					<path
						d="M9 9L15 15"
						stroke="white"
						stroke-linecap="round"
					/>
					<path
						d="M15 9L9 15"
						stroke="white"
						stroke-linecap="round"
					/>
				</svg>
			</button>
			<button
				@click="submitReview"
				:disabled="!isValidReview || submittingReview"
				class="submit-btn"
				aria-label="Submit"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
				>
					<path
						d="M6.99811 10.2467L7.43298 11.0077C7.70983 11.4922 7.84825 11.7344 7.84825 12C7.84825 12.2656 7.70983 12.5078 7.43299 12.9923L7.43298 12.9923L6.99811 13.7533C5.75981 15.9203 5.14066 17.0039 5.62348 17.5412C6.1063 18.0785 7.24961 17.5783 9.53623 16.5779L15.8119 13.8323C17.6074 13.0468 18.5051 12.654 18.5051 12C18.5051 11.346 17.6074 10.9532 15.8119 10.1677L9.53624 7.4221C7.24962 6.42171 6.1063 5.92151 5.62348 6.45883C5.14066 6.99615 5.75981 8.07966 6.99811 10.2467Z"
						stroke="white"
					/>
				</svg>
			</button>
		</div>
	</div>
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

				<!-- 標題 -->
				<h1 class="main-title">{{ currentReview.title || 'Title' }}</h1>

				<!-- 評分 -->
				<div class="rating-section">
					<div class="stars">
						<span
							v-for="n in 5"
							:key="n"
							class="star"
							:class="{ filled: n <= currentReview.rating }"
							>★</span
						>
					</div>
				</div>

				<!-- 評論內容 -->
				<div class="review-content">
					<p>{{ currentReview.content }}</p>
				</div>

				<!-- 作者和日期 -->
				<div class="author-section">
					<div class="author-info">
						<span class="author-name">{{
							currentReview.author
						}}</span>
						<span class="review-date">{{
							currentReview.date
						}}</span>
					</div>
				</div>

				<!-- Navigation Arrows -->
				<button
					class="nav-arrow nav-left"
					@click="previousReview"
					:disabled="currentIndex === 0"
				>
					&#8249;
				</button>
				<button
					class="nav-arrow nav-right"
					@click="nextReview"
					:disabled="currentIndex === reviews.length - 1"
				>
					&#8250;
				</button>
			</div>

			<!-- 右側評論列表 -->
			<div class="comments-sidebar">
				<!-- 評論回覆區域 -->
				<div
					v-if="
						(currentReview.comments &&
						currentReview.comments.length > 0) ||
						showReplyForm
					"
					class="comments-container"
				>
					<div
						v-for="comment in currentReview.comments"
						:key="comment.id"
						class="comment-item"
					>
						<div class="comment-header">
							<span class="comment-name">{{
								comment.author
							}}</span>
							<!-- <span class="comment-date">{{ comment.date }}</span> -->
						</div>
						<div class="comment-text">{{ comment.content }}</div>

						<!-- 顯示回覆 -->
						<div
							v-if="comment.replies && comment.replies.length > 0"
							class="replies-section"
						>
							<div
								v-for="reply in comment.replies"
								:key="reply.id"
								class="reply-item"
							>
								<div class="reply-header">
									<span class="reply-author">{{
										reply.author
									}}</span>
									<!-- <span class="reply-date">{{ reply.date }}</span> -->
								</div>
								<div class="reply-content">
									{{ reply.content }}
								</div>
							</div>
						</div>
						<!-- 回覆按鈕 (只有登入用戶可見且回覆表單未顯示) -->
						<div
							v-if="isLoggedIn && showCommentReply !== comment.id"
							class="comment-actions"
						>
							<button
								@click="toggleCommentReply(comment.id)"
								class="reply-arrow"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="20"
									viewBox="0 0 24 20"
									fill="none"
								>
									<path
										d="M1.00029 12.0479L0.645204 11.6959L0.296222 12.048L0.645223 12.4L1.00029 12.0479ZM23.4045 0.999988C23.4045 0.723845 23.1806 0.499994 22.9045 0.500001C22.6284 0.500008 22.4045 0.723872 22.4045 1.00001L23.4045 0.999988ZM7.84527 5.14316L7.49018 4.79115L0.645204 11.6959L1.00029 12.0479L1.35538 12.4L8.20036 5.49517L7.84527 5.14316ZM1.00029 12.0479L0.645223 12.4L7.49057 19.3044L7.84564 18.9524L8.20071 18.6003L1.35536 11.6959L1.00029 12.0479ZM1.00029 12.0479L1.00031 12.5479L16.9048 12.5475L16.9048 12.0475L16.9048 11.5475L1.00028 11.5479L1.00029 12.0479ZM22.9046 6.04736L23.4046 6.04735L23.4045 0.999988L22.9045 1L22.4045 1.00001L22.4046 6.04738L22.9046 6.04736ZM16.9048 12.0475L16.9048 12.5475C20.4947 12.5474 23.4047 9.6372 23.4046 6.04735L22.9046 6.04736L22.4046 6.04738C22.4047 9.08494 19.9424 11.5474 16.9048 11.5475L16.9048 12.0475Z"
										fill="white"
									/>
								</svg>
							</button>
						</div>

						<!-- 回覆評論表單 -->
						<div
							v-if="showCommentReply === comment.id && isLoggedIn"
							class="reply-form small"
						>
							<div class="textarea-container">
								<textarea
									v-model="replyContent"
									placeholder="Write your reply..."
									class="reply-textarea"
									:disabled="submittingReply"
								></textarea>
								<button
									@click="cancelCommentReply"
									class="cancel-btn"
									aria-label="Cancel"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
									>
										<path
											d="M12 21C10.8181 21 9.64778 20.7672 8.55585 20.3149C7.46392 19.8626 6.47177 19.1997 5.63604 18.364C4.80031 17.5282 4.13738 16.5361 3.68508 15.4442C3.23279 14.3522 3 13.1819 3 12C3 10.8181 3.23279 9.64778 3.68508 8.55585C4.13738 7.46392 4.80031 6.47177 5.63604 5.63604C6.47177 4.80031 7.46392 4.13738 8.55585 3.68508C9.64778 3.23279 10.8181 3 12 3C13.1819 3 14.3522 3.23279 15.4442 3.68508C16.5361 4.13738 17.5282 4.80031 18.364 5.63604C19.1997 6.47177 19.8626 7.46392 20.3149 8.55585C20.7672 9.64778 21 10.8181 21 12C21 13.1819 20.7672 14.3522 20.3149 15.4442C19.8626 16.5361 19.1997 17.5282 18.364 18.364C17.5282 19.1997 16.5361 19.8626 15.4441 20.3149C14.3522 20.7672 13.1819 21 12 21L12 21Z"
											stroke="white"
											stroke-linecap="round"
										/>
										<path
											d="M9 9L15 15"
											stroke="white"
											stroke-linecap="round"
										/>
										<path
											d="M15 9L9 15"
											stroke="white"
											stroke-linecap="round"
										/>
									</svg>
								</button>
								<button
									@click="submitReply(comment.id)"
									:disabled="
										!replyContent.trim() || submittingReply
									"
									class="submit-btn"
									aria-label="Submit"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
									>
										<path
											d="M6.99811 10.2467L7.43298 11.0077C7.70983 11.4922 7.84825 11.7344 7.84825 12C7.84825 12.2656 7.70983 12.5078 7.43299 12.9923L7.43298 12.9923L6.99811 13.7533C5.75981 15.9203 5.14066 17.0039 5.62348 17.5412C6.1063 18.0785 7.24961 17.5783 9.53623 16.5779L15.8119 13.8323C17.6074 13.0468 18.5051 12.654 18.5051 12C18.5051 11.346 17.6074 10.9532 15.8119 10.1677L9.53624 7.4221C7.24962 6.42171 6.1063 5.92151 5.62348 6.45883C5.14066 6.99615 5.75981 8.07966 6.99811 10.2467Z"
											stroke="white"
										/>
									</svg>
								</button>
							</div>

							<!-- <div class="form-buttons">
								
							</div> -->
						</div>
					</div>
					<button
						class="add-comment-btn"
						@click="toggleReplyForm"
						v-if="isLoggedIn && !showReplyForm"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="45"
							height="45"
							viewBox="0 0 45 45"
							fill="none"
						>
							<path
								d="M9.625 6.125H35.375C37.308 6.125 38.875 7.692 38.875 9.625V35.375C38.875 37.308 37.308 38.875 35.375 38.875H9.625C7.692 38.875 6.125 37.308 6.125 35.375V9.625C6.125 7.692 7.692 6.125 9.625 6.125Z"
								stroke="white"
							/>
							<path
								d="M22.5 15L22.5 30"
								stroke="white"
								stroke-linejoin="round"
							/>
							<path
								d="M30 22.5L15 22.5"
								stroke="white"
								stroke-linejoin="round"
							/>
						</svg>
					</button>
					<!-- 新增評論表單 (在按鈕下方顯示) -->
					<div v-if="showReplyForm && isLoggedIn" class="reply-form">
						<div class="textarea-container">
							<textarea
								v-model="commentContent"
								placeholder="Write your comment..."
								class="reply-textarea"
								:disabled="submittingReply"
							></textarea>
							<button
								@click="cancelReply"
								class="cancel-btn"
								aria-label="Cancel"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
								>
									<path
										d="M12 21C10.8181 21 9.64778 20.7672 8.55585 20.3149C7.46392 19.8626 6.47177 19.1997 5.63604 18.364C4.80031 17.5282 4.13738 16.5361 3.68508 15.4442C3.23279 14.3522 3 13.1819 3 12C3 10.8181 3.23279 9.64778 3.68508 8.55585C4.13738 7.46392 4.80031 6.47177 5.63604 5.63604C6.47177 4.80031 7.46392 4.13738 8.55585 3.68508C9.64778 3.23279 10.8181 3 12 3C13.1819 3 14.3522 3.23279 15.4442 3.68508C16.5361 4.13738 17.5282 4.80031 18.364 5.63604C19.1997 6.47177 19.8626 7.46392 20.3149 8.55585C20.7672 9.64778 21 10.8181 21 12C21 13.1819 20.7672 14.3522 20.3149 15.4442C19.8626 16.5361 19.1997 17.5282 18.364 18.364C17.5282 19.1997 16.5361 19.8626 15.4441 20.3149C14.3522 20.7672 13.1819 21 12 21L12 21Z"
										stroke="white"
										stroke-linecap="round"
									/>
									<path
										d="M9 9L15 15"
										stroke="white"
										stroke-linecap="round"
									/>
									<path
										d="M15 9L9 15"
										stroke="white"
										stroke-linecap="round"
									/>
								</svg>
							</button>
							<button
								@click="submitComment"
								:disabled="
									!commentContent.trim() || submittingReply
								"
								class="submit-btn"
								aria-label="Submit"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
								>
									<path
										d="M6.99811 10.2467L7.43298 11.0077C7.70983 11.4922 7.84825 11.7344 7.84825 12C7.84825 12.2656 7.70983 12.5078 7.43299 12.9923L7.43298 12.9923L6.99811 13.7533C5.75981 15.9203 5.14066 17.0039 5.62348 17.5412C6.1063 18.0785 7.24961 17.5783 9.53623 16.5779L15.8119 13.8323C17.6074 13.0468 18.5051 12.654 18.5051 12C18.5051 11.346 17.6074 10.9532 15.8119 10.1677L9.53624 7.4221C7.24962 6.42171 6.1063 5.92151 5.62348 6.45883C5.14066 6.99615 5.75981 8.07966 6.99811 10.2467Z"
										stroke="white"
									/>
								</svg>
							</button>
						</div>
					</div>
				</div>

				<!-- 如果沒有評論，顯示無評論提示 -->
				<div v-else-if="!showReplyForm" class="no-comments">
					<p class="no-comments-text">No comments yet</p>

					<button
						class="add-comment-btn"
						@click="toggleReplyForm"
						v-if="isLoggedIn && !showReplyForm"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="45"
							height="45"
							viewBox="0 0 45 45"
							fill="none"
						>
							<path
								d="M9.625 6.125H35.375C37.308 6.125 38.875 7.692 38.875 9.625V35.375C38.875 37.308 37.308 38.875 35.375 38.875H9.625C7.692 38.875 6.125 37.308 6.125 35.375V9.625C6.125 7.692 7.692 6.125 9.625 6.125Z"
								stroke="white"
							/>
							<path
								d="M22.5 15L22.5 30"
								stroke="white"
								stroke-linejoin="round"
							/>
							<path
								d="M30 22.5L15 22.5"
								stroke="white"
								stroke-linejoin="round"
							/>
						</svg>
					</button>
					
				</div>

				<!-- 新增評論按鈕 -->

				<!-- 如果未登入，顯示登入提示 -->
				<div v-if="!isLoggedIn" class="login-prompt">
					<p>Login to add comments and reviews</p>
				</div>
			</div>

			<!-- 底部標籤選擇區域 -->
			<div class="bottom-tags">
				<!-- 標籤列表 -->
				<div class="tags-container">
					<div
						v-for="tag in tags"
						:key="tag"
						class="tag-selector"
						:class="{ active: selectedTags.includes(tag) }"
						@click="toggleTag(tag)"
					>
						<span class="tag-text">#{{ tag }}</span>
					</div>
				</div>

				<!-- 排序和結果資訊 -->
				<div class="sort-info">
					<div class="results-info">
						<span class="total-count">
							{{ filteredReviews.length }} reviews by
						</span>
					</div>

					<div class="sort-controls">
						<select v-model="sortBy" @change="sortReviews">
							<option value="date-desc">Date far to near</option>
							<option value="date-asc" selected>
								Date near to far
							</option>
							<option value="title">Title</option>
							<option value="rating">Rating</option>
						</select>
					</div>
					<button
						v-if="selectedTags.length > 0"
						@click="clearAllTags"
						class="clear-tags-btn"
					>
						Reset
					</button>

					<!-- 新增 Review 按鈕 -->
					<button
						class="add-review-btn"
						@click="toggleReviewForm"
						v-if="isLoggedIn"
					>
						<svg
							v-if="!showReviewForm"
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							viewBox="0 0 16 16"
							fill="none"
						>
							<path
								d="M8 1V15"
								stroke="white"
								stroke-width="2"
								stroke-linecap="round"
							/>
							<path
								d="M1 8H15"
								stroke="white"
								stroke-width="2"
								stroke-linecap="round"
							/>
						</svg>
						<span v-if="showReviewForm">✕</span>
					</button>
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
	name: 'ReviewsView2',
	data() {
		return {
			currentIndex: 0,
			sortBy: 'date-asc',
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
				tags: [],
			},
			hoverRating: 0, // 用於星級評分的懸停效果
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
			const filtered = this.allReviews.filter((review) => {
				return this.selectedTags.some(
					(tag) => review.tags && review.tags.includes(tag)
				)
			})

			// 按照包含的選中 tags 數量排序，優先顯示包含更多選中 tags 的評論
			return filtered.sort((a, b) => {
				const aMatchCount = this.selectedTags.filter(
					(tag) => a.tags && a.tags.includes(tag)
				).length
				const bMatchCount = this.selectedTags.filter(
					(tag) => b.tags && b.tags.includes(tag)
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
			return (
				this.newReview.subject.trim() &&
				this.newReview.content.trim() &&
				this.newReview.rate > 0
			)
		},
	},
	watch: {
		filteredReviews: {
			handler(newVal) {
				this.reviews = newVal
				if (this.currentIndex >= newVal.length) {
					this.currentIndex = Math.max(0, newVal.length - 1)
				}
				// call sortReviews to ensure the reviews are sorted after filtering
				this.sortReviews()
			},
			immediate: true,
		},
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
					console.log(
						'Login status: true, currentUser:',
						this.currentUser
					)
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
		sortReviews() {
			switch (this.sortBy) {
				case 'date-desc':
					this.reviews.sort(
						(a, b) => new Date(a.date) - new Date(b.date)
					)
					break
				case 'date-asc':
					this.reviews.sort(
						(a, b) => new Date(b.date) - new Date(a.date)
					)
					break
				case 'title':
					this.reviews.sort((a, b) => a.title.localeCompare(b.title))
					break
				case 'rating':
					this.reviews.sort((a, b) => b.rating - a.rating)
					break
			}
			this.currentIndex = 0
			console.log('Reviews sorted by:', this.sortBy)
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

		newReviewToggleTag(tag) {
			const index = this.newReview.tags.indexOf(tag)
			if (index > -1) {
				this.newReview.tags.splice(index, 1)
			} else {
				this.newReview.tags.push(tag)
			}
		},

		// 清除所有选中的标签
		clearAllTags() {
			this.selectedTags = []
		},

		// 获取标签对应的评论数量
		getTagCount(tag) {
			return this.allReviews.filter(
				(review) => review.tags && review.tags.includes(tag)
			).length
		},

		// 获取评论匹配的选中标签数量
		getMatchingTagsCount(review) {
			if (!this.selectedTags.length || !review.tags) return 0
			return this.selectedTags.filter((tag) => review.tags.includes(tag))
				.length
		},

		// 获取评论匹配的选中标签列表
		getMatchingTags(review) {
			if (!this.selectedTags.length || !review.tags) return []
			return this.selectedTags.filter((tag) => review.tags.includes(tag))
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
					parentId: null, // 主評論，沒有父評論
				}

				const response = await reviewsService.createComment(
					this.currentReview.id,
					commentData
				)

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
			// 只允許開啟回覆表單，不允許透過點擊按鈕關閉
			if (this.showCommentReply !== commentId) {
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
					parentId: commentId, // 回覆特定評論
				}

				const response = await reviewsService.createComment(
					this.currentReview.id,
					replyData
				)

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
					parentId: null, // 主評論，沒有父評論
				}

				const response = await reviewsService.createComment(
					reviewId,
					commentData
				)

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
					parentId: commentId, // 回覆特定評論
				}

				const response = await reviewsService.createComment(
					reviewId,
					replyData
				)

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
				tags: [],
			}
		},

		setRating(rating) {
			this.newReview.rate = rating
		},
		hoverRating(rating) {
			for (let i = 1; i <= 5; i++) {
				const star = document.querySelector(`.star-${i}`)
				if (star) {
					star.classList.toggle('hover', i <= rating)
				}
			}
		},

		async submitReview() {
			if (!this.isValidReview || !this.isLoggedIn) {
				return
			}

			try {
				this.submittingReview = true
				// 處理標籤
				let tags = this.newReview.tagsInput
					.split(',')
					.map((tag) => tag.trim())
					.filter((tag) => tag.length > 0)
				tags = tags.concat(this.newReview.tags)
				tags = Array.from(new Set(tags)) // 去重

				const reviewData = {
					userId: this.currentUser._id,
					subject: this.newReview.subject.trim(),
					rate: this.newReview.rate,
					content: this.newReview.content.trim(),
					tags: tags,
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
.backdrop {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 1000;
}
.backdrop-blur {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.3); /* Semi-transparent overlay */
	backdrop-filter: blur(5px); /* Blur effect */
	z-index: 8;
}
/* ========================================
   主要容器樣式 - 整個評論頁面的根容器
   ======================================== */
.reviews-container {
	width: 100%;
	/* 佔滿父容器的寬度 */
	height: 100%;
	/* 最小高度為視窗高度，確保內容不足時也能填滿螢幕 */
	background-color: #000;
	/* 黑色背景，營造暗色主題 */
	color: #fff;
	/* 白色文字，與黑色背景形成對比 */
	font-family: 'JetBrains Mono';
	/* 使用等寬字體，營造程式碼風格 */
	box-sizing: border-box;
	/* 包含 padding 在總寬度內，避免溢出 */
	display: flex;
	/* 使用 Flexbox 布局 */
	flex-direction: column;
	/* 子元素垂直排列 */
	color: #fff;
}

/* ========================================
   主要網格布局 - 使用 CSS Grid 分割頁面區域
   ======================================== */
.main-layout {
	display: grid;
	/* 使用 CSS Grid 布局系統 */
	grid-template-columns: 1fr 40%;
	/* 兩欄布局：左側自適應，右側固定 350px */
	grid-template-rows: 1fr auto;
	/* 兩列：上方自適應高度，下方根據內容調整 */
	height: 100%;
	/* 總高度為視窗高度減去容器 padding (20px * 2) */
	grid-template-areas:
		/* 定義網格區域名稱，方便管理布局 */
		'content sidebar'
		/* 第一列：左邊內容區，右邊側邊欄 */
		'tags tags';
	/* 第二列：標籤區域橫跨兩欄 */
}

/* ========================================
   左側主要內容區域 - 顯示當前選中的評論詳情
   ======================================== */
.main-content {
	grid-area: content;
	/* 對應網格區域 "content" */
	display: flex;
	/* 使用 Flexbox 布局 */
	flex-direction: column;
	/* 子元素垂直排列 */
	overflow-y: auto;
	/* 內容溢出時顯示垂直捲軸 */
	padding: 20px;
	/* 內部留白 20px */
	position: relative;
	/* 相對定位，為導航箭頭提供定位基準 */
	max-height: 100vh;
	justify-content: space-between;
	/* 讓子元素分散排列，作者區域推到底部 */
	/* 最大高度限制，避免內容過長 */
}

/* ========================================
   右側評論側邊欄 - 顯示評論列表和互動功能
   ======================================== */
.comments-sidebar {
	grid-area: sidebar;
	/* 對應網格區域 "sidebar" */
	display: flex;
	/* 使用 Flexbox 布局 */
	flex-direction: column;
	/* 子元素垂直排列 */
	gap: 15px;
	/* 子元素間距 15px，比主內容區稍小 */
	padding: 0px 45px 0px 0px;
	/* 內部留白：上下 20px，右側 20px */
	overflow-y: auto;
	/* 內容溢出時顯示垂直捲軸 */
	overflow-x: hidden;
	/* 隱藏水平溢出，防止新增評論內容橫向跑出 */
	min-height: 0;
	/* 允許彈性縮小，配合 overflow 使用 */
	max-height: 100vh;
	/* 與主內容區相同的高度限制 */
	align-items: center;
	/* 水平置中對齊所有子元素 */
	width: 100%;
	/* 使用完整寬度 */
	box-sizing: border-box;
	/* 包含 padding 在總寬度內 */
}

/* ========================================
   底部標籤區域 - 橫跨整個頁面的標籤篩選功能
   ======================================== */
.bottom-tags {
	grid-area: tags;
	/* 對應網格區域 "tags" */
	display: flex;
	/* 使用 Flexbox 布局 */
	flex-direction: column;
	/* 子元素垂直排列 */
	gap: 0;
	/* 子元素間距 8px */
	padding: 15px;
	padding-bottom: 0%;
	padding-top: 10px;
	/* 內部留白 10px，比其他區域稍小 */
	border-top: 1px solid #ffffff;
	/* 頂部邊框線，與上方內容分隔 */
	/* 與其他區域相同的邊框樣式 */
}

/* ========================================
   左側主要內容樣式 - 評論詳情的各個組件
   ======================================== */
/* 標籤顯示容器 */
.tags-display {
	display: flex;
	/* 使用 Flexbox 布局 */
	gap: 3px;
	/* 標籤間距 10px */
	flex-wrap: wrap;
	/* 標籤過多時自動換行 */
	margin-bottom: 15%;
	/* 底部留白，與下方內容分離 */
}

/* 評論標題 */
.main-title {
	font-size: 24px;
	/* 較大的字體大小，突出標題重要性 */
	text-align: center;
	/* 文字水平置中對齊 */
	color: #fff;
	/* 純白色，最高對比度 */
	margin: 0 auto;
	/* 上下邊距為0，左右自動邊距實現容器置中 */
}

/* 個別標籤樣式 */
.tag-item {
	/* background-color: #333;
	深灰色背景，比主背景亮一些 */
	color: #fff;
	/* 白色文字 */
	padding: 2px 7px;
	/* 內部留白：上下 2px，左右 7px */
	border: 1px solid transparent;
	/* 透明邊框，防止 active 時尺寸變化 */
	border-radius: 4px;
	/* 圓角 4px，柔化邊緣 */
	font-size: 0.85rem;
	/* 較小的字體，表示次要信息 */
}

/* 被選中的標籤樣式 */
.tag-item.active {
	background-color: transparent;
	/* 透明背景，表示活躍/選中狀態 */
	border: 1px solid rgb(255, 255, 255);
	/* 半透明白色邊框 */
}

/* 評論內容段落 */
.review-content {
	margin: 0;
	/* 移除預設邊距，避免額外空白 */
	word-break: break-word;
	/* 長單詞自動換行，防止溢出 */
	padding: 0 20%;
	/* 左右內邊距 50px，讓文字在中間區域顯示 */
	text-align: justify;
	/* 文字兩端對齊，讓段落更整齊 */
	line-height: 1.6;
	/* 增加行高，提高可讀性 */
}

/* 評論內容段落 */
.review-content p {
	margin: 0;
	/* 移除預設邊距，避免額外空白 */
	word-break: break-word;
	color: #fff;
	font-size: 1rem;
}

/* ========================================
   評分系統樣式
   ======================================== */

/* 評分區域容器 */
.rating-section {
	margin-bottom: 30px;
	/* 底部留白，與下方內容分離 */
}

/* 星星容器 */
.stars {
	display: flex;
	/* 使用 Flexbox 水平排列星星 */
	justify-content: center;
	/* 水平置中對齊 */
	gap: 2px;
	/* 星星間距 2px，緊密排列 */
}

/* 單個星星樣式 - 未填充狀態 */
.star {
	color: #000000;
	/* 純白色，表示未評分的星星 */
	font-size: 20px;
	/* 適中的大小，清晰可見 */
}

/* 單個星星樣式 - 填充狀態 */
.star.filled {
	color: #ffffff;
	/* 金黃色，表示已評分的星星 */
}

/* ========================================
   作者信息區域樣式
   ======================================== */

/* 作者信息區域樣式 */
.author-section {
	/* border-top: 1px solid #333; */
	/*頂部邊框，與上方內容分隔 */
	margin-top: 5%;
	/* 自動頂部邊距，將元素推到底部 */
	margin-bottom: auto;
	/* 底部留白，與下方內容分離 */
	padding: 0 20%;
	/* 左右內邊距 50px，讓文字在中間區域顯示 */
}

.author-info {
	display: flex;
	justify-content: center;
	/* 置中對齊作者與日期 */
	align-items: center;
	gap: 10px;
	padding-left: 0;
}

/* 作者姓名 */
.author-name {
	color: #fff;
	/* 純白色，高對比度 */
	font-size: 1rem;
	/* 字體大小調整為 20px */
}

/* 評論日期 */
.review-date {
	color: #fff;
	/* 純白色，表示次要信息 */
	font-size: 1rem;
	/* 字體大小調整為 20px */
}

/* ========================================
   導航箭頭樣式 - 用於切換評論的左右箭頭
   ======================================== */

/* 導航箭頭基本樣式 */
.nav-arrow {
	position: absolute;
	/* 絕對定位，相對於 main-content */
	top: 50%;
	/* 垂直置中 */
	transform: translateY(-50%);
	/* 精確的垂直置中對齊 */
	/* background-color: rgba(255, 255, 255, 0.2); */
	/* 半透明白色背景 */
	border: none;
	/* 移除預設邊框 */
	color: #fff;
	/* 白色文字/圖標 */
	font-size: 20px;
	/* 箭頭大小 */
	width: 50px;
	/* 圓形按鈕寬度 */
	height: 50px;
	/* 圓形按鈕高度 */
	border-radius: 50%;
	/* 圓形按鈕 */
	cursor: pointer;
	/* 手形游標，表示可點擊 */
	transition: all 0.3s;
	/* 所有屬性的平滑過渡動畫 */
	backdrop-filter: blur(10px);
	/* 背景模糊效果，現代毛玻璃風格 */
	text-align: center;
}

/* 導航箭頭懸停效果 - 僅在非禁用狀態下生效 */
.nav-arrow:hover:not(:disabled) {
	/* background-color: rgba(255, 255, 255, 0.2); */
	/* 懸停時背景更亮 */
	transform: translateY(-50%) scale(1.1);
	font-size: 22px;
	/* 懸停時稍微放大 */
}

/* 導航箭頭禁用狀態 - 當無法繼續導航時 */
.nav-arrow:disabled {
	opacity: 0.3;
	/* 降低透明度，表示禁用 */
	cursor: not-allowed;
	/* 禁止游標，表示不可點擊 */
}

/* 左側導航箭頭位置 */
.nav-left {
	left: 25px;
	/* 位於容器左側外 25px */
}

/* 右側導航箭頭位置 */
.nav-right {
	right: 25px;
	/* 位於容器右側外 25px */
}

/* ========================================
   右側評論區域樣式 - 評論列表和互動功能
   ======================================== */

/* 評論容器 - 包含所有評論的外層容器 */
.comments-container {
	width: 100%;
	/* 使用完整寬度 */
	max-width: 100%;
	/* 強制限制最大寬度，確保與新增評論格式一致 */
	box-sizing: border-box;
	/* 隱藏任何溢出內容，與新增評論保持一致 */
	display: flex;
	/* 使用 Flexbox 布局 */
	flex-direction: column;
	/* 垂直排列評論項目 */
	gap: 0;
	/* 移除間距，讓評論項目緊密排列 */
	height: fit-content;
}

/* 單個評論項目 */
.comment-item {
	padding: 15px 20px;
	/* 上下15px，左右20px內邊距，避免內容貼邊 */
	position: relative;
	/* 相對定位，為回覆箭頭提供基準 */
	/* border: 1px solid #ffffff; */
	/* 邊框與其他元素保持一致 */
	/* width: 100%;
	使用100%寬度，讓box-sizing處理padding */
	max-width: 100%;
	/* 強制限制最大寬度，防止任何內容溢出 */
	align-self: stretch;
	/* 確保評論項目在置中容器中仍然伸展 */
	box-sizing: border-box;
	/* 包含 padding 在總寬度內，這是關鍵！ */
	/* overflow: hidden; */
	/* 隱藏任何溢出的內容，確保不會跑出邊界 */
	word-wrap: break-word;
	/* 強制長單詞換行，處理新增評論的長文字 */
	margin-bottom: 12px;
	padding: 15px;
	background-color: #343434;
}

/* 評論標題區域 */
.comment-header {
	display: flex;
	/* 使用 Flexbox 布局 */
	justify-content: space-between;
	/* 兩端對齊：作者名稱在左，日期在右 */
	margin-bottom: 8px;
	/* 底部留白，與內容分離 */
	font-size: 1rem;
}

/* 評論者姓名 */
.comment-name {
	/* 粗體，突出評論者身份 */
	color: #fff;
	/* 純白色，高對比度 */
}

/* 評論日期 */
.comment-date {
	color: #fff;
	/* 純白色，表示次要信息 */
	font-size: 14px;
	/* 略小的字體 */
}

/* 評論文字內容 */
.comment-text {
	color: #fff;
	/* 純白色，表示內容文字 */
	line-height: 1.3;
	/* 適當的行高，提高可讀性 */
	word-break: break-word;
	/* 長單詞自動換行 */
	font-size: 1rem;
	width: 100%;
	/* 確保文字內容不超出容器 */
	max-width: 100%;
	/* 強制限制最大寬度，防止溢出 */
	overflow-wrap: break-word;
	/* 強制長單詞換行 */
	white-space: pre-wrap;
	/* 保留空白但允許換行 */
	box-sizing: border-box;
	/* 包含任何 padding 在寬度計算內 */
}

/* 評論操作區域 */
.comment-actions {
	/* margin-top: 8px;
	頂部留白，與內容分離 */
	display: flex;
	/* 使用 Flexbox 布局 */
	justify-content: flex-end;
	/* 回覆按鈕靠右對齊 */
}

/* 回覆箭頭按鈕 */
.reply-arrow {
	background: none;
	/* 無背景，保持簡潔 */
	border: none;
	/* 無邊框 */
	color: #fff;
	/* 純白色，表示互動元素 */
	cursor: pointer;
	/* 手形游標 */
	width: 16px;
	/* 設定按鈕寬度，縮小4px */
	height: 12px;
	/* 設定按鈕高度，縮小4px */
	display: flex;
	/* 使用 Flexbox 置中 */
	align-items: center;
	/* 垂直置中 */
	justify-content: center;
	/* 水平置中 */
	transform: rotate(0deg);
	/* 旋轉0度，取消旋轉 */
	flex-shrink: 0;
	/* 防止縮小 */
}

.reply-arrow svg {
	width: 100%;
	/* SVG 填滿按鈕 */
	height: 100%;
	/* SVG 填滿按鈕 */
	stroke-width: 1px;
	/* 設定線條寬度 */
	stroke: #fff;
	/* 設定線條顏色 */
}

/* 新增評論按鈕 */
.add-comment-btn {
	background: transparent;
	/* 透明背景，移除按鈕外框 */
	border: none;
	/* 移除邊框 */
	color: #fff;
	/* 白色文字/圖標 */
	width: 45px;
	/* 按鈕寬度，與 SVG 相同 */
	height: 45px;
	/* 按鈕高度，與 SVG 相同 */
	cursor: pointer;
	/* 手形游標 */
	display: flex;
	/* 使用 Flexbox 布局 */
	align-items: center;
	/* 垂直置中對齊 */
	justify-content: center;
	/* 水平置中對齊 */
	transition: all 0.2s;
	/* 平滑過渡動畫 */
	padding: 0;
	/* 移除內邊距 */
	margin-bottom: 100px;
	position: relative;
	left: 50%;
	transform: translateX(-50%);
}

.add-comment-btn svg {
	width: 45px;
	/* SVG 寬度 */
	height: 45px;
	/* SVG 高度 */
	flex-shrink: 0;
	/* 防止縮小 */
}

.add-comment-btn span {
	font-size: 24px;
	/* 關閉符號的字體大小 */
	color: #fff;
	/* 確保叉叉是白色 */
	font-weight: bold;
	/* 加粗叉叉 */
}

.add-comment-btn:hover {
	opacity: 0.8;
	/* 懸停時降低透明度，提供視覺回饋 */
	transform: translateX(-50%) scale(1.05);
	/* 懸停時輕微放大 */
}

.add-review-btn {
	background-color: transparent;
	/* border: 1px solid #0056b3; */
	color: #fff;
	padding: 8px;
	border-radius: 4px;
	font-size: 14px;
	cursor: pointer;
	transition: background-color 0.3s;
	align-self: flex-end;
	/* 靠右對齊 */
	margin-left: auto;
	/* 讓按鈕推到容器最右側 */
	display: flex;
	/* 使用 Flexbox 布局 */
	align-items: center;
	/* 垂直置中對齊 */
	justify-content: center;
	/* 水平置中對齊 */
	border: none;
	/* 移除邊框 */
}

.add-review-btn:hover {
	background-color: #333;
}

.add-review-form {
	margin-top: 15px;
	padding: 20px;
	/* background-color: #1a1a1a; */
	background-color: #000;
	border-radius: 8px;
	border: 1px solid #fff;
	position: absolute;
	z-index: 1001;
	width: 40%;
	left: 50%;
	transform: translateX(-50%);
	/* 確保表單佔滿寬度 */
	align-self: stretch;
	/* 確保表單在置中容器中仍然伸展 */
}

.add-review-form h4 {
	margin: 0 0 15px 0;
	color: #fff;
	font-size: 16px;
}
.add-review-form .form-buttons {
	position: relative;
	height: fit-content;
}
.form-buttons .cancel-btn {
	position: relative;
	left: 0;
}
.form-buttons .submit-btn {
	position: absolute;
	right: 0;
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
	border: none;
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
	color: #fff;
}

.login-prompt {
	text-align: center;
	padding: 20px;
	color: #ccc;
	font-style: italic;
}

.login-prompt p {
	margin: 0;
	font-size: 14px;
}

.no-comments {
	text-align: center;
	padding: 20px;
	color: #ccc;
	font-style: italic;
}

.no-comments p {
	margin: 0;
	font-size: 14px;
	padding-top: 10px;
	padding-bottom: 10px;
}

.clear-tags-btn {
	/* background-color: #666; */
	color: #fff;
	border: 1px solid rgb(255, 255, 255);
	padding: 2px 7px;
	border-radius: 4px;
	cursor: pointer;
	font-size: 0.85rem;
	font-family: inherit;
	transition: background-color 0.3s;
}

.tags-container {
	display: flex;
	gap: 3px;
	align-items: center;
	flex-wrap: wrap;
}

.tag-selector {
	/* background-color: #333;
	深灰色背景，比主背景亮一些 */
	color: #fff;
	/* 白色文字 */
	padding: 2px 7px;
	/* 內部留白：上下 4px，左右 8px */
	border: 1px solid transparent;
	/* 透明邊框，防止 hover 時尺寸變化 */
	border-radius: 4px;
	/* 圓角 4px，柔化邊緣 */
	font-size: 0.85rem;
	/* 較小的字體，表示次要信息 */
	cursor: pointer;
	transition: all 0.3s;
	white-space: nowrap;
	display: flex;
	/* 使用 Flexbox 布局 */
	align-items: center;
	/* 垂直置中對齊 */
	justify-content: center;
	/* 水平置中對齊 */
	box-sizing: border-box;
	/* 包含邊框在總尺寸內 */
}

.tag-selector:hover {
	background-color: transparent;
	border: 1px solid rgba(255, 255, 255, 0.2);
	/* 更淡的半透明白色邊框用於 hover 狀態 */
}

.tag-selector.active {
	background-color: transparent;
	/* 透明背景，表示活躍/選中狀態 */
	border: 1px solid rgb(255, 255, 255);
	/* 半透明白色邊框 */
	color: #ffffff;
	/* 白色文字 */
}

.tag-text {
	font-size: 0.85rem;
}

.sort-info {
	display: flex;
	justify-content: flex-start;
	/* 靠左對齊所有內容 */
	align-items: center;
	gap: 10px;
	padding-left: 10px;
	padding-bottom: 10px;
	padding-top: 5px;
}

.results-info {
	display: flex;
	flex-direction: column;
}

.total-count {
	color: #fff;
	font-size: 0.85rem;
}

/* .filter-info {
	color: #ffffff;
	font-size: 1rem;
	font-weight: normal;
} */

.sort-controls {
	display: flex;
	align-items: center;
	gap: 10px;
}

.sort-controls label {
	color: #fff;
	font-size: 0.85rem;
}

.sort-controls select {
	background-color: transparent;
	color: #fff;
	border: none;
	border-bottom: 1px solid #fff;
	padding: 1px 4px;
	border-radius: 0;
	font-family: inherit;
	outline: none;
}

.sort-controls select:focus {
	outline: none;
	border: none;
	border-bottom: 1px solid #fff;
}

.sort-controls select option {
	background-color: #000;
	color: #fff;
	border: none;
	outline: none;
	box-shadow: none;
	-webkit-appearance: none;
	-moz-appearance: none;
	appearance: none;
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
	background-color: #000000;
	border: 1px solid #ffffff;
	border-radius: 8px;
	width: 100%;
	/* 確保表單佔滿寬度 */
	align-self: stretch;
	/* 確保表單在置中容器中仍然伸展 */
	box-sizing: border-box;
	/* padding: 15px; */
}

.reply-form.small {
	background-color: #333;
	margin-top: 10px;
	padding: 0px;
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
.textarea-container {
	/* background-color: var(--card-color); */
	width: 100%;
	height: min-content;
	padding: 0;
	position: relative;
	border: none;
	outline: none;
}
.textarea-container button {
	position: absolute;
	bottom: 15px;
	/* TODO: why 15px( 10px + 5px) */
}
.textarea-container .cancel-btn {
	left: 0px;
}
.textarea-container .submit-btn {
	right: 0px;
}

.reply-textarea {
	width: 100%;
	height: 100%;
	min-height: 120px;
	background-color: transparent;
	color: #fff;
	border: none;
	border-radius: 4px;
	padding: 10px 10px 0 10px;
	font-family: inherit;
	font-size: 14px;
	resize: vertical;
	box-sizing: border-box;
	/* bottom: -10px; */
	position: relative;
	/* resize: none; */
	margin: 0;
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
	/* background-color: #007acc; */
	color: #fff;
	border: none;
	padding: 8px 16px 3px 16px;
	border-radius: 4px;
	cursor: pointer;
	font-family: inherit;
	font-size: 14px;
	transition: background-color 0.3s;
}

.submit-btn:disabled {
	/* background-color: #555; */
	cursor: not-allowed;
}

.cancel-btn {
	/* background-color: #666; */
	color: #fff;
	border: none;
	padding: 8px 16px 3px 16px;
	border-radius: 4px;
	cursor: pointer;
	font-family: inherit;
	font-size: 14px;
	transition: background-color 0.3s;
}
/* 
.cancel-btn:hover {
	background-color: #777;
} */

/* 評論區域樣式 */
.comments-section {
	margin-top: 30px;
	padding-top: 20px;
	/* border-top: 1px solid #444; */
}

.comments-section h3 {
	margin: 0 0 20px 0;
	color: #fff;
	font-size: 18px;
}

.comment-header {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	margin-bottom: 3px;
}

.comment-author {
	font-weight: bold;
	color: #fff;
	font-size: 1rem;
	line-height: 1.1;
}

.comment-date {
	display: none;
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
	margin-top: 10px;
	border-left: 1px solid #ffffff;
}

.reply-item {
	margin-bottom: 0px;
	margin-left: 15px;
}

.reply-header {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	text-align: left;
	margin-bottom: 3px;
}

.reply-author {
	color: #fff;
	font-size: 1rem;
	line-height: 1.1;
}

.reply-date {
	display: none;
}

.reply-content {
	color: #ffffff;
	line-height: 1.4;
	font-size: 1rem;
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

/* 響應式設計 */
@media (max-width: 768px) {
	.main-layout {
		grid-template-columns: 1fr;
		grid-template-rows: auto auto auto;
		grid-template-areas:
			'tags'
			'content'
			'sidebar';
	}
	.add-review-form {
		width: 80%;
		position: fixed;
	}

	.main-content {
		height: fit-content;
	}

	.comments-sidebar {
		height: fit-content;
	}
	.bottom-tags {
		min-width: 0;
		width: 100%;
		box-sizing: border-box;
	}

	.reviews-container {
		padding: 10px;
	}

	.nav-arrow {
		width: 40px;
		height: 40px;
		font-size: 16px;
	}
	.comments-sidebar {
		padding: 0 20px;
		height: fit-content;
	}
	.bottom-tags {
		border: none;
	}
	/* .nav-left {
		left: -20px;
	}

	.nav-right {
		right: -20px;
	} */
}

/* 載入和錯誤狀態樣式 */
.loading-container,
.error-container,
.empty-container {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	min-height: 50vh;
	text-align: center;
}

.loading-text,
.error-text,
.empty-text {
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
