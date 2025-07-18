<template>
	<div class="join-us-container">
		<!-- 登入表單 -->
		<div v-if="!isLoggedIn" class="login-section">
			<div class="login-form">
				<h2>Join Our Community</h2>
				<p class="subtitle">Login to access exclusive content and features</p>
				
				<form @submit.prevent="login">
					<div class="form-group">
						<label for="email">Email Address</label>
						<input 
							type="email" 
							id="email" 
							v-model="loginForm.email" 
							required 
							:disabled="loginLoading"
							placeholder="Enter your email"
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
							placeholder="Enter your password"
						/>
					</div>
					
					<button type="submit" :disabled="loginLoading" class="login-btn">
						<span v-if="loginLoading">
							<svg class="spinner" viewBox="0 0 50 50">
								<circle cx="25" cy="25" r="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-dasharray="31.416" stroke-dashoffset="31.416">
									<animate attributeName="stroke-dasharray" dur="2s" values="0 31.416;15.708 15.708;0 31.416" repeatCount="indefinite"/>
									<animate attributeName="stroke-dashoffset" dur="2s" values="0;-15.708;-31.416" repeatCount="indefinite"/>
								</circle>
							</svg>
							Logging in...
						</span>
						<span v-else>Login</span>
					</button>
					
					<div v-if="loginError" class="error-message">
						{{ loginError }}
					</div>
				</form>
				
				<div class="login-help">
					<p>Don't have an account? Contact us to get started!</p>
					<p class="demo-info">
						<strong>Demo Account:</strong><br>
						Email: ming.zhang@email.com<br>
						Password: $2b$10$encrypted_password_hash
					</p>
				</div>
			</div>
		</div>

		<!-- 登入成功後的歡迎頁面 -->
		<div v-else class="welcome-section">
			<div class="welcome-content">
				<h1>Welcome, {{ currentUser.nickname }}!</h1>
				<p class="welcome-message">
					You've successfully joined our community. Explore exclusive content and connect with fellow sci-fi enthusiasts!
				</p>
				
				<div class="user-info-card">
					<h3>Your Profile</h3>
					<div class="profile-info">
						<div class="info-item">
							<span class="label">Name:</span>
							<span class="value">{{ currentUser.name }}</span>
						</div>
						<div class="info-item">
							<span class="label">Email:</span>
							<span class="value">{{ currentUser.email }}</span>
						</div>
						<div class="info-item">
							<span class="label">Nickname:</span>
							<span class="value">{{ currentUser.nickname }}</span>
						</div>
						<div class="info-item">
							<span class="label">Member Since:</span>
							<span class="value">{{ formatDate(currentUser.createdAt) }}</span>
						</div>
					</div>
				</div>

				<!-- 借閱記錄區域 -->
				<div class="borrowing-section">
					<div class="borrowing-tabs">
						<button 
							@click="activeTab = 'borrowed'"
							:class="{ active: activeTab === 'borrowed' }"
							class="tab-btn"
						>
							借閱中的書 ({{ borrowedBooks.length }})
						</button>
						<button 
							@click="activeTab = 'history'"
							:class="{ active: activeTab === 'history' }"
							class="tab-btn"
						>
							借閱過的書 ({{ borrowingHistory.length }})
						</button>
					</div>

					<div class="borrowing-content">
						<!-- 借閱中的書 -->
						<div v-if="activeTab === 'borrowed'" class="borrowed-books">
							<div v-if="borrowedBooks.length === 0" class="empty-state">
								<p>目前沒有借閱中的書籍</p>
								<router-link to="/books" class="browse-link">去借閱書籍</router-link>
							</div>
							<div v-else class="books-grid">
								<div 
									v-for="record in borrowedBooks" 
									:key="record._id"
									class="book-card"
								>
									<div class="book-info">
										<h4>{{ record.bookTitle }}</h4>
										<p class="borrow-date">借閱日期: {{ formatDate(record.borrowDate) }}</p>
										<p class="days-borrowed">已借閱: {{ calculateDaysBorrowed(record.borrowDate) }} 天</p>
									</div>
									<div class="book-actions">
										<router-link 
											:to="{ path: '/books', query: { bookId: record.bookId } }" 
											class="action-link view-book"
										>
											歸還書籍
										</router-link>
									</div>
								</div>
							</div>
						</div>

						<!-- 借閱過的書 -->
						<div v-if="activeTab === 'history'" class="history-books">
							<div v-if="borrowingHistory.length === 0" class="empty-state">
								<p>沒有借閱歷史記錄</p>
								<router-link to="/books" class="browse-link">去借閱書籍</router-link>
							</div>
							<div v-else class="books-grid">
								<div 
									v-for="record in borrowingHistory" 
									:key="record._id"
									class="book-card history-card"
								>
									<div class="book-info">
										<h4>{{ record.bookTitle }}</h4>
										<p class="borrow-date">借閱日期: {{ formatDate(record.borrowDate) }}</p>
										<p class="return-date">歸還日期: {{ formatDate(record.returnDate) }}</p>
										<p class="duration">借閱時間: {{ calculateBorrowDuration(record.borrowDate, record.returnDate) }} 天</p>
									</div>
									<div class="book-actions">
										<router-link 
											:to="{ path: '/books', query: { bookId: record.bookId } }" 
											class="action-link view-book"
										>
											再次借閱
										</router-link>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div class="action-buttons">
					<router-link to="/reviews2" class="action-btn primary">
						View Reviews
					</router-link>
					<router-link to="/books" class="action-btn secondary">
						Browse Books
					</router-link>
					<button @click="logout" class="action-btn logout">
						Logout
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import reviewsService from '@/services/reviewsService'
import recordService from '@/services/recordService'

