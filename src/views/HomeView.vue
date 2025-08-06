<template>
	<div class="Home_Container">
		<div class="Title_Container">NTU<br />SCI-FI <br />ASSOCIATION</div>
		<div class="news-card">
			<div class="news-body" @touchstart="handleTouchStart" @touchend="handleTouchEnd">
				<!-- 顯示當前頁面的公告內容 -->
				<div class="news-content">
					<div v-if="currentPageData.length" class="announcement-item">
						<div v-for="(announcement, idx) in currentPageData" :key="idx" class="announcement-container">
							<!-- 公告標題 -->
							<div class="announcement-title">
								{{ getAnnouncementTitle(announcement) }}
							</div>
							<!-- 公告日期 -->
							<div class="announcement-date">
								{{ getAnnouncementDate(announcement) }}
							</div>
							<!-- 公告內容 -->
							<div class="announcement-content">
								{{ getAnnouncementContent(announcement) }}
							</div>

						</div>
					</div>
					<div v-else class="loading-text">
						{{ sheetData.length === 0 ? '暫無公告' : '載入中...' }}
					</div>
				</div>
				<!-- 底部圓點分頁指示器 -->
				<div class="pagination-dots" v-if="totalPages > 1">
					<span v-for="(page, index) in totalPages" :key="index"
						:class="['dot', { 'active': index === currentPage }]" @click="goToPage(index)"></span>
				</div>
			</div>
		</div>

		<div class="Social_Media_Container">
			<a
				href="https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.instagram.com%2Fntusfa%3Ffbclid%3DIwZXh0bgNhZW0CMTAAAR0pIlVyBsEl-NL-4qCel1XYn_7aMJUMoXRJNpEh60yoNGyXxkH55jw9OfI_aem_OVjuWGRdwwybiCcFTga-dg&h=AT1M2VzLsIXwIJsC-QpEobbxgi9lYSszg-3WFLD47-coyk6oCBoZ8pIsop2dZuQPJBuha7vpwkBqLcpRu5mu8jCBEy7qFnvDg7_ZX7b2Gu1NJ1Nm2LUC0Ccn_1oUfPASljtEbQ2dow">
				<div class="Social_Media_Item">
					<span>INSTAGRAM</span>
					<svg xmlns="http://www.w3.org/2000/svg" width="41" height="41" viewBox="0 0 41 41" fill="none">
						<path
							d="M5.77031 12.5744C5.84826 10.8711 6.11497 9.77256 6.47565 8.84007L6.4805 8.82719C6.83792 7.87829 7.39783 7.01868 8.12126 6.30819L8.13141 6.29822L8.14138 6.28807C8.85247 5.56371 9.71237 5.00435 10.6604 4.64787L10.6768 4.64162C11.6072 4.27981 12.7036 4.0141 14.4083 3.93616M5.77031 12.5744C5.68836 14.3944 5.66748 14.9585 5.66748 19.6771C5.66748 24.3969 5.68722 24.9597 5.77027 26.7801M5.77031 12.5744L5.77031 13.0335M6.48198 30.528C6.83845 31.476 7.39782 32.3359 8.12217 33.047L8.13231 33.057L8.14227 33.0671C8.8528 33.7905 9.71243 34.3505 10.6613 34.7079L10.6755 34.7133C11.6067 35.0744 12.7037 35.3402 14.4083 35.4181M6.48198 30.528L6.47573 30.5116C6.11392 29.5812 5.84821 28.4848 5.77027 26.7801M6.48198 30.528L6.46061 30.4154M5.77027 26.7801L5.79818 26.9271M5.77027 26.7801L5.77027 26.3199M6.46061 30.4154L5.79818 26.9271M6.46061 30.4154C6.17927 29.6721 5.88957 28.6351 5.79818 26.9271M6.46061 30.4154C6.47048 30.4415 6.48034 30.4672 6.49018 30.4926C6.84697 31.4544 7.41229 32.3253 8.14551 33.0428C8.86267 33.7759 9.73327 34.3411 10.6948 34.6978C11.4664 34.9984 12.5537 35.3125 14.4081 35.3975C16.2794 35.4827 16.8575 35.5 21.5113 35.5C26.165 35.5 26.7436 35.4826 28.6149 35.3975C30.4716 35.3124 31.5576 34.9965 32.3265 34.6983C33.2886 34.3417 34.1597 33.7763 34.877 33.0427C35.61 32.3256 36.1752 31.4551 36.532 30.4936C36.8326 29.7219 37.1466 28.6346 37.2316 26.7804C37.3168 24.909 37.3341 24.3297 37.3341 19.6771C37.3341 15.0246 37.3167 14.4448 37.2316 12.5735C37.1461 10.7072 36.8273 9.61952 36.5277 8.84991C36.136 7.83875 35.6393 7.074 34.8758 6.3105C34.1139 5.55002 33.3511 5.05303 32.3392 4.66095C31.5669 4.35899 30.4785 4.04222 28.6149 3.95682C28.4529 3.94944 28.3005 3.94257 28.1544 3.93618M5.79818 26.9271C5.7956 26.8789 5.79318 26.8301 5.79092 26.7808C5.78354 26.6186 5.77667 26.4661 5.77027 26.3199M14.4083 3.93616C16.2287 3.85311 16.7926 3.83337 21.5113 3.83337C26.2298 3.83337 26.7936 3.85424 28.6134 3.93618M14.4083 3.93616L14.8686 3.93616M28.6134 3.93618L28.1544 3.93618M28.6134 3.93618C30.3171 4.0141 31.4158 4.28077 32.3484 4.64149L32.3612 4.64639C33.3101 5.00381 34.1697 5.56372 34.8802 6.28716L34.8901 6.2972L34.9001 6.30707C35.6237 7.01763 36.1835 7.87747 36.5406 8.82663L36.5468 8.84269C36.9086 9.77305 37.1743 10.8695 37.2522 12.5742M14.8686 3.93616L28.1544 3.93618M14.8686 3.93616C16.41 3.86876 17.262 3.85426 21.5113 3.85426C25.7609 3.85426 26.6127 3.86877 28.1544 3.93618M14.8686 3.93616C14.7223 3.94256 14.5698 3.94943 14.4076 3.95682C12.5509 4.0419 11.4649 4.35777 10.696 4.656C9.73032 5.01398 8.85633 5.58231 8.1374 6.31982C7.38103 7.0793 6.88594 7.8404 6.49511 8.84903C6.19313 9.62138 5.87631 10.7103 5.7909 12.5739C5.78354 12.7356 5.77669 12.8877 5.77031 13.0335M37.2522 26.7801C37.1743 28.4847 36.9086 29.5817 36.5474 30.5129L36.542 30.5271C36.1846 31.476 35.6247 32.3356 34.9012 33.0461L34.8911 33.0561L34.8811 33.0662C34.17 33.7906 33.3101 34.3499 32.3621 34.7064L32.3457 34.7127C31.4153 35.0745 30.3189 35.3402 28.6142 35.4181M5.77027 26.3199C5.70287 24.7784 5.68836 23.9265 5.68836 19.6771C5.68836 15.4266 5.70286 14.5758 5.77031 13.0335M5.77027 26.3199L5.77031 13.0335M18.6933 26.4802C19.5867 26.8503 20.5443 27.0407 21.5113 27.0407C23.4642 27.0407 25.3372 26.2649 26.7181 24.884C28.0991 23.5031 28.8749 21.6301 28.8749 19.6771C28.8749 17.7242 28.0991 15.8512 26.7181 14.4703C25.3372 13.0894 23.4642 12.3135 21.5113 12.3135C20.5443 12.3135 19.5867 12.504 18.6933 12.8741C17.7999 13.2441 16.9882 13.7865 16.3044 14.4703C15.6206 15.1541 15.0782 15.9658 14.7082 16.8592C14.3381 17.7526 14.1477 18.7101 14.1477 19.6771C14.1477 20.6441 14.3381 21.6017 14.7082 22.4951C15.0782 23.3885 15.6206 24.2002 16.3044 24.884C16.9882 25.5678 17.7999 26.1102 18.6933 26.4802ZM16.288 14.4539C17.6733 13.0686 19.5522 12.2903 21.5113 12.2903C23.4704 12.2903 25.3492 13.0686 26.7345 14.4539C28.1198 15.8392 28.8981 17.718 28.8981 19.6771C28.8981 21.6362 28.1198 23.5151 26.7345 24.9004C25.3492 26.2857 23.4704 27.0639 21.5113 27.0639C19.5522 27.0639 17.6733 26.2857 16.288 24.9004C14.9027 23.5151 14.1245 21.6362 14.1245 19.6771C14.1245 17.718 14.9027 15.8392 16.288 14.4539ZM33.0575 10.5705C33.0575 11.1313 32.8348 11.669 32.4383 12.0655C32.0418 12.462 31.504 12.6848 30.9433 12.6848C30.3825 12.6848 29.8448 12.462 29.4483 12.0655C29.0518 11.669 28.829 11.1313 28.829 10.5705C28.829 10.0098 29.0518 9.47203 29.4483 9.07553C29.8448 8.67904 30.3825 8.45629 30.9433 8.45629C31.504 8.45629 32.0418 8.67904 32.4383 9.07553C32.8348 9.47203 33.0575 10.0098 33.0575 10.5705Z"
							stroke="white" stroke-linejoin="round" />
					</svg>
				</div>
			</a>

			<a href="https://www.facebook.com/ntustarfleetacademy">
				<div class="Social_Media_Item">
					<span>FACEBOOK</span>
					<svg xmlns="http://www.w3.org/2000/svg" width="41" height="41" viewBox="0 0 41 41" fill="none">
						<path
							d="M37.1683 20.5C37.1683 11.2953 29.7064 3.83337 20.5016 3.83337C11.2969 3.83337 3.83496 11.2953 3.83496 20.5C3.83496 28.8189 9.92972 35.7139 17.8975 36.9642V25.3177H13.6657V20.5H17.8975V16.8282C17.8975 12.6511 20.3857 10.3438 24.1927 10.3438C26.0162 10.3438 27.9235 10.6693 27.9235 10.6693V14.7709H25.8219C23.7515 14.7709 23.1058 16.0556 23.1058 17.3736V20.5H27.7282L26.9893 25.3177H23.1058V36.9642C31.0735 35.7139 37.1683 28.8189 37.1683 20.5Z"
							stroke="white" stroke-linejoin="round" />
					</svg>
				</div>
			</a>

			<a href="hhttps://line.me/ti/g/Ger-bSdykV">
				<div class="Social_Media_Item">
					<span>LINE</span>
					<svg xmlns="http://www.w3.org/2000/svg" width="40" height="33" viewBox="0 0 40 33" fill="none">
						<path
							d="M34.0028 14.2646C34.0028 6.80674 26.5263 0.739237 17.3362 0.739237C8.14665 0.739237 0.669434 6.80674 0.669434 14.2646C0.669434 20.9504 6.59869 26.5499 14.6081 27.6083C15.1507 27.7256 15.8896 27.9663 16.0763 28.4303C16.2444 28.8515 16.1863 29.5116 16.1303 29.9372C16.1303 29.9372 15.9347 31.1133 15.8923 31.3641C15.8196 31.7851 15.5573 33.012 17.3362 32.2626C19.1149 31.5129 26.9342 26.6107 30.431 22.5863H30.4302C32.8455 19.9373 34.0028 17.2491 34.0028 14.2646Z"
							stroke="white" stroke-linejoin="round" />
						<path fill-rule="evenodd" clip-rule="evenodd"
							d="M24.526 11.7291H28.0264V11.4108H24.2075V17.8209H28.0264V17.5025H24.526V14.7751H28.0264V14.4565H24.526V11.7291ZM7.20534 17.5025V11.4108H6.88696V17.8209H10.7059V17.5025H7.20534ZM21.2529 17.5722L16.6903 11.4106H16.1613V17.8209H16.4796V11.6608L21.0412 17.8209H21.5713V11.4106H21.2529V17.5722ZM13.2063 11.4106V17.8209H13.5246V11.4106H13.2063Z"
							stroke="white" stroke-linejoin="round" />
					</svg>
				</div>
			</a>
		</div>
	</div>
