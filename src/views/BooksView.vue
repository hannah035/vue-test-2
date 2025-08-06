<template>
	<div class="handleScroll">
		<div class="search-container">
			<input
				type="text"
				v-model="searchQuery"
				placeholder="Search books, authors, publishers..."
				class="search-input"
			/>
			<div v-if="searchQuery" class="search-clear" @click="clearSearch">
				×
			</div>
		</div>
		<div class="grid-container" id="split-container">
			<section id="bookshelf">
				<!-- 搜尋功能 -->

				<div class="books-container" ref="container">
					<div
						class="grid-wrapper"
						ref="gridWrapper"
						:class="{ 'with-details': selectedBook }"
					>
						<div
							class="product-list"
							:style="{ gridTemplateColumns: gridColumns }"
						>
							<button
								class="product-card"
								v-for="(book, index) in filteredBooks"
								:key="index"
								:ref="`bookItem-${index}`"
								@click="selectBook(book, index)"
							>
								<div class="product-thumbnail">
									<img loading="lazy" :src="book.cover" />
								</div>
								<div class="product-title">
									<div class="text">
										{{ book.title }}
									</div>
								</div>
							</button>
						</div>
					</div>

					<transition
						name="details-slide"
						@after-enter="scrollToSelectedItem()"
						@after-leave="scrollToSelectedItem()"
					>
						<div v-if="selectedBook" class="details-panel">
							<div class="details-content">
								<button
									@click="closeDetails()"
									class="close-btn"
								>
									×
								</button>
								<img
									:src="selectedBook.cover"
									:alt="selectedBook.title"
									class="large-image"
								/>
								<h2>{{ selectedBook.title }}</h2>
								<p>作者：{{ selectedBook.author }}</p>
								<p>出版社：{{ selectedBook.publisher }}</p>
								<p>位置：{{ selectedBook.place }}</p>
								<p v-if="selectedBook.borrow == '0'">
									狀態：可借閱
								</p>
								<p v-else>
									狀態：已借出
									<span
										v-if="
											isLoggedIn &&
											selectedBook.borrow ===
												currentUser._id
										"
									>
										（您已借閱）
									</span>
								</p>

								<!-- 借閱按鈕 - 只在登入時顯示 -->
								<div v-if="isLoggedIn" class="borrow-section">
									<div class="user-info">
										<p class="current-user">
											登入用戶：{{ currentUser.name }}
										</p>
									</div>
									<button
										v-if="selectedBook.borrow == '0'"
										@click="borrowBook"
										class="borrow-btn"
									>
										借閱
									</button>
									<button
										v-else-if="
											selectedBook.borrow ===
											currentUser._id
										"
										@click="returnBook"
										class="return-btn"
									>
										歸還
									</button>
									<button v-else class="borrow-btn" disabled>
										已借出
									</button>
								</div>

								<!-- 未登入時顯示登入提示 -->
								<div v-else class="login-prompt">
									<router-link
										to="/join-us"
										class="login-link"
									>
										前往登入
									</router-link>
								</div>
							</div>
						</div>
					</transition>
				</div>
			</section>
		</div>
	</div>
</template>

<script>
import bookService from '../services/bookService'
import recordService from '../services/recordService'

