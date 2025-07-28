<template>
	<div class="join-us-container">
		<!-- 登入表單 -->
		<div v-if="!isLoggedIn" class="login-section">
			<div class="login-form">
				<form @submit.prevent="login">
					<div class="form-group">
						<label for="email">Email</label>
						<input
							type="email"
							id="email"
							v-model="loginForm.email"
							required
							:disabled="loginLoading"
						/>
					</div>

					<div class="form-group">
						<label for="password">Password</label>
						<input
							type="password"
							id="password"
							v-model="loginForm.password"
							required
							:disabled="loginLoading"
						/>
					</div>

					<button
						type="submit"
						:disabled="loginLoading"
						class="login-btn"
					>
						<span v-if="loginLoading">
							<svg class="spinner" viewBox="0 0 50 50">
								<circle
									cx="25"
									cy="25"
									r="20"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-dasharray="31.416"
									stroke-dashoffset="31.416"
								>
									<animate
										attributeName="stroke-dasharray"
										dur="2s"
										values="0 31.416;15.708 15.708;0 31.416"
										repeatCount="indefinite"
									/>
									<animate
										attributeName="stroke-dashoffset"
										dur="2s"
										values="0;-15.708;-31.416"
										repeatCount="indefinite"
									/>
								</circle>
							</svg>
						
						</span>
						<span v-else>Login</span>
					</button>

					<div v-if="loginError" class="error-message">
						{{ loginError }}
					</div>
				</form>

				<div class="login-help">
					<p class="demo-info">
						<strong>Demo Account:</strong><br />
						Email: ming.zhang@email.com<br />
						Password: $2b$10$encrypted_password_hash
					</p>
				</div>
			</div>
		</div>

		<!-- 登入成功後的歡迎頁面 -->
		<div v-else class="welcome-section">
			<div class="profile-info-grid">
				<div class="profile-info-title name">Name</div>
				<div class="profile-info-content name">
					{{ currentUser.name }}
				</div>
				<div class="profile-info-title nickname">Nickname</div>
				<div class="profile-info-content nickname">
					{{ currentUser.nickname }}
				</div>
				<div class="profile-info-title email">Email</div>
				<div class="profile-info-content email">
					{{ currentUser.email }}
				</div>
				<div class="profile-info-title password">Password</div>

				<div class="profile-info-content password">
					{{ currentUser.password }}
				</div>
			</div>
			<div class="borrow-history-grid">
				<div class="reviews-container">
					<div class="sep-line"></div>
					<div class="review-item">
						<div
							class="work-format"
							v-bind="setFormatSpan('borrowedBooks')"
						>
							<div class="format-label">Borrowing</div>
						</div>
						<template
							v-for="(record, index) in borrowedBooks"
							:key="index"
						>
							<div class="review-card">
								<div class="review-title">
									{{ record.bookTitle }}
								</div>

								<div class="borrow-date-info">
									<span class="borrow-date"
										>From:
										{{
											formatDate(record.borrowDate)
										}}</span
									>
									<span class="days-borrowed"
										>Days Borrowed:
										{{
											calculateDaysBorrowed(
												record.borrowDate
											)
										}}</span
									>
								</div>
								<div class="return-borrow-button">
									<div class="book-actions">
										<router-link
											:to="{
												path: '/books',
												query: {
													bookId: record.bookId,
												},
											}"
											class="action-link view-book"
										>
											Return
										</router-link>
									</div>
								</div>
							</div>
						</template>
						<div
							class="work-format"
							v-bind="setFormatSpan('borrowingHistory')"
						>
							<div class="format-label">History</div>
						</div>
						<template
							v-for="(record, index) in borrowingHistory"
							:key="index"
						>
							<div class="review-card">
								<div class="review-title">
									{{ record.bookTitle }}
								</div>

								<div class="borrow-date-info">
									<span class="borrow-date"
										>From:
										{{
											formatDate(record.borrowDate)
										}}</span
									>
									<span class="days-borrowed"
										>To:
										{{
											formatDate(record.returnDate)
										}}</span
									>
								</div>
								<div class="return-borrow-button">
									<div class="book-actions">
										<router-link
											:to="{
												path: '/books',
												query: {
													bookId: record.bookId,
												},
											}"
											class="action-link view-book"
										>
											Borrow
										</router-link>
									</div>
								</div>
							</div>
						</template>
					</div>
				</div>
				<button
					type="submit"
					:disabled="loginLoading"
					class="logout-btn"
					@click="logout"
				>
					<span>Log out</span>
				</button>
			</div>
		</div>
	</div>
</template>

<script>
import reviewsService from '@/services/reviewsService'
import recordService from '@/services/recordService'