</template>
<!-- https://imgur.com/a/cqa6TPP -->
<script>
export default {
	data() {
		return {
			sheetData: [],
			currentPage: 0,
			itemsPerPage: 1, // 每頁顯示1個項目
			touchStartX: 0,
			touchEndX: 0
		};
	},
	computed: {
		totalPages() {
			return Math.max(1, this.sheetData.length);
		},
		currentPageData() {
			if (this.sheetData.length === 0) return [];
			const currentItem = this.sheetData[this.currentPage];
			return currentItem ? [currentItem] : [];
		}
	},
	methods: {
		nextPage() {
			if (this.currentPage < this.totalPages - 1) {
				this.currentPage++;
			}
		},
		previousPage() {
			if (this.currentPage > 0) {
				this.currentPage--;
			}
		},
		goToPage(pageIndex) {
			this.currentPage = pageIndex;
		},
		getAnnouncementTitle(announcement) {
			// 假設 Google Sheets 第一欄是標題
			if (Array.isArray(announcement) && announcement.length > 0) {
				return announcement[0] || '無標題';
			}
			return '無標題';
		},
		getAnnouncementContent(announcement) {
			// 假設 Google Sheets 第二欄是內容
			if (Array.isArray(announcement) && announcement.length > 1) {
				return announcement[1] || '無內容';
			}
			return '無內容';
		},
		getAnnouncementDate(announcement) {
			// 假設 Google Sheets 第三欄是日期
			if (Array.isArray(announcement) && announcement.length > 2) {
				return announcement[2] || '';
			}
			return '';
		},
		handleTouchStart(e) {
			this.touchStartX = e.touches[0].clientX;
		},
		handleTouchEnd(e) {
			this.touchEndX = e.changedTouches[0].clientX;
			this.handleSwipe();
		},
		handleSwipe() {
			const swipeThreshold = 50; // 最小滑動距離
			const diff = this.touchStartX - this.touchEndX;

			if (Math.abs(diff) > swipeThreshold) {
				if (diff > 0) {
					// 向左滑動，下一頁
					this.nextPage();
				} else {
					// 向右滑動，上一頁
					this.previousPage();
				}
			}
		},
		handleKeydown(e) {
			if (e.key === 'ArrowLeft') {
				this.previousPage();
			} else if (e.key === 'ArrowRight') {
				this.nextPage();
			}
		}
	},
	async mounted() {
		// 使用 Google Sheets API
		try {
			const res = await fetch('/api/board');
			const rawData = await res.json();
			console.log('原始Google Sheets資料:', rawData);

			// 處理 Google Sheets 資料結構，跳過第一個Row（標題行）
			if (Array.isArray(rawData) && rawData.length > 1) {
				// 跳過第一行（索引0），從第二行開始取資料
				this.sheetData = rawData.slice(1);
			} else if (Array.isArray(rawData) && rawData.length === 1) {
				// 如果只有標題行，使用空陣列
				this.sheetData = [];
			} else {
				// 如果沒有資料，使用空陣列
				this.sheetData = [];
			}

			console.log('處理後的資料（跳過第一行）:', this.sheetData);
			console.log('總頁數:', this.totalPages);
		} catch (error) {
			console.error('Error fetching board data:', error);
			// 如果API失敗，使用空陣列
			this.sheetData = [];
		}

		// 添加鍵盤導航支持
		window.addEventListener('keydown', this.handleKeydown);
	},
	beforeUnmount() {
		// 清理事件監聽器
		window.removeEventListener('keydown', this.handleKeydown);
	}
}
</script>
<style>
:root {
	--social-media-container-height: 150px;
}
</style>
<style scoped>
/* Base styles for desktop */
.Home_Container {
	display: flex;
	flex-direction: column;
	/* Changed to column for better stacking */
	position: relative;
	min-height: 100%;
	/* Ensure full height */
	padding: 20px;
	box-sizing: border-box;
}