export default {
	name: "JoinUsView",
	data() {
		return {
			isLoggedIn: false,
			loginLoading: false,
			loginError: null,
			loginForm: {
				email: '',
				password: ''
			},
			currentUser: null,
			activeTab: 'borrowed',
			borrowedBooks: [],
			borrowingHistory: []
		}
	},
	methods: {
		async login() {
			try {
				this.loginLoading = true
				this.loginError = null
				
				const response = await reviewsService.login(this.loginForm.email, this.loginForm.password)
				if (response.success) {
					this.isLoggedIn = true
					this.currentUser = response.data.user
					
					// 儲存登入狀態到 localStorage
					localStorage.setItem('currentUser', JSON.stringify(response.data.user))
					localStorage.setItem('isLoggedIn', 'true')
					
					// 載入借閱記錄
					await this.loadBorrowingRecords()
				} else {
					this.loginError = response.error || 'Login failed'
				}
			} catch (error) {
				console.error('Login error:', error)
				this.loginError = 'Login failed. Please check your credentials and try again.'
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
				const userRecords = allRecords.filter(record => record.userId === this.currentUser._id)
				
				// 分離借閱中的書和借閱過的書
				this.borrowedBooks = userRecords.filter(record => record.status === 'borrowed')
				this.borrowingHistory = userRecords.filter(record => record.status === 'returned')
			} catch (error) {
				console.error('Failed to load borrowing records:', error)
			}
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
				day: 'numeric'
			})
		}
	},
	mounted() {
		this.checkLoginStatus()
	}
}
</script>

<style scoped>
.join-us-container {
	min-height: 100vh;
	background: linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%);
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 20px;
	font-family: 'JetBrains Mono', monospace;
}

/* 登入表單樣式 */
.login-section {
	width: 100%;
	max-width: 450px;
}

.login-form {
	background: rgba(255, 255, 255, 0.05);
	backdrop-filter: blur(10px);
	border-radius: 20px;
	padding: 40px;
	box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
	border: 1px solid rgba(255, 255, 255, 0.1);
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
}

.form-group label {
	display: block;
	color: #fff;
	margin-bottom: 8px;
	font-size: 0.9rem;
	font-weight: 500;
}

