<template>
	<div class="create-post">
		<input type="text" id="author" placeholder="author" v-model="author" />
		<!--TODO:   -->
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
				<!--TODO:  -->

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
		<!--TODO:    in input -->
		<button>Post!</button>
		<!--TODO:  v-on:click="createPost"    in button -->
	</div>
</template>
<script>
export default {
	name: "ReviewsComponent",
	data() {
		return {
			reviews: {},
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
h3 {
	margin: 40px 0 0;
}
ul {
	list-style-type: none;
	padding: 0;
}
li {
	display: inline-block;
	margin: 0 10px;
}
a {
	color: #42b983;
}
button {
	background-color: beige;
	margin: 5px;
	border: none;
	border-radius: 2px;
}
.create-post {
  position: relative;
  top: 100px;
}
.container {
	width: 100%;
	height: 100%;
}
.post-container {
	width: 50vw;
	position: relative;
	left: 50%;
	transform: translateX(-50%);
	height: fit-content;
}
.post {
	color: black;
	width: 100%;
	height: 15vh;
	border: black solid 2px;
	position: relative;
	margin-top: 10px;
	border-radius: 10px;
}
.post .text {
	position: relative;
	top: 50%;
	transform: translateY(-50%);
	margin: 0;
}
.post button {
	position: absolute;
	bottom: 5px;
}
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
</style>