.Title_Container {
	position: absolute;
	bottom: 83px;
	left: 100px;
	padding: 0 0 20px 10px;
	font-size: 3rem;
	color: #fff;
	font-family: "JetBrains Mono";
	font-style: normal;
	font-weight: 600;
}

.news-card {
	background: rgba(255, 255, 255, 0.2);
	backdrop-filter: blur(10px);
	border-radius: 15px;
	position: absolute;
	right: 60px;
	left: 63%;
	top: 60px;
	bottom: 83px;
}

.news-body {
	width: 100%;
	height: 100%;
	position: relative;
	display: flex;
	flex-direction: column;
}

.news-content {
	padding: 5% 5%;
	flex: 1;
	display: flex;
	flex-direction: column;
	overflow: hidden;
	user-select: none;
	height: calc(100% - 60px);
}

.announcement-item {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	overflow: hidden;
}

.announcement-container {
	height: 100%;
	display: flex;
	flex-direction: column;
	position: relative;
	padding: 0;
	overflow: hidden;
}

.announcement-title {
	color: #fff;
	font-family: "JetBrains Mono";
	font-size: 1.5rem;
	margin-bottom: 5px;
	text-align: left;
	flex-shrink: 0;
	word-wrap: break-word;
	overflow-wrap: break-word;
}

