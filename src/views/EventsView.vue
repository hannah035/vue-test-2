<template>
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
			<button v-on:click="toggleDropdown" class="dropdown-button">
				{{ selectedPeriod }}
			</button>
			<div class="dropdown-content">
				<div
					v-for="period in timePeriodList"
					:key="period"
					v-on:click="selectPeriod(period)"
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
				<h4>{{ event.title }}</h4>
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
		toggleDropdown() {
			document
				.querySelector(".dropdown-content")
				.classList.toggle("expand")
		},
		selectPeriod(period) {
			this.selectedPeriod = period
			this.toggleDropdown()
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
	position: relative;
}
.event-image img {
	position: relative;
	max-height: 100%;
	max-width: 100%;
	object-fit: contain;
	left: 50%;
	transform: translateX(-50%);
	
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
	border: none;
	display: inline-block;
	color: #fff;
	font-family: "JetBrains Mono";
	font-size: 24px;
	font-weight: bold;
	position: relative;
	text-align: center;
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
	cursor: pointer;
}
.period-dropdown .dropdown-content.expand {
	display: block;
}

/* TODO event-item position and style */
.event-item {
	margin-bottom: 20px;
	padding: 10px;
	border-bottom: 1px solid #444;
	cursor: pointer;
}

.event-item h4 {
	font-size: 15px;
	font-weight: bold;
	margin-bottom: 5px;
}

.highlight {
	color: yellow;
	/* TODO change highlight color */
}

@media (max-width: 768px) {
	.container {
		width: 100%;
		height: fit-content;
		display: grid;
		box-sizing: border-box;
		/* For mobile, use a single column layout */
		grid-template-columns: 1fr;
		grid-template-rows: auto auto 100px;
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
	.event-item {
		margin-bottom: -10px;
		padding-bottom: 20px;
	}

	.event-item h4 {
		font-size: 15px;
		margin-bottom: 0px;
		font-weight: normal;
	}
}
</style>
