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
								<p>{{ JSON.parse(selectedBook).author }}</p>
							</div>
						</div>
					</transition>

					<!-- sep -->
					<div class="container" ref="container">
						<!-- Grid View (always visible, adjusts columns dynamically) -->
						<div
							class="grid-wrapper"
							ref="gridWrapper"
							:class="{ 'with-details': selectedImage }"
						>
							<div
								class="grid-view"
								:style="{ gridTemplateColumns: gridColumns }"
							>
								<div
									v-for="(image, index) in images"
									:key="index"
									class="grid-item"
									:ref="`gridItem-${index}`"
									@click="selectImage(image, index)"
								>
									<img :src="image.src" :alt="image.title" />
								</div>
							</div>
						</div>

						<!-- Details Panel (slides in from right) -->
						<transition name="details-slide">
							<div v-if="selectedImage" class="details-panel">
								<div class="details-content">
									<button
										@click="closeDetails()"
										class="close-btn"
									>
										×
									</button>
									<img
										:src="selectedImage.src"
										:alt="selectedImage.title"
										class="large-image"
									/>
									<h2>{{ selectedImage.title }}</h2>
									<p>{{ selectedImage.description }}</p>
								</div>
							</div>
						</transition>
					</div>
					<!-- <div class="pagination-container">
                        <div class="pagination">
                            {% if page_current != page_start %}
                            <a
                                class="pagination-np"
                                href="{{ url_for('bookshelf', page=page_current-1) }}"
                                >Previous</a
                            >
                            {% endif %} {% if page_current == page_start %}
                            <a
                                class="pagination-number active"
                                href="{{ url_for('bookshelf', page=page_start) }}"
                                >{{ page_start }}</a
                            >
                            {% if page_start+1 <= page_end %}
                            <a
                                class="pagination-number"
                                href="{{ url_for('bookshelf', page=page_start+1) }}"
                                >{{ page_start + 1 }}</a
                            >
                            {% endif %} {% if page_start+2 <= page_end %}
                            <a
                                class="pagination-number"
                                href="{{ url_for('bookshelf', page=page_start+2) }}"
                                >{{ page_start + 2 }}</a
                            >
                            {% endif %} {% elif page_current == page_end %} {%
                            if page_end-2 >= page_start %}
                            <a
                                class="pagination-number"
                                href="{{ url_for('bookshelf', page=page_end-2) }}"
                                >{{ page_end - 2 }}</a
                            >
                            {% endif %} {% if page_end-1 >= page_start %}
                            <a
                                class="pagination-number"
                                href="{{ url_for('bookshelf', page=page_end-2) }}"
                                >{{ page_end - 1 }}</a
                            >
                            {% endif %}
                            <a
                                class="pagination-number active"
                                href="{{ url_for('bookshelf', page=page_end) }}"
                                >{{ page_end }}</a
                            >
                            {% else %}
                            <a
                                class="pagination-number"
                                href="{{ url_for('bookshelf', page=page_current-1) }}"
                                >{{ page_current - 1 }}</a
                            >
                            <a
                                class="pagination-number active"
                                href="{{ url_for('bookshelf', page=page_current) }}"
                                s
                                >{{ page_current }}</a
                            >
                            <a
                                class="pagination-number"
                                href="{{ url_for('bookshelf', page=page_current+1) }}"
                                >{{ page_current + 1 }}</a
                            >
                            {% endif %} {% if page_current != page_end%}
                            <a
                                class="pagination-np"
                                href="{{ url_for('bookshelf', page=page_current+1) }}"
                                >Next</a
                            >
                            {% endif %}
                        </div>
                    </div> -->
				</div>
			</section>
		</div>
	</div>