.form-group input {
	width: 100%;
	padding: 15px;
	border: 2px solid rgba(255, 255, 255, 0.1);
	border-radius: 10px;
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
	width: 100%;
	padding: 15px;
	background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
	color: #fff;
	border: none;
	border-radius: 10px;
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
	background: linear-gradient(135deg, #0056b3 0%, #003d82 100%);
	transform: translateY(-2px);
	box-shadow: 0 5px 15px rgba(0, 123, 255, 0.3);
}

.login-btn:disabled {
	opacity: 0.6;
	cursor: not-allowed;
	transform: none;
}

.spinner {
	width: 20px;
	height: 20px;
	animation: spin 1s linear infinite;
}

@keyframes spin {
	0% { transform: rotate(0deg); }
	100% { transform: rotate(360deg); }
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
	max-width: 600px;
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

.profile-info {
	display: flex;
	flex-direction: column;
	gap: 15px;
}

.info-item {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 10px 0;
	border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.info-item:last-child {
	border-bottom: none;
}

.label {
	color: #ccc;
	font-weight: 500;
}

.value {
	color: #fff;
	font-weight: 600;
}

.action-buttons {
	display: flex;
	gap: 15px;
	justify-content: center;
	flex-wrap: wrap;
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
	
	.info-item {
		flex-direction: column;
		align-items: flex-start;
		gap: 5px;
	}
	
	.action-buttons {
		flex-direction: column;
		align-items: center;
	}
	
	.action-btn {
		width: 100%;
		max-width: 300px;
	}
}

/* 借閱記錄樣式 */
.borrowing-section {
	background: rgba(255, 255, 255, 0.05);
	border-radius: 15px;
	padding: 25px;
	margin-bottom: 30px;
	border: 1px solid rgba(255, 255, 255, 0.1);
}

.borrowing-tabs {
	display: flex;
	margin-bottom: 25px;
	border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.tab-btn {
	background: none;
	border: none;
	color: #ccc;
	padding: 12px 20px;
	cursor: pointer;
	font-family: 'JetBrains Mono', monospace;
	font-size: 0.9rem;
	font-weight: 500;
	transition: all 0.3s ease;
	border-bottom: 2px solid transparent;
}

.tab-btn.active {
	color: #007bff;
	border-bottom-color: #007bff;
}

.tab-btn:hover {
	color: #fff;
}

.borrowing-content {
	min-height: 200px;
}

.books-grid {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
	gap: 20px;
}

.book-card {
	background: rgba(255, 255, 255, 0.08);
	border-radius: 12px;
	padding: 20px;
	border: 1px solid rgba(255, 255, 255, 0.1);
	transition: all 0.3s ease;
}

.book-card:hover {
	transform: translateY(-2px);
	box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
	border-color: rgba(255, 255, 255, 0.2);
}

.book-card.history-card {
	background: rgba(255, 255, 255, 0.03);
}

.book-info h4 {
	color: #fff;
	margin-bottom: 12px;
	font-size: 1.1rem;
	font-weight: 600;
}

.book-info p {
	color: #ccc;
	margin-bottom: 8px;
	font-size: 0.85rem;
}

.borrow-date,
.return-date {
	color: #aaa;
}

.days-borrowed {
	color: #ffc107;
	font-weight: 500;
}

.duration {
	color: #28a745;
	font-weight: 500;
}

.book-actions {
	margin-top: 15px;
	display: flex;
	justify-content: flex-end;
}

.action-link {
	padding: 8px 16px;
	background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
	color: #fff;
	text-decoration: none;
	border-radius: 8px;
	font-size: 0.8rem;
	font-weight: 500;
	transition: all 0.3s ease;
}

.action-link:hover {
	transform: translateY(-1px);
	box-shadow: 0 3px 10px rgba(0, 123, 255, 0.3);
}

.empty-state {
	text-align: center;
	padding: 40px 20px;
	color: #ccc;
}

.empty-state p {
	margin-bottom: 20px;
	font-size: 1rem;
}

.browse-link {
	display: inline-block;
	padding: 10px 20px;
	background: linear-gradient(135deg, #28a745 0%, #1e7e34 100%);
	color: #fff;
	text-decoration: none;
	border-radius: 10px;
	font-size: 0.9rem;
	font-weight: 500;
	transition: all 0.3s ease;
}

.browse-link:hover {
	transform: translateY(-2px);
	box-shadow: 0 5px 15px rgba(40, 167, 69, 0.3);
}

/* 響應式設計 - 借閱記錄 */
@media (max-width: 768px) {
	.borrowing-section {
		padding: 20px 15px;
	}
	
	.borrowing-tabs {
		flex-direction: column;
		gap: 10px;
	}
	
	.tab-btn {
		padding: 10px 15px;
		border-radius: 8px;
		border-bottom: none;
	}
	
	.tab-btn.active {
		background: rgba(0, 123, 255, 0.2);
		border-bottom: none;
	}
	
	.books-grid {
		grid-template-columns: 1fr;
		gap: 15px;
	}
	
	.book-card {
		padding: 15px;
	}
	
	.book-info h4 {
		font-size: 1rem;
	}
	
	.book-info p {
		font-size: 0.8rem;
	}
}
</style>