export default {
	name: 'BooksView',
	data() {
		return {
			booksData: '',
			booksKey: [],
			selectedBook: null,
			selectedBookIndex: null,
			page: 1,
			containerWidth: 0,
			currentUser: null,
			isLoggedIn: false,
			searchQuery: '',
		}
	},
	computed: {
		filteredBooks() {
			if (!this.booksData || !this.searchQuery.trim()) {
				return this.booksData
			}

			const query = this.searchQuery.toLowerCase().trim()
			const filtered = {}

			Object.keys(this.booksData).forEach((key) => {
				const book = this.booksData[key]
				const searchText = [
					book.title,
					book.author,
					book.publisher,
					book.place,
				]
					.join(' ')
					.toLowerCase()

				if (searchText.includes(query)) {
					filtered[key] = book
				}
			})

			return filtered
		},
		gridColumns() {
			const imageWidth = this.containerWidth > 768 ? 250 : 200 // Fixed image width
			const gap = this.containerWidth * 0.02 // Gap between images
			const availableWidth = this.selectedBook
				? this.containerWidth * 0.7 // 50% width when details panel is visible
				: this.containerWidth // Full width otherwise
			const maxColumns = Math.floor(
				(availableWidth + gap) / (imageWidth + gap)
			)
			const columns = Math.max(2, Math.min(8, maxColumns)) // Between 2 and 8 columns
			return `repeat(${columns}, ${imageWidth}px)`
		},
	},
	watch: {
		'$route.query.bookId': {
			handler(newBookId) {
				if (newBookId) {
					this.openBookDetails(newBookId)
				}
			},
			immediate: true,
		},
	},
	methods: {
		selectBook(book, index) {
			this.selectedBook = book
			console.log(this.selectedBook)
			this.selectedBookIndex = index
		},
		updateContainerWidth() {
			if (this.$refs.container) {
				this.containerWidth = this.$refs.container.offsetWidth
			}
		},
		scrollToItem(index) {
			const bookItem = this.$refs[`bookItem-${index}`][0] // Get the DOM element
			if (bookItem) {
				bookItem.scrollIntoView({
					behavior: 'smooth',
				})
			}
		},
		closeDetails() {
			this.selectedBook = null
		},
		clearSearch() {
			this.searchQuery = ''
		},
		scrollToSelectedItem() {
			this.scrollToItem(this.selectedBookIndex)
		},
		checkLoginStatus() {
			const savedUser = localStorage.getItem('currentUser')
			const savedLoginStatus = localStorage.getItem('isLoggedIn')

			if (savedUser && savedLoginStatus === 'true') {
				this.isLoggedIn = true
				this.currentUser = JSON.parse(savedUser)
			}
		},
		openBookDetails(bookId) {
			// 根據書籍 ID 找到對應的書籍和索引
			if (this.booksData && bookId) {
				const bookIndex = Object.keys(this.booksData).find((key) => {
					const book = this.booksData[key]
					return book.isbn === bookId
				})

				if (bookIndex !== undefined) {
					this.selectedBook = this.booksData[bookIndex]
					this.selectedBookIndex = parseInt(bookIndex)

					// 滾動到對應的書籍
					this.$nextTick(() => {
						this.scrollToSelectedItem()
					})
				} else {
					console.warn('找不到指定的書籍:', bookId)
				}
			}
		},
		async borrowBook() {
			if (!this.isLoggedIn || !this.currentUser) {
				alert('請先登入才能借閱書籍')
				this.$router.push('/join-us')
				return
			}

			if (this.selectedBook.borrow !== '0') {
				alert('此書已被借出')
				return
			}

			try {
				// 創建借閱記錄
				const borrowRecord = {
					bookId: this.selectedBook.isbn,
					userId: this.currentUser._id, // 使用 _id 而不是 email
					userName: this.currentUser.name,
					bookTitle: this.selectedBook.title,
					borrowDate: new Date().toISOString().split('T')[0], // YYYY-MM-DD
					returnDate: null,
					status: 'borrowed',
				}

				// 發送借閱記錄到 records 集合
				await recordService.postRecord(JSON.stringify(borrowRecord))

				// 更新書籍狀態 - 這裡也使用 _id
				var updatedBook = {
					// ...this.selectedBook,
					borrow: this.currentUser._id,
				}

				await bookService.postBook(this.selectedBook._id, updatedBook)

				// 重新載入書籍數據
				this.booksData = await bookService.allBooks()
				this.booksKey = Object.keys(this.booksData)

				// 更新選中的書籍
				this.selectedBook.borrow = this.currentUser._id

				alert('借閱成功！')
			} catch (error) {
				console.error('借閱失敗:', error)
				alert('借閱失敗，請稍後再試')
			}
		},
		async returnBook() {
			if (!this.isLoggedIn || !this.currentUser) {
				alert('請先登入才能歸還書籍')
				return
			}

			if (this.selectedBook.borrow !== this.currentUser._id) {
				alert('您沒有借閱此書')
				return
			}

			try {
				// 找到對應的借閱記錄並更新狀態
				const records = await recordService.allRecords()
				const borrowRecord = records.find(
					(record) =>
						record.bookId === this.selectedBook.isbn &&
						record.userId === this.currentUser._id &&
						record.status === 'borrowed'
				)

				if (borrowRecord) {
					// 更新借閱記錄狀態
					await recordService.updateRecord(borrowRecord._id, {
						returnDate: new Date().toISOString().split('T')[0],
						status: 'returned',
					})
				}

				// 更新書籍狀態為可借閱
				var updatedBook = {
					// ...this.selectedBook,
					borrow: '0',
				}

				await bookService.postBook(this.selectedBook._id, updatedBook)

				// 重新載入書籍數據
				this.booksData = await bookService.allBooks()
				this.booksKey = Object.keys(this.booksData)

				// 更新選中的書籍
				this.selectedBook.borrow = '0'

				alert('歸還成功！')
			} catch (error) {
				console.error('歸還失敗:', error)
				alert('歸還失敗，請稍後再試')
			}
		},
	},
	async mounted() {
		this.checkLoginStatus()
		this.booksData = await bookService.allBooks()
		this.booksKey = Object.keys(this.booksData)
		this.updateContainerWidth()
		window.addEventListener('resize', this.updateContainerWidth)

		// 檢查是否有從路由傳入的書籍 ID（在書籍資料載入後）
		if (this.$route.query.bookId) {
			this.$nextTick(() => {
				this.openBookDetails(this.$route.query.bookId)
			})
		}
	},
	beforeUnmount() {
		window.removeEventListener('resize', this.updateContainerWidth)
	},
}
</script>

