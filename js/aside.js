import qualifications from './qualifications.js';

const $ = document;

export function renderAside() {
	const asideContainer = $.querySelector('aside .container');

	qualifications.forEach((qualification, index) => {
		const { title, scale } = qualification;
		//const qualificationEl = $.createElement('section');
		const qualificationEl = `
			<section class="qualification qualification-${title.toLowerCase()}">
				<h4>${title}</h4>
			</section>
		`;

		asideContainer.insertAdjacentHTML('beforeend', qualificationEl);
	});
}
