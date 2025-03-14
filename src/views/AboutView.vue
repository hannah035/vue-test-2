<template>
	<div class="handleScroll" v-on:scroll="lightUp">
		<div class="start">
			<div class="title-text">星艦學院科幻社簡史</div>
		</div>

		<div id="time-line">
			<div id="time-line-background"></div>
			<div class="cover-up"></div>
			<div id="time-line-progress">
				<div class="time-line-progress-bar"></div>
			</div>
			<div class="container">
				<template v-for="index in indexList" :key="index">
					<div class="grid">
						<div class="time-line-left">
							<div
								class="time-line-left-text textDark historyText"
							>
								{{ aboutData[index].tenure }}<br />
								{{ aboutData[index].name }}
							</div>
						</div>
						<div class="time-line-dot">
							<div class="dot dotDark"></div>
						</div>
						<div class="time-line-right">
							<div
								class="time-line-right-text textDark historyText"
							>
								<span class="president">{{
									aboutData[index].term
								}}</span
								><br /><br />
								<template
									v-for="event in aboutData[index].event"
									:key="event"
								>
									<a
										:href="event.url"
										v-if="event.url != 'null'"
										>{{ event.title }}</a
									>
									<template v-else>
										{{ event.title }}</template
									>
									<br />
								</template>
							</div>
						</div>
						<div class="empty"></div>
					</div>
				</template>
			</div>

			<div class="cover-down"></div>
		</div>
		<!-- TODO: update history to latests -->
		<div class="end">
			<div class="title-text">TO BE CONTINUED . . .</div>
		</div>
	</div>
</template>
<script>
import aboutData from "../assets/AboutData/About"
export default {
	mounted() {
		this.initAttributes()
	},
	data() {
		var indexList = Object.keys(aboutData).sort()
		return {
			indexList,
			aboutData,
		}
	},
	methods: {
		lightUp() {
			var dotDarks = document.querySelectorAll(".dot")
			var textDarks = document.querySelectorAll(".historyText")

			const colorStart = 127

			const viewTop = document
				.querySelector(".handleScroll")
				.getBoundingClientRect().top
			// set gradient color for text
			for (var i = 0; i < dotDarks.length; i++) {
				var viewHeight =
					document.querySelector(".handleScroll").clientHeight
				var elementTop =
					textDarks[2 * i + 1].getBoundingClientRect().top
				var elementBottom =
					textDarks[2 * i + 1].getBoundingClientRect().bottom
				var elementVisible = viewHeight / 2
				var range = Math.abs(elementBottom - elementTop)
				var rightText = textDarks[2 * i + 1]
				var grad = Math.max(
					Math.min(
						viewHeight - elementVisible - elementTop + viewTop,
						range
					),
					0
				)
				var div = 1
				var r = ((255 / div - colorStart) * grad) / range + colorStart
				var g = ((255 / div - colorStart) * grad) / range + colorStart
				var b = ((255 / div - colorStart) * grad) / range + colorStart
				if (elementTop < viewHeight - elementVisible + viewTop) {
					dotDarks[i].style.backgroundColor = `rgb(${r},${g},${b})`
					textDarks[2 * i].style.color = `rgb(${r},${g},${b})`
					textDarks[2 * i + 1].style.color = `rgb(${r},${g},${b})`
					rightText.classList.add("fadeRight")
				} else {
					dotDarks[
						i
					].style.backgroundColor = `rgb(${colorStart},${colorStart},${colorStart})`
					textDarks[
						2 * i
					].style.color = `rgb(${colorStart},${colorStart},${colorStart})`
					textDarks[
						2 * i + 1
					].style.color = `rgb(${colorStart},${colorStart},${colorStart})`
					rightText.classList.remove("fadeRight")
				}
			}
		},
		initAttributes() {
			//Set time-line height
			const dots = document.querySelectorAll(".dot")
			const top = dots[0].getBoundingClientRect().top
			const bottom = dots[dots.length - 1].getBoundingClientRect().bottom
			const height = Math.abs(bottom - top)
			const extraSpace = 700
			document.getElementById("time-line").style.height =
				height + extraSpace + "px"
			document.getElementById("time-line-background").style.height =
				height + extraSpace + "px"
			document.getElementById("time-line-progress").style.height =
				height + extraSpace + "px"

			//Set time-line-progress-bar height and top
			const timeLineProgressBar = document.querySelector(
				".time-line-progress-bar"
			)
			const viewHeight =
				document.querySelector(".handleScroll").clientHeight
			const windowTop = document
				.querySelector(".handleScroll")
				.getBoundingClientRect().top
			timeLineProgressBar.style.height = `${viewHeight / 2}px`
			timeLineProgressBar.style.top = `${windowTop}px`

			const endDiv = document.querySelector(".end")
			endDiv.style.height = `${viewHeight}px`
		},
	},
}
</script>
<style>
.handleScroll {
	height: 100%;
	width: 100%;
	overflow-x: hidden;
	overflow-y: scroll;
}
:root {
	--dot_size: 18px;
	--dot_size_outer: 8px;
	--time-line-width: 4px;
	--grid-margin: 100px;
	box-sizing: border-box;
}
html,
body {
	max-width: 100%;
	margin: 0;
	overflow: scroll;
}
</style>
<style scoped>
.start {
	/* background-image: url("images/space.jpeg"); */
	background-color: black;
	width: 100%;
	height: 500px;
	font-size: xx-large;
	color: white;
	text-align: center;
	border-style: none;
	left: 0;
	top: 0;
}
.nav_bar {
	width: 100%;
	height: 60px;
	background-color: black;
	position: fixed;
	z-index: 20;
	top: 0;
}
.space {
	width: 50px;
	height: 40px;
	background-color: black;
	float: right;
	padding-top: 20px;
}
.nav_bar_item {
	width: 100px;
	height: 40px;
	background-color: black;
	float: right;
	text-align: center;
	padding-top: 20px;
	font-size: large;
	color: white;
}
#indict_bar {
	height: 2px;
	width: 50px;
	background: linear-gradient(
		90deg,
		rgba(63, 94, 251, 1) 0%,
		rgba(252, 70, 107, 1) 100%
	);
	position: fixed;
	top: 50px;
	right: 250px;
	transform: translateX(-50%);
	transition: 0.5s ease-in-out;
}
.end {
	background-color: black;
	width: 100%;
	position: relative;
}