<style>
:root {
	--search_bar_height: 2vw;
	--animation-duration: 0.7s;
}
a {
	all: unset;
}
body {
	overflow-y: hidden;
}
.handleScroll {
	width: 100%;
	height: 100%;
	overflow-x: hidden;
	overflow-y: scroll;
}
.books-container {
	display: flex;
	flex-direction: column;
	overflow: hidden;
	width: 100%;
}

/* 搜尋功能樣式 */
.search-container {
	position: absolute;
	left: 0%;
	top: 15px;
	/* transform: translateX(-50%); */
	z-index: 20;
	margin: 0 auto 0 auto;
	padding: 0px 20px;
	/* background-color: rgba(51,51,51, 0.8); */
	backdrop-filter: blur(10px);
}
.search-container input {
	width: 100px;
	padding: 10px 20px;
	border-radius: 25px;
	border: 1px solid #ffffff;
	background-color: rgba(255, 255, 255, 0.1);
	color: #ffffff;
	font-family: 'JetBrains Mono', monospace;
	font-size: 16px;
	transition: width 0.3s ease;
	box-sizing: border-box;
}
.search-container input:focus {
	width: 400px;
}

.search-input {
	width: 100%;
	padding: 12px 16px;
	border: 1px solid #ffffff;
	border-radius: 25px;
	background: transparent;
	color: #ffffff;
	font-family: 'JetBrains Mono';
	font-size: 16px;
	outline: none;
	transition: all 0.3s ease;
	box-sizing: border-box;
}

.search-input::placeholder {
	color: rgba(255, 255, 255, 0.7);
}

.search-input:focus {
	background: rgba(255, 255, 255, 0.2);
	box-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
}

