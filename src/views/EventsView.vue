<template>
	<link
		href="https://fonts.googleapis.com/css?family=JetBrains+Mono"
		rel="stylesheet"
	/>
	<div class="container">
		<!-- Left Side: Scrollable Content -->
		<div class="left-container">
			<div class="background-card">
				<div
					class="section-container"
					ref="contentContainer"
					@scroll="handleContentScroll"
				>
					<section
						v-for="section in sections"
						:key="section.id"
						:id="`section-${section.id}`"
						class="min-h-screen p-8"
					>
						<p class="title-text">{{ section.title }}</p>
						<p class="content-text">{{ section.content }}</p>
					</section>
				</div>
			</div>
		</div>

		<!-- Right Side: Scroll Picker -->
		<div class="right-container" ref="rightContainer">
			<div class="picker-container-cover top">
				<div class="period-dropdown">
					<button
						@click="toggleDropdown"
						class="dropdown-button"
						id="dropdown-button"
					>
						{{ selectedPeriod }} V
					</button>
					<div class="dropdown-content" id="dropdown-content">
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
			</div>
			<div class="picker-container" ref="pickerContainer">
				<div class="cover top"></div>
				<div
					class="picker-scroller-container"
					@scroll="updateRotations"
					@scrollend="testFunction"
					ref="pickerScrollerContainer"
				>
					<div class="picker-scroller">
						<div class="blank-picker">
							<div class="picker"></div>
						</div>
						<div class="blank-picker">
							<div class="picker"></div>
						</div>
						<div
							v-for="section in sections"
							:key="section.id"
							class="py-2"
						>
							<button
								@click="scrollToSection(section.id)"
								:class="[
									'picker',
									activeSection === section.id
										? 'picker-active'
										: 'picker-inactive',
								]"
								:id="`button-${section.id}`"
							>
								{{ section.title }}
							</button>
						</div>
						<div class="blank-picker">
							<div class="picker"></div>
						</div>
						<div class="blank-picker">
							<div class="picker"></div>
						</div>
					</div>
				</div>
				<div class="cover bottom"></div>
			</div>
			<div class="picker-container-cover bottom"></div>
		</div>
	</div>
</template>

<style lang="css" scoped>
:root {
	--picker-height: 50px;
	--shown-pickers: 3;
	--card-color: #343434;
	font-family: "JetBrains Mono";
}
.title-text {
	font-size: 1.5rem;
	font-weight: 600;
	color: white;
	height: 50px;
	padding-top: 20px;
	position: sticky;
	top: 0px;
	background-color: var(--card-color);
	border-bottom: white 1px solid;
	border-top: var(--card-color) 1px solid;
}
body {
	margin: 0;
	font-family: Arial, sans-serif;
	background-color: black;
}
section {
	margin: 0;
}
p {
	margin: 0;
	padding: 0;
}
.container {
	display: flex;
	height: 100%;
}

.left-container {
	width: 82%;
	height: 100%;
}

.background-card {
	top: 5%;
	height: 85%;
	margin-left: 5%;
	margin-right: 0%;
	z-index: 2;
	padding: 2% 3%;
	background-color: var(--card-color);
	position: relative;
	border-radius: 15px;
	box-sizing: border-box;
	/* overflow-y: scroll; */
}

.section-container {
	position: relative;
	height: 100%;
	overflow-y: scroll;
	-ms-overflow-style: none; /* IE and Edge */
	scrollbar-width: none; /* Firefox */
}
.section-container::-webkit-scrollbar {
	display: none;
}

.content-text {
	font-size: 1.125rem;
	line-height: 1.75rem;
	color: white;
}
.right-container {
	width: 18%;
	height: 100%;
	overflow-y: auto;
	position: absolute;
	right: 0;
}
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
	font-size: 28px;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
	text-align: center;
	top: 70%;
	position: absolute;
	height: var(--picker-height);
	cursor: pointer;
}
.period-dropdown .dropdown-content {
	display: none;
	color: #fff;
	font-family: "JetBrains Mono";
	font-size: 28px;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
	text-align: center;
	cursor: pointer;
	top: calc(70% + 10px + var(--picker-height));
	position: relative;
	background-color: black;
}
.period-dropdown .dropdown-content.expand {
	display: block;
}