#time-line {
	width: 100%;
	background-color: none;
	border-style: none;
	position: relative;
}
#time-line-background {
	/* background-image: url("images/space.jpeg"); */
	background-repeat: repeat-y;
	background-color: black;
	position: absolute;
	width: 100%;
	z-index: -4;
}
.container {
	position: relative;
}
#time-line-progress {
	width: var(--time-line-width);
	background: rgba(127, 127, 127, 1);
	border-style: none;
	position: absolute;
	left: calc(50% - var(--time-line-width) / 2);
	z-index: -3;
}
.time-line-progress-bar {
	/* height: 50vh; */
	width: var(--time-line-width);
	background: linear-gradient(
		180deg,
		rgba(64, 201, 255, 1) 0%,
		rgba(232, 28, 255, 1) 100%
	);
	border-style: none;
	position: fixed;
	/* top: 130px; */
	left: calc(50% - var(--time-line-width) / 2);
	z-index: -1;
}
.grid {
	padding-top: var(--grid-margin);
	display: grid;
	width: 80%;
	height: fit-content;
	margin-left: auto;
	margin-right: auto;
	border-style: none;

	grid-template-columns: [column_1] 0.5fr [column_2] 200px [column_3] 0.5fr [column_4];
	grid-template-rows: [row_1] 1fr [row_2];
}

.time-line-left {
	border-style: none;
	grid-column: 1/2;
	grid-row: 1/2;
}
.time-line-right {
	border-style: none;
	grid-column: 3/4;
	grid-row: 1/2;
}
.time-line-dot {
	border-style: none;
	grid-column: 2/3;
	grid-row: 1/2;
	position: relative;
}

.dot {
	width: var(--dot_size);
	height: var(--dot_size);
	border-radius: 50%;
	border-width: var(--dot_size_outer);
	border-style: solid;
	left: calc(50% - var(--dot_size) / 2 - var(--dot_size_outer));
	position: sticky;
	top: 50%;
	z-index: -2;
	background-color: rgba(127, 127, 127, 1);
	border-color: black;
}
.time-line-left-text {
	font-size: x-large;
	font-family: "Courier New", Courier, monospace;
	font-weight: bold;
	text-align: right;
	position: sticky;
	top: 50%;
}
.time-line-right-text {
	font-size: medium;
	font-family: "Courier New", Courier, monospace;
	opacity: 0;
}
.time-line-left.historyText {
	color: rgba(127, 127, 127, 0.8);
}
.time-line-right.historyText {
	color: black;
}
@media (max-width: 700px) {
	#time-line-progress {
		left: calc(
			10% - var(--time-line-width) / 2 + var(--dot_size) / 2 +
				var(--dot_size_outer)
		);
	}
	.time-line-progress-bar {
		left: calc(
			10% - var(--time-line-width) / 2 + var(--dot_size) / 2 +
				var(--dot_size_outer)
		);
	}
	.grid {
		padding-top: var(--grid-margin);
		display: grid;
		width: 80%;
		height: fit-content;
		margin-left: auto;
		margin-right: auto;
		border-style: none;
		grid-template-columns: 80px 1fr;
		grid-template-rows: auto;
	}
	.time-line-left {
		border-style: none;
		grid-column: 2/3;
		grid-row: 1/2;
	}
	.time-line-right {
		border-style: none;
		grid-column: 2/3;
		grid-row: 2/3;
	}
	.time-line-dot {
		border-style: none;
		grid-column: 1/2;
		grid-row: 1/2;
		position: relative;
	}
	.empty {
		grid-column: 1/2;
		grid-row: 2/3;
	}
	.dot {
		left: 0;
	}

	.time-line-left-text {
		text-align: left;
		position: sticky;
		top: 50%;
	}
}

.fadeRight {
	opacity: 1;
	animation: fade-right 1s ease-in-out;
}

@keyframes fade-right {
	0% {
		transform: translateX(100px);
		opacity: 0;
	}
	100% {
		transform: translateX(0);
		opacity: 1;
	}
}

.president {
	font-size: large;
	font-family: "Courier New", Courier, monospace;
	font-weight: 600;
}
a {
	color: inherit;
}
.title-text {
	font-size: xx-large;
	font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
	font-weight: bold;
	color: white;
	text-align: center;
	padding-top: 250px;
}
.cover-up {
	width: 100%;
	height: var(--grid-margin);
	position: absolute;
	background: linear-gradient(
		0deg,
		rgba(0, 0, 0, 0) 0%,
		rgba(0, 0, 0, 1) 100%
	);
	border-style: none;
}
.cover-down {
	width: 100%;
	height: var(--grid-margin);
	position: absolute;
	bottom: 0;
	background: linear-gradient(
		180deg,
		rgba(0, 0, 0, 0) 0%,
		rgba(0, 0, 0, 1) 100%
	);
	border-style: none;
}
a {
	color: inherit;
	text-decoration: none;
}
</style>
