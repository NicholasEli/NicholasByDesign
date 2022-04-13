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

	qualifications.forEach((qualification, index) => {
		const { title, scale } = qualification;
		//const qualificationEl = $.createElement('section');
		const qualificationEl = `
			<section class="qualification qualification-${title.toLowerCase()}">
				<div class="qualification__title">
					<h4>${title}</h4>
					${scale ? `<p>${_renderScale(scale)}</p>` : ''}
				</div>
			</section>
		`;

		asideContainer.insertAdjacentHTML('beforeend', qualificationEl);
	});
}
