import qualifications from './qualifications.js';

const $ = document;

export function renderAside() {
	const asideContainer = $.querySelector('aside .container');

	const _renderScale = (arr) => {
		return arr
			.map((item) => `<span>${item}</span>`)
			.join(',')
			.replace(',', '');
	};

	const _renderList = (arr) => {
		if (typeof arr[0].value === 'string') {
			return arr
				.map(
					(item) =>
						`<li class="qualification__list-item"><span>${item.name}</span><span>${item.value}</span></li>`
				)
				.join(',')
				.replace(',', '');
		}

		return arr
			.map(
				(item) =>
					`<li class="qualification__list-gauge"><span>${item.name}</span><span class="gauge" data-value="${item.value}"><span class="gauge__track"></span></span></li>`
			)
			.join(',')
			.replace(',', '');
	};

	qualifications.forEach((qualification, index) => {
		const { title, scale, items } = qualification;
		//const qualificationEl = $.createElement('section');
		const qualificationEl = `
			<section class="qualification qualification-${title.toLowerCase()}">
				<div class="qualification__title">
					<h4>${title}</h4>
					${scale ? `<p>${_renderScale(scale)}</p>` : ''}
				</div>
				<ul class="qualification__list">
					${_renderList(items)}
				</ul>
			</section>
		`;

		asideContainer.insertAdjacentHTML('beforeend', qualificationEl);
	});
}