.cover {
	position: absolute;
	width: 100%;
	/* height: calc(var(--picker-height) / 2); */
	z-index: 1;
	pointer-events: none;
}
.cover.top {
	top: 0px;
	background: linear-gradient(180deg, black, transparent);
}
.cover.bottom {
	bottom: 0px;
	background: linear-gradient(0deg, black, transparent);
}
.picker-container-cover {
	position: absolute;
	width: 100%;
	z-index: 1;
}
.picker-container-cover.top {
	top: 0px;
	bottom: calc(50vh + var(--picker-height) * var(--shown-pickers) / 2);
}
.picker-container-cover.bottom {
	bottom: 0px;
	top: calc(50vh + var(--picker-height) * var(--shown-pickers) / 2);
}
.picker-container {
	position: relative;
	top: 50%;
	transform: translateY(-50%);
	height: calc(var(--picker-height) * var(--shown-pickers));
}
.picker-scroller-container {
	height: 100%;
	overflow-y: auto;
	overflow-x: hidden;
	position: relative;
	scroll-snap-type: y mandatory;
	
}
.picker-scroller {
	display: flex;
	flex-direction: column;
	align-items: center;
}
.picker {
	width: 100%;
	padding: 10px;
	text-align: left;
	font-size: 1rem;
	border: none;
	cursor: pointer;
	text-align: center;
	height: var(--picker-height);
	overflow: hidden;
	scroll-snap-align: center;
	background-color: black;
	color: gray;
	font-family: "JetBrains Mono";
	font-size: 28px;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
}
.picker-active {
	background-color: black;
	color: white;
}
.blank-picker .picker {
	scroll-snap-align: none;
}
</style>

<script>
import { ref, onMounted, onUnmounted } from "vue"