.search-clear {
	position: absolute;
	right: 30px;
	top: 50%;
	transform: translateY(-50%);
	width: 24px;
	height: 24px;
	background: rgba(255, 255, 255, 0.3);
	color: #ffffff;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	font-size: 16px;
	transition: background 0.3s ease;
}

.search-clear:hover {
	background: rgba(255, 255, 255, 0.5);
}
.grid-wrapper {
	width: 100%;
	height: 100%;
	overflow-x: auto;
	overflow-y: auto;
	transition: width 0.5s ease;
}
.grid-wrapper.with-details {
	width: 70%; /* Shrinks to half when details panel appears on desktop */
}
.product-list {
	display: grid;
	gap: 2vw 3vw;
	justify-content: center;
	width: 100%;
	padding: 4vw 5vw;
	box-sizing: border-box;
	transition: grid-template-columns 0.5s ease;
}
button {
	all: unset;
}
.product-card {
	display: grid;
	grid-template-columns: 1fr;
	grid-template-rows: 80% 20%;
	background: #333;
	padding: 1vw;
	text-align: center;
	box-shadow: 0 0.3vw 0.6vw rgba(0, 0, 0, 0.1);
	border-radius: 0.5vw;
	transition: transform 0.3s ease, box-shadow 0.3s ease;
	overflow: hidden;
	aspect-ratio: 3 / 4;
	margin-bottom: 1vw;
	text-decoration: none;
	position: relative;
}
.product-card:hover {
	transform: translateY(-0.5vw);
	box-shadow: 0 0.5vw 1vw rgba(0, 0, 0, 0.2);
}
.product-thumbnail {
	width: 85%;
	aspect-ratio: 1 / 1;
	overflow: hidden;
	margin: 1vw 0;
	border-radius: 0.5vw;
	flex-shrink: 0;
	position: relative;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
}
.product-thumbnail img {
	width: 100%;
	height: 100%;
	object-fit: contain;
	max-width: 100%;
	max-height: 100%;
}
.product-title {
	width: 100%;
	margin-bottom: 0;
	padding: 0;
	font-size: 1rem;
	font-weight: 500;
	color: white;
	line-height: 1.4;
	text-transform: capitalize;
	position: relative;
}
.product-title .text {
	top: 50%;
	position: relative;
	transform: translateY(-50%);
}

/* Details Panel */
.details-panel {
	position: absolute;
	top: 0;
	right: 0;
	width: 30%;
	height: 100%;
	/* background: rgba(211, 211, 211, 1); */
	background: #333;
	box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
	overflow-y: auto;
	z-index: 10;
}
.details-content {
	padding: 20px;
}
.large-image {
	width: 100%;
	max-height: 60vh;
	object-fit: contain;
	border-radius: 4px;
}
h2 {
	font-size: 1.5rem;
	margin: 10px 0;
	color: #ffffff;
}
p {
	font-size: 1rem;
	color: #ffffff;
}
.close-btn {
	position: absolute;
	top: 10px;
	right: 10px;
	width: 30px;
	height: 30px;
	font-size: 20px;
	background: rgba(0, 0, 0, 0.3);
	color: rgb(255, 255, 255);
	text-align: center;
	border: 1px solid #ffffff;
	border-radius: 50%;
	cursor: pointer;
	box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}
.close-btn:hover {
	transform: scale(1.05);
}
/* Add to style section */
.borrow-section {
	margin-top: 20px;
	display: flex;
	flex-direction: column;
	gap: 10px;
}

.user-info {
	margin-bottom: 10px;
}

.current-user {
	font-size: 0.9rem;
	color: #ffffff;
	margin: 0;
}

.login-prompt {
	text-align: center;
	padding: 10px;
	background: transparent;
}

