import history from './history.js';

const $ = document;
const historySelector = '.timeline .container .history';

export function renderTimeline() {
	console.log('--Render Timeline History');
	const containerEl = $.querySelector(historySelector);

	history.forEach((item, index) => {
		const { name, description, from, to } = item;

		const markup = `
			<div class="history__item">
				<h3>${name} (${from} - ${to})</h3>
				<p>${description}</p>
			</div>
		`;

		containerEl.insertAdjacentHTML('beforeend', markup);
	});
}

export function renderTrack() {
	const containerEl = $.querySelector(historySelector);
	const footerEl = $.querySelector('footer');

	const trackContainer = $.createElement('div');
	trackContainer.classList.add('track');

	const trackSlide = $.createElement('div');
	trackSlide.classList.add('track__slide');

	trackContainer.append(trackSlide);

	containerEl.append(trackContainer);

	const buffer = 200;
	window.addEventListener('scroll', (e) => {
		const trackContainerBounds = trackContainer.getBoundingClientRect();
		const footerBounds = trackContainer.getBoundingClientRect();

		if (trackContainerBounds.y <= buffer) {
			trackSlide.style.height =
				((window.scrollY - trackContainerBounds.y) / trackContainerBounds.height) * 100 + '%';
		}

		if (trackContainerBounds.y <= buffer && footerBounds.bottom < window.innerHeight) {
			trackSlide.style.height = '100%';
		}

		if (trackContainerBounds.y > 200) {
			trackSlide.style.height = '0%';
		}
	});
}