.announcement-content {
	color: #fff;
	font-family: "JetBrains Mono";
	font-size: 1rem;
	font-weight: 400;
	line-height: 1.6;
	flex: 1;
	text-align: left;
	white-space: pre-wrap;
	word-wrap: break-word;
	overflow-wrap: break-word;
	overflow-y: auto;
	/* padding-right: 10px; */
}

.announcement-date {
	color: #fff;
	font-family: "JetBrains Mono";
	font-size: 1rem;
	margin-bottom: 20px;
	flex-shrink: 0;
}

.loading-text {
	color: #fff;
	font-family: "JetBrains Mono";
	font-size: 1rem;
	text-align: center;
	margin: auto;
}

.pagination-dots {
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 12px;
	position: absolute;
	bottom: 20px;
	left: 50%;
	transform: translateX(-50%);
	z-index: 10;
}

.dot {
	width: 8px;
	height: 8px;
	border-radius: 50%;
	background-color: rgba(255, 255, 255, 0.4);
	cursor: pointer;
	transition: all 0.3s ease;
}

.dot.active {
	background-color: white;
	transform: scale(1.3);
}

.dot:hover {
	background-color: rgba(255, 255, 255, 0.6);
}



.news-content ul {
	margin: 0;
	padding: 0;
	list-style: none;
}

