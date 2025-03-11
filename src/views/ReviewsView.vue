<template>
	<div class="handleScroll">
		<div class="reviews-container">
			<div class="sep-line"></div>
			<div class="review-item">
				<template v-for="(format, index) in Formats" :key="index">
					<div class="work-format" :id="format">
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
		<!-- Add Review Button -->
		<button class="add-review-btn" @click="toggleReviewForm">
			{{ showReviewForm ? "Close" : "Add Review" }}
		</button>
		<!-- Floating Review Form -->
		<div v-if="showReviewForm" class="review-form-floating">
			<div class="review-form-content">
				<h3>New Review</h3>
				<p class="form-subtitle">Leave a review for a category</p>
				<div class="category-selector">
					<div
						v-for="format in Formats"
						:key="format"
						:class="[
							'category-option',
							{ active: newReview.format === format },
						]"
						@click="selectFormat(format)"
					>
						<div class="category-circle">
							{{ format }}
						</div>
					</div>
				</div>
				<div class="form-inputs">
					<label>Review Title</label>
					<input
						v-model="newReview.title"
						placeholder="Enter review title"
					/>
					<label>Review Content</label>
					<textarea
						v-model="newReview.description"
						placeholder="Write your review..."
					></textarea>
				</div>
				<div class="button-container">
					<button class="submit-btn" @click="submitReview">
						Submit
					</button>
					<button class="cancel-btn" @click="toggleReviewForm">
						Cancel
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import reviewsData from "../assets/ReviewsData/Reviews.json"
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
			showReviewForm: false,
			newReview: {
				format: "",
				title: "",
				description: "",
			},
		}
	},
	methods: {
		toggleReviewForm() {
			this.showReviewForm = !this.showReviewForm
			// Reset form when closing
			if (!this.showReviewForm) {
				this.newReview = {
					format: "",
					title: "",
					description: "",
				}
			}
		},
		selectFormat(format) {
			this.newReview.format = format
		},
		submitReview() {
			if (
				this.newReview.format &&
				this.newReview.title &&
				this.newReview.description
			) {
				// Add the new review to the Reviews object
				if (!this.Reviews[this.newReview.format]) {
					this.Reviews[this.newReview.format] = []
				}
				this.Reviews[this.newReview.format].push({
					title: this.newReview.title,
					description: this.newReview.description,
				})
				this.toggleReviewForm()
			} else {
				this.toggleReviewForm()
				this.error = "Please fill in all fields"
			}
		},
	},
}
</script>

<style scoped>
/* Existing styles */
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
	/* TODO: set width in mounted */
	height: 1px;
	background-color: white;
	top: 15%;
	position: absolute;
	left: 63.2px;
}
.work-format {
	grid-column: span 4;
	grid-row: 1 / 2;
	height: 100%;
	position: relative;
}
.format-label {
	height: 30%;
	width: fit-content;
	padding: 10px;
	position: sticky;
	top: 35px;
	left: 7%;
	font-size: large;
}

.review-item {
	height: 100%;
	width: min-content;
	display: grid;
	grid-template-columns: repeat(8, 1fr);
	grid-template-rows: 15% 85%;
	column-gap: 20px;
	padding: 0 63.2px;
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

/* Updated styles for the button and floating form */
.add-review-btn {
	position: sticky;
	bottom: 10px;
	left: 95%;
	transform: translateX(-100%);
	padding: 10px 20px;
	background-color: rgba(255, 255, 255, 0.2);
	backdrop-filter: blur(10px);
	border: none;
	border-radius: 25px;
	color: white;
	cursor: pointer;
	font-family: "JetBrains Mono";
	font-size: medium;
	z-index: 1000;
}
@media (max-width: 768px) {
	.add-review-btn {
		left: 90%;
	}
}

.add-review-btn:hover {
	background-color: rgba(255, 255, 255, 0.3);
}

.review-form-floating {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 1000;
}

.review-form-content {
	background: white;
	padding: 20px;
	border-radius: 15px;
	width: 90%;
	max-width: 400px;
	color: black;
	font-family: "JetBrains Mono";
}

.review-form-content h3 {
	margin: 0;
	font-size: 20px;
	font-weight: 600;
}

.form-subtitle {
	margin: 5px 0 15px;
	font-size: 14px;
	color: #666;
}

.category-selector {
	display: flex;
	justify-content: space-around;
	margin-bottom: 20px;
}

.category-option {
	display: flex;
	flex-direction: column;
	align-items: center;
	cursor: pointer;
}

.category-circle {
	width: 150px;
	height: 40px;
	border-radius: 20px;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 18px;
	font-weight: 600;
	margin-bottom: 5px;
	box-sizing: border-box;
}

.category-option span {
	font-size: 12px;
}

.category-option:not(.active) .category-circle {
	background-color: #f0f0f0;
}

.category-option.active .category-circle {
	background-color: #e0e7ff;
	border: 2px solid #f5a623;
}

.form-inputs {
	display: flex;
	flex-direction: column;
	gap: 10px;
}

.form-inputs label {
	font-size: 14px;
	font-weight: 500;
}

.form-inputs input,
.form-inputs textarea {
	padding: 10px;
	border: 1px solid #ddd;
	border-radius: 8px;
	font-family: "JetBrains Mono";
	font-size: 14px;
	left: 20px; /* Ensure full width */
}

.form-inputs textarea {
	height: 80px;
	resize: none;
}

.button-container {
	display: flex;
	justify-content: space-around; /* Evenly space the buttons */
	margin-top: 15px;
}

.submit-btn {
	width: 35%; /* Slightly less than half to account for spacing */
	padding: 12px;
	background-color: #f5a623;
	color: white;
	border: none;
	border-radius: 25px;
	font-family: "JetBrains Mono";
	font-size: 16px;
	font-weight: 500;
	cursor: pointer;
	text-align: center;
}

.submit-btn:hover {
	background-color: #e69520;
}

.cancel-btn {
	width: 35%; /* Slightly less than half to account for spacing */
	padding: 12px;
	background-color: #818181;
	color: white;
	border: none;
	border-radius: 25px;
	font-family: "JetBrains Mono";
	font-size: 16px;
	font-weight: 500;
	cursor: pointer;
	text-align: center;
}

.cancel-btn:hover {
	background-color: #666;
}
</style>