export default {
	name: 'JoinUsView',
	data() {
		return {
			isLoggedIn: false, // for production, set to true
			// isLoggedIn: false, // for testing, set to false
			loginLoading: false,
			loginError: null,
			loginForm: {
				email: '',
				password: '',
			},
			currentUser: null,
			activeTab: 'borrowed',
			borrowedBooks: [
				{
					title: 'Sample Book',
				},
				{ title: 'Another Book' },
				{
					title: 'Sample Book',
				},
				{
					title: 'Sample Book',
				},
				{
					title: 'Sample Book',
				},
				{
					title: 'Sample Book',
				},
				{
					title: 'Sample Book',
				},
				{
					title: 'Sample Book',
				},
			],
			borrowingHistory: [
				{ title: 'Past Book' },
				{ title: 'Old Book' },
				{ title: 'Old Book' },
				{ title: 'Old Book' },
				{ title: 'Old Book' },
				{ title: 'Old Book' },
				{ title: 'Old Book' },
			],
			borrowCount: { borrowingHistory: 0, borrowedBooks: 0 },
			totalCount: 0,
		}
	},
	methods: {
		async login() {
			try {
				this.loginLoading = true
				this.loginError = null

				const response = await reviewsService.login(
					this.loginForm.email,
					this.loginForm.password
				)
				if (response.success) {
					this.isLoggedIn = true
					this.currentUser = response.data.user

					// 儲存登入狀態到 localStorage
					localStorage.setItem(
						'currentUser',
						JSON.stringify(response.data.user)
					)
					localStorage.setItem('isLoggedIn', 'true')

					// 載入借閱記錄
					await this.loadBorrowingRecords()
				} else {
					this.loginError = response.error || 'Login failed'
				}
			} catch (error) {
				console.error('Login error:', error)
				this.loginError =
					'Login failed. Please check your credentials and try again.'
			} finally {
				this.loginLoading = false
			}
		},

		logout() {
			this.isLoggedIn = false
			this.currentUser = null
			this.loginForm = { email: '', password: '' }
			this.loginError = null

			// 清除 localStorage
			localStorage.removeItem('currentUser')
			localStorage.removeItem('isLoggedIn')
		},

		checkLoginStatus() {
			const savedUser = localStorage.getItem('currentUser')
			const savedLoginStatus = localStorage.getItem('isLoggedIn')

			// // for testing, set isLoggedIn to true and mock user data
			// this.isLoggedIn = true
			// const usr = {
			// 	name: 'Ming Zhang',
			// 	nickname: 'Ming',
			// 	email: 'ming.zhang@email.com',
			// 	password: '$2b$10$encrypted_password_hash',
			// }
			// this.currentUser = usr
			// return

			if (savedUser && savedLoginStatus === 'true') {
				this.isLoggedIn = true
				this.currentUser = JSON.parse(savedUser)
				// 載入借閱記錄
				this.loadBorrowingRecords()
			}
		},

		async loadBorrowingRecords() {
			if (!this.currentUser) return

			try {
				const allRecords = await recordService.allRecords()
				const userRecords = allRecords.filter(
					(record) => record.userId === this.currentUser._id
				)

				// 分離借閱中的書和借閱過的書
				this.borrowedBooks = userRecords.filter(
					(record) => record.status === 'borrowed'
				)
				this.borrowingHistory = userRecords.filter(
					(record) => record.status === 'returned'
				)
			} catch (error) {
				console.error('Failed to load borrowing records:', error)
			}
			this.initAttributes()
		},

		calculateDaysBorrowed(borrowDate) {
			const today = new Date()
			const borrow = new Date(borrowDate)
			const diffTime = Math.abs(today - borrow)
			const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
			return diffDays
		},

		calculateBorrowDuration(borrowDate, returnDate) {
			const borrow = new Date(borrowDate)
			const returned = new Date(returnDate)
			const diffTime = Math.abs(returned - borrow)
			const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
			return diffDays
		},

		formatDate(dateString) {
			return new Date(dateString).toLocaleDateString('en-US', {
				year: 'numeric',
				month: 'long',
				day: 'numeric',
			})
		},
		setFormatSpan(status) {
			var attributes = {}
			attributes['style'] = {
				'grid-column': `span ${
					status === 'borrowedBooks'
						? this.borrowedBooks.length
						: this.borrowingHistory.length
				}`,
			}
			return attributes
		},
		countRecords() {
			this.borrowCount.borrowedBooks = this.borrowedBooks.length
			this.borrowCount.borrowingHistory = this.borrowingHistory.length
			this.totalCount =
				this.borrowCount.borrowedBooks +
				this.borrowCount.borrowingHistory
		},
		initAttributes() {
			this.countRecords()
			const sepLine = document.querySelector('.sep-line')
			const cardWidth = 200 // 假設每個卡片的寬度為 200px
			const cardGap = 10 // 假設卡片之間的間距為 10px
			const sepLineWidth =
				(cardWidth + cardGap) * (this.totalCount + 1) - cardGap
			// 我不知道為什麼要加 1 !!!!!

			sepLine.style.width = `calc(${sepLineWidth}px - 63.2px)`
		},
	},
	mounted() {
		this.checkLoginStatus()
	},
}
</script>

