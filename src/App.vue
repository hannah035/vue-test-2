<script setup>
import Header from "./components/Header.vue"
import { RouterView } from "vue-router"
</script>

<template>
	<link href="https://fonts.googleapis.com/css?family=JetBrains+Mono" rel="stylesheet" />
	<div class="Fixed_Line_Container">
		<div class="Line Bottom_Line"></div>
		<div class="Line Left_Line"></div>
		<div class="Line Right_Line"></div>
	</div>
	<div class="Container">
		<Header />
		<div class="RouterView_Container">
			<router-view> </router-view>
		</div>
	</div>
</template>

<style>
:root {
	--line-color: #fff;
	/* 線條顏色 */
	--line-thickness: 1px;
	/* 線條厚度 */
	box-sizing: border-box;
}

html,
body {
	margin: 0;
	padding: 0;
	width: 100vw;
	/* 確保寬度為視窗寬度 */
	height: 100vh;
	/* 確保高度為視窗高度 */
	overflow: hidden;
	border: none;
	/* 禁止滾動條 */
}
</style>
<style scoped>
/* 固定線條的透明容器 */
.Fixed_Line_Container {
	position: absolute;
	width: 100vw;
	/* 填滿整個視窗寬度 */
	height: 100vh;
	/* 填滿整個視窗高度 */
	background-color: transparent;
	/* 完全透明，不影響視覺 */
	pointer-events: none;
	/* 禁止干擾鼠標操作 */
	z-index: 10;
	/* 確保線條在最上層 */
	overflow: hidden;
}

/* 四條邊界線 */
.Line {
	position: absolute;
	background-color: var(--line-color);
}

.Bottom_Line {
	bottom: 60px;
	left: 0;
	width: 100%;
	height: var(--line-thickness);
}

.Left_Line {
	top: 0;
	left: 60px;
	width: var(--line-thickness);
	height: 100%;
}

.Right_Line {
	top: 0;
	right: 60px;
	width: var(--line-thickness);
	height: 100%;
}

.Container {
	width: 100vw;
	/* 填滿整個視窗寬度 */
	height: 100vh;
	/* 填滿整個視窗高度 */
	background-color: #000000;
	/* 區域背景色 */
	color: white;
	/* 文字顏色 */
	font-size: 2rem;
	/* rem:times root font size*/
	font-family: "JetBrains Mono";
	z-index: 1;
	/* 設置較低的層級 */
	position: relative;
	/* 確保不影響 Fixed_Line_Container */
	box-sizing: border-box;
	/* Include padding and border in the element's total width and height */
	overflow: hidden;
}

.RouterView_Container {
	right: 60px;
	left: 60px;
	top: 130px;
	bottom: 60px;
	position: absolute;
	/* overflow-x: scroll; */
	overflow: hidden;
}
</style>