.login-link {
	display: inline-block;
	width: 90%;
	padding: 10px;
	background: transparent;
	color: rgb(255, 255, 255);
	border: 1px solid #ffffff;
	text-decoration: none;
	border-radius: 25px;
	font-family: 'JetBrains Mono';
	font-size: 14px;
	font-weight: 500;
	text-align: center;
	position: relative;
	left: 50%;
	transform: translateX(-50%);
	transition: background-color 0.3s, transform 0.1s ease, box-shadow 0.3s;
}

.login-link:hover {
	transform: translateX(-50%) scale(1.02);
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.user-id-input {
	padding: 10px;
	width: 90%;
	border: 1px solid #ddd;
	border-radius: 25px;
	font-family: 'JetBrains Mono';
	font-size: 14px;
	position: relative;
	left: 50%;
	transform: translateX(-50%);
}

.borrow-btn {
	width: 90%; /* Slightly less than half to account for spacing */
	padding: 10px;
	background: transparent;
	color: rgb(255, 255, 255);
	/* border: 1px solid black; */
	border-radius: 25px;
	font-family: 'JetBrains Mono';
	font-size: 14px;
	font-weight: 500;
	cursor: pointer;
	text-align: center;
	position: relative;
	left: 50%;
	transform: translateX(-50%);
	border: 1px solid #ffffff;
	transition: background-color 0.3s, transform 0.1s ease, box-shadow 0.3s;
}

.borrow-btn:hover:not(:disabled) {
	transform: translateX(-50%) scale(1.02);
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.borrow-btn:disabled {
	background-color: #ccc;
	cursor: not-allowed;
}

.return-btn {
	width: 90%;
	padding: 10px;
	background: transparent;
	color: rgb(255, 255, 255);
	border: 1px solid #ffffff;
	border-radius: 25px;
	font-family: 'JetBrains Mono';
	font-size: 14px;
	font-weight: 500;
	cursor: pointer;
	text-align: center;
	position: relative;
	left: 50%;
	transform: translateX(-50%);
	transition: background-color 0.3s, transform 0.1s ease, box-shadow 0.3s;
}

.return-btn:hover {
	transform: translateX(-50%) scale(1.02);
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

/* Adjust mobile styles */
@media (max-width: 768px) {
	.borrow-section {
		margin-top: 15px;
		gap: 8px;
	}

	.user-id-input {
		padding: 6px;
		font-size: 0.9rem;
	}

	.borrow-btn {
		padding: 8px;
		font-size: 0.9rem;
	}
}

/* Transitions */
.details-slide-enter-active,
.details-slide-leave-active {
	transition: transform 0.5s ease, opacity 0.5s ease;
}
.details-slide-enter-from,
.details-slide-leave-to {
	transform: translateX(100%);
	opacity: 0;
}
.details-slide-enter-to,
.details-slide-leave-from {
	transform: translateX(0);
	opacity: 1;
}

/* Mobile Styles (Hover-like Overlay) */
@media (max-width: 768px) {
	.grid-wrapper.with-details {
		width: 100%; /* Full width on mobile, no shrinking */
	}
	.details-panel {
		position: fixed; /* Fixed position to overlay the screen */
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%); /* Center the panel */
		width: 90%; /* Almost full width */
		max-height: 90vh; /* Limit height */
		border-radius: 10px; /* Rounded corners */
		box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
		background-color: rgba(51, 51, 51, 0.9);
		z-index: 1000; /* Higher z-index to ensure it’s on top */
	}
	.details-slide-enter-from,
	.details-slide-leave-to {
		transform: translate(-50%, -50%) scale(0.8); /* Scale down when entering/leaving */
		opacity: 0;
	}
	.details-slide-enter-to,
	.details-slide-leave-from {
		transform: translate(-50%, -50%) scale(1); /* Normal size when visible */
		opacity: 1;
	}
	.details-content {
		padding: 15px;
	}
	.large-image {
		max-height: 50vh; /* Smaller image on mobile */
	}
	.close-btn {
		top: 5px;
		right: 5px;
	}
}
</style>
