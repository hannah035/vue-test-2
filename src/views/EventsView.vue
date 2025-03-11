<template>
	<link
		href="https://fonts.googleapis.com/css?family=JetBrains+Mono"
		rel="stylesheet"
	/>

	<div class="container">
		<div class="event-section">
			<div class="section-title">Events</div>
			<div class="event-image-container">
				<div
					v-for="(event, index) in Events[selectedPeriod]"
					:key="index"
					class="event-image"
					:class="{ hidden: selectedEvent !== index }"
				>
					<img :src="event.cover" />
				</div>
			</div>
		</div>
		<div class="period-dropdown">
			<button v-on:click="expandDropdown" class="dropdown-button">
				{{ selectedPeriod }}
			</button>
			<div class="dropdown-content">
				<div
					v-for="period in timePeriodList"
					:key="period"
					v-on:click="selectedPeriod = period"
					class="dropdown-item"
				>
					{{ period }}
				</div>
			</div>
		</div>

		<div class="event-options">
			<div
				v-for="(event, index) in Events[selectedPeriod]"
				:key="index"
				class="event-item"
				v-on:mouseover="selectedEvent = index"
				:class="{ highlight: selectedEvent === index }"
			>
				{{ event.title }}
			</div>
		</div>
	</div>
</template>

<script>
import eventsData from "../assets/EventsData/Events"
export default {
	name: "EventsView",
	data() {
		const timePeriodList = Object.keys(eventsData)
		return {
			timePeriodList,
			selectedPeriod: timePeriodList[0],
			Events: eventsData,
			selectedEvent: 0,
		}
	},
	methods: {
		expandDropdown() {
			document
				.querySelector(".dropdown-content")
				.classList.toggle("expand")
		},
	},
}
</script>

<style scoped>
.container {
	width: 100%;
	height: 100%;
	display: grid;
	box-sizing: border-box;
	grid-template-columns: 77% 1fr;
	column-gap: 4%;
	grid-template-rows: repeat(2, 1fr);
	padding: 4.5% 5%;
}

.event-section {
	grid-row: span 2;
	border-radius: 15px;
	background: rgba(255, 255, 255, 0.2);
	backdrop-filter: blur(10px);
	padding: 4.5%;
}
.section-title {
	color: #fff;
	font-family: "JetBrains Mono";
	font-size: 20px;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
	position: relative;
}
.event-image-container {
	width: 100%;
	height: 100%;
}
.event-image {
	width: 100%;
	height: 100%;
}
.event-image img {
	position: relative;
	max-height: 100%;
	max-width: 100%;

	object-fit: contain;
}
.hidden {
	display: none;
}
/* TODO dropdown button and content position */
.period-dropdown {
	height: 100%;
	width: 100%;
	/* background-color: green; */
}
.dropdown-button {
	width: 100%;
	background-color: transparent;
	background-repeat: no-repeat;
	border: none;
	display: inline-block;
	color: #fff;
	font-family: "JetBrains Mono";
	font-size: medium;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
}
.period-dropdown .dropdown-content {
	display: none;
	color: #fff;
	font-family: "JetBrains Mono";
	font-size: medium;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
	text-align: center;
}
.period-dropdown .dropdown-content.expand {
	display: block;
}

/* TODO event-item position and style */
.event-item {
	font-size: small;
}

.highlight {
	color: yellow;
	/* TODO change highlight color */
}

@media (max-width: 768px) {
	.container {
		width: 100%;
		height: 100%;
		display: grid;
		box-sizing: border-box;
		/* For mobile, use a single column layout */
		grid-template-columns: 1fr;
		grid-template-rows: 1fr 1fr 100px;
		padding: 2% 3%; /* Reduced padding for smaller screens */
	}
	.event-section {
		grid-row: span 1;
	}
	.period-dropdown {
		grid-row: span 1;
		/* background-color: green; */
	}
	.event-options {
		grid-row: span 1;
	}
}
</style>
