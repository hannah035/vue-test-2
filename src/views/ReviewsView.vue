<template>
	<!-- <div class="create-post">
		<input type="text" id="author" placeholder="author" v-model="author" />
		<div class="rate-selector-container">
			<div
				class="rate-selector"
				v-for="selectorIndex in 5"
				v-bind:key="selectorIndex"
			>
				<img
					v-if="selectorIndex <= this.rate"
					v-on:click="selectRate(selectorIndex)"
					class="star-logo on star-selector"
					src="../assets/rate_star/rate_star.001.png"
				/>

				<img
					v-else
					class="star-logo off star-selector"
					v-on:click="selectRate(selectorIndex)"
					src="../assets/rate_star/rate_star.002.png"
				/>
			</div>
			<br />
		</div>
		<input type="text" id="text" placeholder="text" v-model="text" />
		<button>Post!</button>
		TODO:  v-on:click="createPost"    in button
	</div> -->
	<div class="handleScroll">
		<div class="reviews-container">
			<div class="sep-line"></div>
			<div class="review-item">
				<template v-for="(format, index) in Formats" :key="index">
					<div class="work-format" id="{{ format }}">
						<div class="format-label">{{ format }}</div>
					</div>
					<div
						class="review-card"
						v-for="(review, index) in Reviews[format]"
						:key="index"
					>
						<div class="review-header">
							<div class="review-title">{{ review.title }}</div>
						</div>
						<div class="review-body">
							<div class="review-description">
								{{ review.description }}
							</div>
						</div>
					</div>
				</template>
			</div>
		</div>
	</div>
</template>
<script>
import reviewsData from "@/assets/ReviewsData/Reviews.json"
export default {
	name: "ReviewsView",
	data() {
		return {
			Reviews: reviewsData,
			Formats: Object.keys(reviewsData),
			error: "",
			rate: 0,
			author: "",
			text: "",
		}
	},
	methods: {
		async selectRate(rate) {
			this.rate = rate
		},
	},
}
</script>
<style scoped>
/* rate style */
.rate-container {
	width: auto;
	height: auto;
	float: right;
}
.rate-container img {
	float: left;
}
.rate-selector-container {
	width: auto;
	height: auto;
	left: 50%;
	position: relative;
}
.rate-selector {
	float: left;
}
.star-logo {
	width: 15px;
	height: 15px;
}

.handleScroll {
	height: 100%;
	width: 100%;
	position: relative;
	overflow-x: scroll;
	overflow-y: hidden;
}

.reviews-container {
	height: 100%;
	position: relative;
	width: fit-content;
}
.sep-line {
	width: calc(100% - 63.2px);
	/* TODO change line width */
	height: 1px;
	background-color: white;
	top: 15%;
	position: absolute;
	left: 63.2px;
	/* TODO: change left */
}
.work-format {
	grid-column: span 4;
	grid-row: 1 / 2;
	height: 100%;
	position: relative;
	/* TODO: fade out animation */
}
.format-label {
	height: 30%;
	width: fit-content;
	padding: 10px;
	/* TODO: change padding */
	position: sticky;
	top: 35px;
	/* TODO: change top */
	left: 7%;
	/* TODO: change left */
	font-size: large;
	/* TODO : change font size */
}

.review-item {
	height: 100%;
	width: min-content;
	/* background-color: blue; */
	display: grid;
	grid-template-columns: repeat(8, 1fr);
	grid-template-rows: 15% 85%;

	column-gap: 20px;
	/* TODO change gap (and padding) */
	padding: 0 63.2px;
	/* TODO change padding */
}

.review-card {
	background: rgba(255, 255, 255, 0.2);
	backdrop-filter: blur(10px);
	height: 83%;
	aspect-ratio: 62/100;
	position: relative;
	top: 5%;
	border-radius: 15px;
	padding: 6% 10%;
	box-sizing: border-box;
	/*TODO: change padding to relative unit*/

	display: grid;
	gap: 4%;
	grid-template-rows: 7% 93%;
}
.review-title {
	height: 100%;
	font-size: large;
	color: #fff;
	font-family: "JetBrains Mono";
	font-style: normal;
	font-weight: 400;
}
.review-description {
	font-size: large;
	color: #fff;
	font-family: "JetBrains Mono";
	font-style: normal;
	font-weight: 400;
}
</style>
