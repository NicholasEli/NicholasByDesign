import qualifications from './qualifications.js';

const $ = document;

export function renderAside() {
	const asideContainer = $.querySelector('aside .container');

	qualifications.forEach((qualification, index) => {
		const { title, scale } = qualification;
		const qualificationEl = $.createElement('section');
		qualificationEl.classList.add('qualification');
		qualificationEl.classList.add('qualification__' + title.toLowerCase());

		// Title
		const qualificationTitleEl = $.createElement('h4');
		qualificationTitleEl.innerText = title;
		qualificationEl.append(qualificationTitleEl);

		// Scale
		if (scale) {
		}

		asideContainer.append(qualificationEl);
	});
}