export default {
	setup() {
		const sections = ref([
			{
				id: 1,
				title: "Section 1",
				content: "This is the content for section 1. ".repeat(50),
			},
			{
				id: 2,
				title: "Section 2",
				content: "This is the content for section 2. ".repeat(50),
			},
			{
				id: 3,
				title: "Section 3",
				content: "This is the content for section 3. ".repeat(50),
			},
			{
				id: 4,
				title: "Section 4",
				content: "This is the content for section 4. ".repeat(50),
			},
			{
				id: 5,
				title: "Section 5",
				content: "This is the content for section 5. ".repeat(50),
			},
			{
				id: 6,
				title: "Section 6",
				content: "This is the content for section 6. ".repeat(50),
			},
		])
		const timePeriodList = ref([
			"Last 24 hours",
			"Last 7 days",
			"Last 30 days",
			"Last 90 days",
			"Last 180 days",
			"Last 365 days",
			"All time",
		])
		let selectedPeriod = ref("Last 30 days")

		const contentContainer = ref(null)
		const pickerContainer = ref(null)
		const pickerScrollerContainer = ref(null)
		const activeSection = ref(1)
		const selectedSection = ref("Section 1")
		// let scrollTimeout = null;
		let isProgrammaticScroll = false
		let testSection = ref("Section 1")
		const testFunction = () => {
			console.log("test function")
		}
		const scrollToSection = (sectionId) => {
			isProgrammaticScroll = true
			const sectionElement = document.getElementById(
				`section-${sectionId}`
			)
			if (sectionElement && contentContainer.value) {
				contentContainer.value.scrollTo({
					top: sectionElement.offsetTop + 50,
					behavior: "smooth",
				})
				activeSection.value = sectionId
				const section = sections.value.find((s) => s.id === sectionId)
				if (section) {
					selectedSection.value = section.title
				}
			}
			setTimeout(() => {
				isProgrammaticScroll = false
			}, 1000)
			syncPickerScroll(sectionId)
		}

		const handleContentScroll = () => {
			if (isProgrammaticScroll) return

			const scrollTop = contentContainer.value.scrollTop
			let currentSection = sections.value[0].id

			for (const section of sections.value) {
				const element = document.getElementById(`section-${section.id}`)
				if (element && element.offsetTop <= scrollTop + 100) {
					currentSection = section.id
				}
			}

			activeSection.value = currentSection
			const section = sections.value.find((s) => s.id === currentSection)
			if (section) {
				selectedSection.value = section.title
			}
			syncPickerScroll(currentSection)
		}

		const syncPickerScroll = (sectionId) => {
			isProgrammaticScroll = true
			// alert(sectionId);
			const buttonElement = document.getElementById(`button-${sectionId}`)
			if (buttonElement == null) return
			if (buttonElement && pickerScrollerContainer.value) {
				pickerScrollerContainer.value.scrollTo({
					top:
						buttonElement.offsetTop -
						pickerScrollerContainer.value.offsetTop -
						50,
					behavior: "smooth",
				})
			}
			// setTimeout(() => {
			// 	isProgrammaticScroll = false;
			// }, 1000);
		}

		const handlePickerScroll = async () => {
			if (isProgrammaticScroll) return

			// const scrollTop = pickerContainer.value.scrollTop;
			let currentSection = sections.value[0].id
			const containerRect = pickerContainer.value.getBoundingClientRect()
			const containerCenter = containerRect.top + containerRect.height / 2
			const containerHeight = containerRect.height
			let shortestDistance = Infinity
			for (const section of sections.value) {
				const button = document.getElementById(`button-${section.id}`)

				const buttonRect = button.getBoundingClientRect()
				const buttonCenter = buttonRect.top + buttonRect.height / 2
				const relativePos =
					(buttonCenter - containerCenter) / (containerHeight / 2)

				// Apply the rotation based on the relative position
				const distance = Math.abs(relativePos)
				if (distance <= shortestDistance) {
					shortestDistance = distance
					currentSection = section.id
				}
			}
			testSection.value = currentSection
			for (const section of sections.value) {
				const button = document.getElementById(`button-${section.id}`)
				if (section.id === currentSection) {
					button.classList.add("picker-active")
					// Scroll to the section in the content container
					// This should be a async operation
					// TODO
					// scrollToSection(section.id);
					// setTimeout(() => {
					// 	isProgrammaticScroll = false;
					// }, 1000);
					// syncPickerScroll(section.id);
				} else {
					button.classList.remove("picker-active")
				}
			}
		}

		const updateRotations = () => {
			if (!pickerContainer.value) return
			// if (isProgrammaticScroll) return;
			handlePickerScroll()

			const containerRect = pickerContainer.value.getBoundingClientRect()
			const containerCenter = containerRect.top + containerRect.height / 2
			const containerHeight = containerRect.height
			const divs = pickerContainer.value.querySelectorAll(".picker")

			divs.forEach((div) => {
				const divRect = div.getBoundingClientRect()
				const divCenter = divRect.top + divRect.height / 2
				const relativePos =
					(divCenter - containerCenter) / (containerHeight / 2)

				// Calculate the distance from the center of the container
				// and update the selectedDiv if it's the closest
				// Also apply the rotation based on the relative position
				const maxSin = Math.sin(Math.PI / 4) // Max rotation angle in radians
				const angle = Math.asin(relativePos * maxSin) * (180 / Math.PI) // Convert to degrees
				div.style.transform = `rotate3d(1, 0, 0, ${angle}deg)`
			})
			// if (scrollTimeout) clearTimeout(scrollTimeout);
			// scrollTimeout = setTimeout(() => {
			// 	console.log("Custom scrollend triggered!");
			// 	testFunction();
			// 	scrollToSection(testSection.value);
			// }, 100);
		}
		const toggleDropdown = () => {
			const dropdownContent = document.getElementById("dropdown-content")
			dropdownContent.classList.toggle("expand")
		}
		const selectPeriod = (period) => {
			selectedPeriod = period
			toggleDropdown()
		}

		onMounted(() => {
			scrollToSection(1)
			updateRotations()
			window.addEventListener("resize", updateRotations)
		})

		onUnmounted(() => {
			window.removeEventListener("resize", updateRotations)
		})

		return {
			sections,
			selectedSection,
			contentContainer,
			pickerContainer,
			pickerScrollerContainer,
			activeSection,
			scrollToSection,
			handleContentScroll,
			handlePickerScroll,
			updateRotations,
			testSection,
			testFunction,
			timePeriodList,
			selectedPeriod,
			toggleDropdown,
			selectPeriod,
		}
	},
}
</script>
