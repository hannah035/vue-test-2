<script setup>

</script>

<template>
    <div class="Header">
            <!-- Header Left Contents -->
            <div class="HeaderLeftContents">
                <a href="/">Home</a>
                <a href="/events">Events</a>
                <a href="/reviews">Reviews</a>
                <a href="#books">Books</a>
                <a href="#abouts">Abouts</a>
            </div>

            <!-- Header Right Contents -->
            <div class="HeaderRightContents">
                <div class="Icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="10 10 50 50" fill="none">
                        <circle cx="35.3555" cy="35.3553" r="16.6667" transform="rotate(-135 35.3555 35.3553)"
                            stroke="white" stroke-width="1.00088" stroke-linejoin="round" />
                        <path d="M39.7749 31.6724L30.1995 41.2478" stroke="white" stroke-width="1.00088"
                            stroke-linejoin="round" />
                        <path d="M31.6726 30.9358C35.1244 30.9358 37.0597 30.9358 40.5115 30.9358L40.5115 39.7747"
                            stroke="white" stroke-width="1.00088" stroke-linejoin="round" />
                    </svg>
                </div>
                <a href="#contacts">Contacts</a>
            </div>
        </div>  
</template>

<style scoped>
    
.Header {
    display: flex;
    /* 使用 Flexbox 布局 */
    width: 100%;
    /* 寬度隨父容器變化 */
    height: 83px;
    /* 固定高度 */
    justify-content: space-between;
    /* 左右內容分開 */
    align-items: center;
    /* 子元素垂直置中 */
    flex-shrink: 0;
    /* 禁止子元素因空間不足而縮小 */
    position: relative;
    /* 保留正常文檔流 */
    top: 45px;
    /* 與視窗頂部保持距離 */
    border-top: 1px solid #FFF;
    /* 設置頂部邊框為白色 */
    border-bottom: 1px solid #FFF;
    /* 設置底部邊框為白色 */
}


.HeaderLeftContents {
    display: flex;
    /* Flex 布局 */
    justify-content: flex-start;
    /* 靠左對齊 */
    margin: 0 0 0 231px;
    /* 上右下左的外邊距 */
    gap: 1.5rem;
    /* 左右鏈接之間的間距 */
}

.HeaderLeftContents a::before {
    content: "•";
    /* 添加點 */
    color: #ffffff;
    /* 點的顏色 */
    margin-right: 0.45rem;
    /* 調整點與文字之間的距離 */
    font-size: 1rem;
    /* 點的大小 */
}

.HeaderLeftContents a {
    text-decoration: none;
    color: #ffffff;
    font-size: 1rem;
    /* 字體大小 */
    font-family: "JetBrains Mono";
}

/* 右側內容樣式 */
.HeaderRightContents {
    display: flex;
    /* 使用 Flexbox */
    justify-content: flex-end;
    /* 靠右對齊 */
    margin: 0 134px 0 0;
    /* 上右下左的外邊距 */
    align-items: center;
    /* 確保垂直方向居中 */
    gap: 0rem;
}

/* 右側內容的鏈接樣式 */
.HeaderRightContents a {
    text-decoration: none;
    /* 移除下劃線 */
    color: #ffffff;
    /* 白色文字 */
    font-size: 1rem;
    /* 字體大小 */
    z-index: 20;
    font-family: "JetBrains Mono";
}


.Icon {
    display: flex; /* 使用 Flexbox 布局 */
    justify-content: center; /* 水平居中 */
    align-items: center; /* 垂直居中 */
    width: 2.75rem; /* 固定寬度 */
    height: 2.75rem; /* 固定高度 */
    flex-shrink: 0; /* 禁止縮小 */
    box-sizing: border-box; /* 確保 padding 不影響寬高 */
}
</style>