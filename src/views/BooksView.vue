<template>
	<!-- bookshelf.html -->
	<div class="handleScroll">
		<div class="grid-container" id="split-container">
			<section id="bookshelf">
				<div class="books-container">
					<div class="product-list">
						<button
							class="product-card"
							v-for="(book, index) in booksData"
							:key="book"
						>
							<div class="product-thumbnail">
								<img loading="lazy" :src="book.cover" />
							</div>

							<div class="product-title">
								<div class="text">{{ book.title }}</div>
							</div>
						</button>
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
						s		>{{ page_current }}</a
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
import booksData from "@/assets/BooksData/Books.json"
export default {
	name: "BooksView",
	data() {
		return {
			booksData,
			booksKey: Object.keys(booksData),
			page: 1,
		}
	},
	methods: {},
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
}

/*books ----------------------------------------------------------------------------------- */
.product-list {
	display: grid;
	grid-template-columns: repeat(
		auto-fit,
		minmax(15rem, 1fr)
	); /* Automatically adjusts the number of columns */
	gap: 2vw 3vw; /* Horizontal and vertical space */
	justify-content: center; /* Center the grid within the container */
	width: 100%;
	padding: 4vw 5vw; /* Padding */
	box-sizing: border-box; /* Includes padding in the element's width/height */
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
</style>
