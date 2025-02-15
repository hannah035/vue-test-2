<template>
	<!-- bookshelf.html -->
	{% extends "layout.html" %} {% block content %}

	<div class="grid-container" id="split-container">
		<div class="left-side" id="left-side">
			<section id="bookshelf">
				<div class="books-container">



					<div class="product-list">
						{% for book in books%}

						<button
							class="product-card"
						>
							<div class="product-thumbnail">
								<img loading="lazy" />
							</div>
							<div class="product-title-wrap">
								<div class="product-title">
									book name
								</div>
							</div>
						</button>
						{% endfor %}
					</div>

					<div class="pagination-container">
						<div class="pagination">
							{% if page_current != page_start %}
							<a
								class="pagination-np"
								href="{{ url_for('bookshelf', page=page_current-1) }}"
								>Previous</a
							>
							{% endif %} {% if page_current == page_start %}
							<a
								class="pagination-number active"
								href="{{ url_for('bookshelf', page=page_start) }}"
								>{{ page_start }}</a
							>
							{% if page_start+1 <= page_end %}
							<a
								class="pagination-number"
								href="{{ url_for('bookshelf', page=page_start+1) }}"
								>{{ page_start + 1 }}</a
							>
							{% endif %} {% if page_start+2 <= page_end %}
							<a
								class="pagination-number"
								href="{{ url_for('bookshelf', page=page_start+2) }}"
								>{{ page_start + 2 }}</a
							>
							{% endif %} {% elif page_current == page_end %} {%
							if page_end-2 >= page_start %}
							<a
								class="pagination-number"
								href="{{ url_for('bookshelf', page=page_end-2) }}"
								>{{ page_end - 2 }}</a
							>
							{% endif %} {% if page_end-1 >= page_start %}
							<a
								class="pagination-number"
								href="{{ url_for('bookshelf', page=page_end-2) }}"
								>{{ page_end - 1 }}</a
							>
							{% endif %}
							<a
								class="pagination-number active"
								href="{{ url_for('bookshelf', page=page_end) }}"
								>{{ page_end }}</a
							>
							{% else %}
							<a
								class="pagination-number"
								href="{{ url_for('bookshelf', page=page_current-1) }}"
								>{{ page_current - 1 }}</a
							>
							<a
								class="pagination-number active"
								href="{{ url_for('bookshelf', page=page_current) }}"
								>{{ page_current }}</a
							>
							<a
								class="pagination-number"
								href="{{ url_for('bookshelf', page=page_current+1) }}"
								>{{ page_current + 1 }}</a
							>
							{% endif %} {% if page_current != page_end%}
							<a
								class="pagination-np"
								href="{{ url_for('bookshelf', page=page_current+1) }}"
								>Next</a
							>
							{% endif %}
						</div>
					</div>

					<div class="footer" id="footer">
						<div class="footer-inner">
							<div class="footer-section">
								<div class="footer-title">
									臺灣大學星艦學院科幻社
								</div>
								<div class="footer-address">
									第二學生活動中心
									<br />
									9F 921
									<br />
									ntusfa@gipo.ntu.edu.tw
								</div>
							</div>
							<div class="footer-section">
								<div class="footer-links-title">Links</div>
								<div class="footer-link">IG</div>
								<div class="footer-link">FB</div>
								<div class="footer-link">About</div>
								<div class="footer-link">Contact</div>
							</div>
							<div class="footer-section">
								<div class="footer-help-title">Join Us</div>
								<div class="footer-help-link">入社表單</div>
								<div class="footer-help-link">社團規則</div>
								<div class="footer-help-link">活動報名</div>
							</div>
							<div class="footer-section">
								<div class="footer-newsletter-title">
									Say Anything
								</div>
								<div class="footer-newsletter">
									<div class="newsletter-prompt">
										講師推薦、意見回饋......等
									</div>
									<div class="newsletter-divider"></div>
									<div class="newsletter-submit">
										Transmit
									</div>
									<div class="newsletter-divider"></div>
								</div>
							</div>
						</div>
						<div class="footer-divider"></div>
						<div class="footer-copyright">2024summer</div>
					</div>
				</div>
			</section>
		</div>
		<div class="right-side initial" id="right-side">
			<!-- Embed pop-up.html here -->
			<iframe
				src="{{ url_for('side') }}"
				frameborder="0"
				onload="split_close_function()"
				id="iframe"
			></iframe>
		</div>
	</div>
</template>
<script>
const splitContainer = document.getElementById("split-container")
const right = document.getElementById("right-side")
const left = document.getElementById("left-side")
let iframe
let innerDoc
function split_close_function() {
	setTimeout(() => {
		right.classList.remove("initial")
	}, 200)
	iframe = document.getElementById("iframe")
	innerDoc = iframe.contentDocument || iframe.contentWindow.document
	const pushBack = innerDoc.getElementById("push-back")
	pushBack.addEventListener("click", () => {
		left.classList.remove("appear")
		right.classList.remove("appear")
	})
}
function set_split_view_data(
	isbn,
	name,
	author,
	publisher,
	date,
	cover,
	place,
	borrow
) {
	// set innerHTML of side.html
	iframe = document.getElementById("iframe")
	innerDoc = iframe.contentDocument || iframe.contentWindow.document
	innerDoc.getElementById("book-title").innerHTML = String(name)
	innerDoc.getElementById("book-details").innerHTML = `${isbn.substring(
		5
	)}/${place}/可借閱`
	innerDoc.getElementById(
		"book-description"
	).innerHTML = `作者 ${author} <br/>出版社 ${publisher}<br/> 出版年份 ${date}`
	innerDoc.getElementById("book-cover-img").src = cover
	innerDoc.getElementById("book-id").value = String(isbn)

	//make right appear and left shrink
	right.classList.add("appear")
	left.classList.add("appear")
}
</script>
<style></style>