.news-content li {
	color: #fff;
	font-family: "JetBrains Mono";
	font-size: 0.9rem;
	padding: 8px 0;
	border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.news-content li:last-child {
	border-bottom: none;
}

.Social_Media_Container {
	display: flex;
	justify-content: flex-start;
	align-items: center;
	position: absolute;
	bottom: 0;
	left: 100px;
	right: 40%;
	height: 83px;
	border-top: 2px solid #fff;
	gap: 2rem;
	/* 固定間距 */
	padding-left: 1rem;
}

.Social_Media_Item {
	display: flex;
	color: #fff;
	align-items: center;
	gap: 0.5rem;
	min-width: 150px;
	/* 固定最小寬度 */
	justify-content: center;

}

.Social_Media_Item svg {
	width: 2.5rem;
	height: 2.5rem;
}

.Social_Media_Item svg path {
	stroke: white;
}

.Social_Media_Item span {
	font-family: "JetBrains Mono";
	font-size: 1rem;
	color: white;
	text-transform: uppercase;
	text-align: center;
}

/* Mobile styles (for phone browsers) */
@media (max-width: 768px) {
	.Home_Container {
		padding: 10px;
		/* Reduce padding for smaller screens */
		height: calc(200% + var(--social-media-container-height));
		overflow-y: scroll;
	}

	.Title_Container {
		position: static;
		/* Remove absolute positioning */
		font-size: 2rem;
		/* Reduce font size */
		padding: 10px 0;
		/* Adjust padding */
		text-align: center;
		/* Center the title */
		height: calc((100% - var(--social-media-container-height)) / 2);
		align-content: center;
	}

	.news-card {
		position: static;
		top: 0;
		bottom: 0;
		width: 90%;
		position: relative;
		left: 50%;
		transform: translateX(-50%);
		margin: 20px 0;
		height: calc((100% - var(--social-media-container-height)) / 2);
	}

	.news-content {
		height: calc(100% - 40px);
	}

	.announcement-title {
		font-size: 1.5rem;
		margin-bottom: 8px;
	}

	.announcement-content {
		font-size: 1rem;
		line-height: 1.6;
		margin-bottom: 50px;
		/* padding-right: 5px; */
	}

	.announcement-date {
		font-size: 0.9rem;
		margin-bottom: 12px;
	}

	.pagination-dots {
		gap: 9px;
		bottom: 15px;
	}

	.dot {
		width: 6px;
		height: 6px;
	}

	.Social_Media_Container {
		position: static;
		/* Remove absolute positioning */
		width: 100%;
		/* Full width */
		flex-direction: column;
		/* Stack items vertically */
		gap: 1rem;
		/* Reduce gap between items */
		padding: 10px 0;
		/* Adjust padding */
		border-top: none;
		/* Remove border for cleaner look */
		align-items: center;
		/* Center items */
		height: var(--social-media-container-height);
	}

	.Social_Media_Item {
		flex-direction: row;
		/* Keep icon and text side by side */
		gap: 0.3rem;
		/* Slightly smaller gap */
	}

	.Social_Media_Item svg {
		width: 2rem;
		/* Smaller icons */
		height: 2rem;
	}

	.Social_Media_Item span {
		font-size: 0.9rem;
		/* Smaller text */
	}
}
</style>