<style scoped>
.join-us-container {
	/* min-height: 100vh; */
	height: 100%;
	background: linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%);
	/* display: flex;
	align-items: center;
	justify-content: center; */
	/* padding: 20px; */
	font-family: 'JetBrains Mono', monospace;
}

/* 登入表單樣式 */
.login-section {
	width: 100%;
	height: 100%;
}

.login-form {
	background: none;
	left: 50%;
	top: 50%;
	position: relative;
	transform: translate(-50%, -50%);
	max-width: 480px;
}

.login-form h2 {
	color: #fff;
	font-size: 2rem;
	margin-bottom: 10px;
	text-align: center;
	font-weight: 600;
}

.subtitle {
	color: #ccc;
	text-align: center;
	margin-bottom: 30px;
	font-size: 0.9rem;
}

.form-group {
	margin-bottom: 25px;
	max-width: 390px;
	position: relative;
	left: 50%;
	transform: translateX(-50%);
}

.form-group label {
	display: block;
	color: #fff;
	margin-bottom: 8px;
	font-size: 0.9rem;
	font-weight: 400;
	font-size: 20px;
}

.form-group input {
	width: 100%;
	padding: 15px;
	height: 60px;
	border: 2px solid rgba(255, 255, 255, 0.1);
	border-radius: 15px;
	background: rgba(255, 255, 255, 0.05);
	color: #fff;
	font-size: 1rem;
	font-family: 'JetBrains Mono', monospace;
	transition: all 0.3s ease;
	box-sizing: border-box;
}

.form-group input:focus {
	outline: none;
	border-color: #007bff;
	box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
}

.form-group input::placeholder {
	color: rgba(255, 255, 255, 0.4);
}

.login-btn {
	position: relative;
	left: 50%;
	transform: translateX(-50%);
	width: 100%;
	max-width: 120px;
	height: 43px;
	padding: 15px;
	color: #fff;
	border: none;
	border-radius: 100px;
	border: white solid 1px;
	box-sizing: border-box;
	font-size: 1rem;
	font-weight: 600;
	cursor: pointer;
	transition: all 0.3s ease;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 10px;
	font-family: 'JetBrains Mono', monospace;
}

.login-btn:hover:not(:disabled) {
	transform: translate(-50%,  -2px);
	/* box-shadow: 0 5px 15px ; */
}

.login-btn:disabled {
	opacity: 0.6;
	cursor: not-allowed;
	transform: translate(-50%, 0);
}

.spinner {
	width: 20px;
	height: 20px;
	animation: spin 1s linear infinite;
}

@keyframes spin {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}

.error-message {
	color: #ff4444;
	background: rgba(255, 68, 68, 0.1);
	padding: 15px;
	border-radius: 10px;
	margin-top: 20px;
	text-align: center;
	font-size: 0.9rem;
	border: 1px solid rgba(255, 68, 68, 0.3);
}

.login-help {
	margin-top: 30px;
	text-align: center;
	color: #ccc;
	font-size: 0.85rem;
}

.demo-info {
	background: rgba(255, 255, 255, 0.05);
	padding: 15px;
	border-radius: 10px;
	margin-top: 15px;
	border: 1px solid rgba(255, 255, 255, 0.1);
}

/* 歡迎頁面樣式 */
.welcome-section {
	width: 100%;
	height: 100%;
	/* max-width: 600px; */
}

.profile-info-grid {
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-template-rows: 1fr 1fr 1fr 1fr;
	gap: 20px;
	width: 40%;
	left: 10%;
	top: 6%;
	bottom: 50%;
	position: relative;
	/* TODO: make it responsive */
	font-size: 24px;
}

.welcome-content {
	background: rgba(255, 255, 255, 0.05);
	backdrop-filter: blur(10px);
	border-radius: 20px;
	padding: 40px;
	box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
	border: 1px solid rgba(255, 255, 255, 0.1);
	text-align: center;
}