</template>
<script>
import { nextTick } from "vue"
import bookService from "../services/bookService"
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
		}
	},
	computed: {
		gridColumns() {
			const imageWidth = 250 // Fixed image width
			const gap = this.containerWidth * 0.02 // Gap between images
			const availableWidth = this.selectedBook
				? this.containerWidth * 0.5 // 50% width when details panel is visible
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
			if (this.$refs.container)
				this.containerWidth = this.$refs.container.offsetWidth
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
	},
	async mounted() {
		this.booksData = await bookService.allBooks()
		this.booksKey = Object.keys(this.booksData)
		this.updateContainerWidth()
		window.addEventListener("resize", this.updateContainerWidth)
		const detailsSlide = document.querySelector("")
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
	width: 50%; /* Shrinks to half when details panel appears */
}

/*books ----------------------------------------------------------------------------------- */
.product-list {
	display: grid;
	/* grid-template-columns: repeat(
        auto-fit,
        minmax(15rem, 1fr)
    );  */
	gap: 2vw 3vw; /* Horizontal and vertical space */
	justify-content: center; /* Center the grid within the container */
	width: 100%;
	padding: 4vw 5vw; /* Padding */
	box-sizing: border-box; /* Includes padding in the element's width/height */
	transition: grid-template-columns 0.5s ease; /* Smooth column adjustment */
}
button {
	all: unset;
}
.product-card {
	display: grid;
	grid-template-columns: 1fr;
	grid-template-rows: 80% 20%;
	background: rgba(255, 255, 255, 0.2);
	padding: 1vw; /* Padding inside the card */
	text-align: center;
	box-shadow: 0 0.3vw 0.6vw rgba(0, 0, 0, 0.1); /* Softer shadow */
	border-radius: 0.5vw; /* Smoother corners */
	transition: transform 0.3s ease, box-shadow 0.3s ease; /* Hover effects */
	overflow: hidden; /* Ensure content stays within bounds */
	aspect-ratio: 3 / 4; /* Maintain consistent card aspect ratio */
	margin-bottom: 1vw; /* Reduced margin-bottom for smaller space under the card */
	text-decoration: none; /* Remove underline from title */
	position: relative;
}

.product-card:hover {
	transform: translateY(-0.5vw); /* Lift on hover */
	box-shadow: 0 0.5vw 1vw rgba(0, 0, 0, 0.2); /* Enhanced shadow on hover */
}

.product-thumbnail {
	width: 85%; /* 85% of the card width */
	aspect-ratio: 1 / 1;
	overflow: hidden;
	margin: 1vw 0; /* Space around the thumbnail */
	border-radius: 0.5vw; /* Rounded corners */
	flex-shrink: 0; /* Prevent shrinking */
	position: relative;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
}
.product-thumbnail img {
	width: 100%;
	height: 100%;
	object-fit: contain;
	max-width: 100%; /* Constrain the image's width to the parent div */
	max-height: 100%; /* Constrain the image's height to the parent div */
}

.product-title {
	width: 100%;
	margin-bottom: 0; /* Remove bottom margin */
	padding: 0; /* Remove padding */
	font-size: 1rem; /* Font size based on rem */
	font-weight: 500;
	color: white; /* Slightly darker text for better readability */
	line-height: 1.4; /* Improved line-height for readability */
	text-transform: capitalize; /* Capitalize each word */
	position: relative;
}
.product-title .text {
	top: 50%;
	position: relative;
	transform: translateY(-50%);
}

/*pagination ---------------------------------------------------------------------------------------------------- */
.pagination-container {
	display: flex;
	justify-content: center;
	width: 100%;
}

.pagination {
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 2rem;
	padding-top: 3vh;
	font-size: 1.6rem;
	font-weight: 400;
	max-width: 100%;
}
.pagination a {
	display: block;
	text-decoration: none;
}

@media (max-width: 991px) {
	.pagination {
		margin-top: 4vh;
	}
}

.pagination-number,
.pagination-np {
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 1rem 2rem;
	border-radius: 1rem;
	background-color: rgba(249, 241, 231, 1);
	color: black;
	cursor: pointer;
}

.pagination-number.active {
	background-color: #b88e2f;
	color: white;
}

@media (max-width: 991px) {
	.pagination-number,
	.pagination-next {
		padding: 0.8rem 1.6rem;
		white-space: initial;
	}
}

/* Details Panel */
.details-panel {
	position: absolute;
	top: 0;
	right: 0;
	width: 50%;
	height: 100%;
	background: #fff;
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
	border: none;
	border-radius: 50%;
	cursor: pointer;
	box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}

.close-btn:hover {
	background: #f1f3f4;
}

/* Transitions */
.details-slide-enter-active,
.details-slide-leave-active {
	transition: transform 0.5s ease;
}

.details-slide-enter-from,
.details-slide-leave-to {
	transform: translateX(100%); /* Slide in from right */
}

.details-slide-enter-to,
.details-slide-leave-from {
	transform: translateX(0);
}
</style>
