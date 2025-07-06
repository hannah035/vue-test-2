<script setup>
import { ref } from "vue"

// Track mobile menu state
const isMobileMenuOpen = ref(false)

function toggleMobileMenu() {
	isMobileMenuOpen.value = !isMobileMenuOpen.value
}
</script>

<template>
	<div class="Header">
		<!-- Hamburger Menu Button (visible on mobile only) -->
		<button class="mobile-menu-btn" @click="toggleMobileMenu">
			<span></span>
			<span></span>
			<span></span>
		</button>

		<!-- Navigation Container -->
		<div class="NavContainer" :class="{ active: isMobileMenuOpen }">
			<!-- Header Left Contents -->
			<div class="HeaderLeftContents">
				<router-link to="/" @click="toggleMobileMenu">Home</router-link>
				<router-link to="/events" @click="toggleMobileMenu"
					>Events</router-link
				>
				<router-link to="/reviews" @click="toggleMobileMenu"
					>Reviews</router-link
				>
				<router-link to="/reviews2" @click="toggleMobileMenu"
					>Review2</router-link
				>
				<router-link to="/books" @click="toggleMobileMenu"
					>Books</router-link
				>
				<router-link to="/about" @click="toggleMobileMenu"
					>About</router-link
				>
			</div>

			<!-- Header Right Contents -->
			<div class="HeaderRightContents">
				<div class="Icon">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="60"
						height="60"
						viewBox="10 10 50 50"
						fill="none"
					>
						<circle
							cx="35.3555"
							cy="35.3553"
							r="16.6667"
							transform="rotate(-135 35.3555 35.3553)"
							stroke="white"
							stroke-width="1.00088"
							stroke-linejoin="round"
						/>
						<path
							d="M39.7749 31.6724L30.1995 41.2478"
							stroke="white"
							stroke-width="1.00088"
							stroke-linejoin="round"
						/>
						<path
							d="M31.6726 30.9358C35.1244 30.9358 37.0597 30.9358 40.5115 30.9358L40.5115 39.7747"
							stroke="white"
							stroke-width="1.00088"
							stroke-linejoin="round"
						/>
					</svg>
				</div>
				<a href="#join_us" @click="toggleMobileMenu">Join Us</a>
			</div>
		</div>
	</div>
</template>

<style scoped>
.Header {
	display: flex;
	width: 100%;
	height: 83px;
	align-items: center;
	flex-shrink: 0;
	position: relative;
	top: 45px;
	border-top: 1px solid #fff;
	border-bottom: 1px solid #fff;
	padding: 0 20px;
}

/* Hamburger Menu Button Styles */
.mobile-menu-btn {
	display: none;
	flex-direction: column;
	justify-content: space-between;
	width: 30px;
	height: 20px;
	background: transparent;
	border: none;
	cursor: pointer;
	padding: 0;
	z-index: 30;
}

.mobile-menu-btn span {
	width: 100%;
	height: 2px;
	background: #fff;
	transition: all 0.3s ease;
}

/* Navigation Container */
.NavContainer {
	display: flex;
	width: 100%;
	justify-content: space-between;
	align-items: center;
	transition: all 0.3s ease;
}

.HeaderLeftContents {
	display: flex;
	justify-content: flex-start;
	margin: 0 0 0 231px;
	gap: 1.5rem;
}

.HeaderLeftContents a::before {
	content: "•";
	color: #ffffff;
	margin-right: 0.45rem;
	font-size: 1rem;
}

.HeaderLeftContents a {
	text-decoration: none;
	color: #ffffff;
	font-size: 1rem;
	font-family: "JetBrains Mono";
}

.HeaderRightContents {
	display: flex;
	justify-content: flex-end;
	margin: 0 134px 0 0;
	align-items: center;
	gap: 0.15rem;
}

.HeaderRightContents a {
	text-decoration: none;
	color: #ffffff;
	font-size: 1rem;
	font-family: "JetBrains Mono";
	word-spacing: -0.25rem;
}

.Icon {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 2.75rem;
	height: 2.75rem;
	flex-shrink: 0;
	box-sizing: border-box;
}

/* Mobile Responsive Styles */
@media (max-width: 768px) {
	.Header {
		height: 60px;
		top: 0;
	}

	.mobile-menu-btn {
		display: flex;
	}

	.NavContainer {
		position: fixed;
		top: 60px;
		left: -100%;
		width: 100%;
		height: calc(100vh - 60px);
		background: #000;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin: 0;
		z-index: 20;
		opacity: 0;
		gap: 2rem; /* Space between left and right contents */
	}

	.NavContainer.active {
		left: 0;
		opacity: 1;
	}

	.HeaderLeftContents {
		margin: 0;
		flex-direction: column;
		align-items: center;
		gap: 2rem;
	}

	.HeaderRightContents {
		margin: 0;
		flex-direction: row; /* Keep items in same line */
		gap: 0.15rem; /* Maintain original gap */
	}

	.HeaderLeftContents a {
		font-size: 1.5rem;
	}

	.HeaderRightContents a {
		font-size: 1.5rem;
	}
}
</style>