.borrow-history-grid {
	/* display: grid;
	grid-template-columns: 1fr 1fr;
	grid-template-rows: 1fr; */
	bottom: 0;
	gap: 10px;
	height: 55%;
	width: 100%;
	position: absolute;
	font-size: 24px;
}
.logout-btn {
	position: absolute;
	right: 10%;
	bottom: 10px;
	height: 40px;
	width: 100%;
	max-width: 120px;
	padding: 15px;
	color: #fff;
	border: none;
	border-radius: 100px;
	border: white solid 1px;
	box-sizing: border-box;
	font-size: 1rem;
	font-weight: 600;
	cursor: pointer;
	transition: all 0.3s ease;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 10px;
	font-family: 'JetBrains Mono', monospace;
}
.logout-btn:hover {
	transform: translate(0,  -2px);
	/* box-shadow: 0 5px 15px ; */
}

.reviews-container {
	height: 100%;
	position: relative;
	width: 100%;
	overflow-x: scroll;
}
.sep-line {
	/* TODO: set width in mounted */
	height: 1px;
	background-color: white;
	top: 15%;
	position: absolute;
	left: 63.2px;
	/* width: calc(100% - 63.2px); */
}
.work-format {
	/* grid-column: span 2; */
	grid-row: 1 / 2;
	height: 100%;
	position: relative;
}
.format-label {
	height: 30%;
	width: fit-content;
	position: sticky;
	left: 7%;
	font-size: large;
	height: 100%;
}

.review-item {
	height: 100%;
	width: fit-content;
	box-sizing: border-box;
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	grid-template-rows: 15% 85%;
	column-gap: 20px;
	padding: 0 63.2px;
}

.review-card {
	background: rgba(255, 255, 255, 0.2);
	backdrop-filter: blur(10px);
	/* height: 83%; */
	position: relative;
	top: 15%;
	border-radius: 15px;
	padding: 10% 10% 7% 10%;
	box-sizing: border-box;
	display: grid;
	grid-template-rows: 2fr 2fr 1fr;
	/* TODO: make it responsive */
	aspect-ratio: 263 / 210;
	width: 200px;
}
.review-title {
	height: fit-content;
	font-size: medium;
	color: #fff;
	font-family: 'JetBrains Mono';
	font-style: normal;
	font-weight: 400;
	text-align: center;
}
.borrow-date-info {
	height: fit-content;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-content: space-between; /* Lines spread between top and bottom */
	text-align: justify;
	font-size: small;
	color: #ccc;
	position: relative;
}
.review-description {
	font-size: large;
	color: #fff;
	font-family: 'JetBrains Mono';
	font-style: normal;
	font-weight: 400;
}
.return-borrow-button {
	height: fit-content;
	display: flex;
	justify-content: center;
	align-items: center;
}

.book-actions {
	display: flex;
	justify-content: flex-end;
}
.action-link {
	padding: 4px 8px;
	box-sizing: border-box;
	width: 80px;
	background: none;
	border: 1px solid white;
	color: #fff;
	text-decoration: none;
	border-radius: 100px;
	text-align: center;
	font-size: 0.8rem;
	font-weight: 500;
	transition: all 0.3s ease;
}

.action-link:hover {
	transform: translateY(-1px);
	box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.welcome-content h1 {
	color: #fff;
	font-size: 2.5rem;
	margin-bottom: 20px;
	font-weight: 600;
}

.welcome-message {
	color: #ccc;
	font-size: 1.1rem;
	margin-bottom: 30px;
	line-height: 1.6;
}

.user-info-card {
	background: rgba(255, 255, 255, 0.05);
	border-radius: 15px;
	padding: 25px;
	margin-bottom: 30px;
	border: 1px solid rgba(255, 255, 255, 0.1);
}

.user-info-card h3 {
	color: #fff;
	margin-bottom: 20px;
	font-size: 1.3rem;
}

.label {
	color: #ccc;
	font-weight: 500;
}

.action-btn {
	padding: 12px 25px;
	border-radius: 10px;
	font-size: 0.9rem;
	font-weight: 600;
	text-decoration: none;
	border: none;
	cursor: pointer;
	transition: all 0.3s ease;
	font-family: 'JetBrains Mono', monospace;
	min-width: 120px;
}

.action-btn.primary {
	background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
	color: #fff;
}

.action-btn.secondary {
	background: linear-gradient(135deg, #6c757d 0%, #495057 100%);
	color: #fff;
}

.action-btn.logout {
	background: linear-gradient(135deg, #dc3545 0%, #c82333 100%);
	color: #fff;
}

.action-btn:hover {
	transform: translateY(-2px);
	box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

/* 響應式設計 */
@media (max-width: 768px) {
	.join-us-container {
		padding: 10px;
	}

	.login-form,
	.welcome-content {
		padding: 30px 20px;
	}

	.login-form h2,
	.welcome-content h1 {
		font-size: 1.8rem;
	}

	.action-btn {
		width: 100%;
		max-width: 300px;
	}
}

.borrow-date,
.return-date {
	color: white;
}
.days-borrowed {
	color: white;
	font-weight: 500;
}
</style>
