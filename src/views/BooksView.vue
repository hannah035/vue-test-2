<template>
	<div class="handleScroll">
		<div class="grid-container" id="split-container">
			<section id="bookshelf">
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
								v-for="(book, index) in booksData"
								:key="index"
								:ref="`bookItem-${index}`"
								@click="selectBook(book, index)"
							>
								<div class="product-thumbnail">
									<img
										loading="lazy"
										:src="JSON.parse(book).cover"
									/>
								</div>
								<div class="product-title">
									<div class="text">
										{{ JSON.parse(book).title }}
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
									:src="JSON.parse(selectedBook).cover"
									:alt="JSON.parse(selectedBook).title"
									class="large-image"
								/>
								<h2>{{ JSON.parse(selectedBook).title }}</h2>
								<p>
									作者：{{ JSON.parse(selectedBook).author }}
								</p>
								<p>
									出版社：{{
										JSON.parse(selectedBook).publisher
									}}
								</p>
								<p>
									位置：{{ JSON.parse(selectedBook).place }}
								</p>
								<p
									v-if="
										JSON.parse(selectedBook).borrow == '0'
									"
								>
									狀態：可借閱
								</p>
								<p v-else>狀態：不可借閱</p>
								<!-- TODO: borrow form -->
								<div class="borrow-section">
									<input
										type="text"
										id="userId"
										v-model="userId"
										placeholder="請輸入您的用戶ID"
										class="user-id-input"
									/>
									<button
										@click="sendBorrowRequest"
										class="borrow-btn"
									>
										借閱
									</button>
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
import bookService from "../services/bookService"
import { validUsers } from "@/assets/BooksData/validUser"

export default {
	name: "BooksView",
	data() {
		return {
			booksData: "",
			booksKey: [],
			selectedBook: null,
			selectedBookIndex: null,
			page: 1,
			containerWidth: 0,
			userId: "",
		}
	},
	computed: {
		gridColumns() {
			
			const imageWidth = this.containerWidth>768 ? 250 : 200 // Fixed image width
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
	methods: {
		selectBook(book, index) {
			this.selectedBook = book
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
					behavior: "smooth",
				})
			}
		},
		closeDetails() {
			this.selectedBook = null
		},
		scrollToSelectedItem() {
			this.scrollToItem(this.selectedBookIndex)
		},
		async sendBorrowRequest() {
			if (!validUsers.includes(this.userId)) return
			var newBook = {
				isbn: JSON.parse(this.selectedBook).isbn,
				title: JSON.parse(this.selectedBook).title,
				cover: JSON.parse(this.selectedBook).cover,
				author: JSON.parse(this.selectedBook).author,
				publisher: JSON.parse(this.selectedBook).publisher,
				date: JSON.parse(this.selectedBook).data,
				place: JSON.parse(this.selectedBook).place,
				borrow: this.userId,
			}
			await bookService.postBook(
				this.selectedBookIndex,
				JSON.stringify(newBook)
			)
			this.booksData = await bookService.allBooks()
			this.booksKey = Object.keys(this.booksData)
			this.userId = ""
			this.closeDetails()
		},
	},
	async mounted() {
		this.booksData = await bookService.allBooks()
		this.booksKey = Object.keys(this.booksData)
		this.updateContainerWidth()
		window.addEventListener("resize", this.updateContainerWidth)
	},
	beforeUnmount() {
		window.removeEventListener("resize", this.updateContainerWidth)
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
	background: rgba(255, 255, 255, 0.2);
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
	background: rgba(211, 211, 211, 1);
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
	color: #202124;
}
p {
	font-size: 1rem;
	color: #4d5156;
}
.close-btn {
	position: absolute;
	top: 10px;
	right: 10px;
	width: 30px;
	height: 30px;
	font-size: 20px;
	background: #fff;
	color: black;
	text-align: center;
	border: none;
	border-radius: 50%;
	cursor: pointer;
	box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}
.close-btn:hover {
	background: #f1f3f4;
}
/* Add to style section */
.borrow-section {
	margin-top: 20px;
	display: flex;
	flex-direction: column;
	gap: 10px;
}

.user-id-input {
	padding: 10px;
	width: 90%;
	border: 1px solid #ddd;
	border-radius: 25px;
	font-family: "JetBrains Mono";
	font-size: 14px;
	position: relative;
	left: 50%;
	transform: translateX(-50%);
}

.borrow-btn {
	width: 90%; /* Slightly less than half to account for spacing */
	padding: 10px;
	background-color: #f5a623;
	color: white;
	border: none;
	border-radius: 25px;
	font-family: "JetBrains Mono";
	font-size: 14px;
	font-weight: 500;
	cursor: pointer;
	text-align: center;
	position: relative;
	left: 50%;
	transform: translateX(-50%);
}

.borrow-btn:hover {
	background-color: #e69520;
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
		background: rgba(211, 211, 211, 0.95); /* Semi-transparent background */
		border-radius: 10px; /* Rounded corners */
		box-shadow: 0 0 15px rgba(0, 0, 0, 0.3); /* Stronger shadow for depth */
		z-index: 100; /* Higher z-index to ensure it’s on top */
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
