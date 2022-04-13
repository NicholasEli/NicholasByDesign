import history from './history.js';

const $ = document;
const historySelector = '.timeline .container .history';

export function renderTimeline() {
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
	console.log('--Render Timeline History');
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
		const heightCalc =
			((window.scrollY - trackContainerBounds.y) / trackContainerBounds.height) * 100 + '%';

		if (trackContainerBounds.y <= buffer) {
			trackSlide.style.height = heightCalc;
		}

		if (
			(trackContainerBounds.y <= buffer && footerBounds.bottom < window.innerHeight) ||
			(trackContainerBounds.y <= buffer && heightCalc >= 100)
		) {
			trackSlide.style.height = '100%';
		}

		if (trackContainerBounds.y > buffer) {
			trackSlide.style.height = '0%';
		}
	});
	console.log('--Render Timeline Track');
}

export function renderPoints() {
	const trackContainer = $.querySelector('.track');
	const trackContainerBounds = trackContainer.getBoundingClientRect();
	const historyItemHeaders = $.querySelectorAll('.history__item h3');

	for (let i = 0; i < history.length; i++) {
		const pointContainerEl = $.createElement('div');
		pointContainerEl.classList.add('point');
		pointContainerEl.classList.add('point-' + i);
		pointContainerEl.style.top = historyItemHeaders[i].offsetTop + 'px';

		const pointCenterEl = $.createElement('div');
		pointCenterEl.classList.add('point__center');

		pointContainerEl.append(pointCenterEl);

		trackContainer.append(pointContainerEl);
	}
	console.log('--Render Timeline Points');
}

export function renderFlags() {
	const trackContainer = $.querySelector('.track');
	const trackContainerBounds = trackContainer.getBoundingClientRect();
	const historyItemHeaders = $.querySelectorAll('.history__item h3');

	for (let i = 0; i < history.length; i++) {
		const flagContainerEl = $.createElement('div');
		flagContainerEl.classList.add('flag');
		flagContainerEl.classList.add('flag-' + i);
		flagContainerEl.style.top = historyItemHeaders[i].offsetTop + 'px';

		const flagTextEl = $.createElement('p');
		flagTextEl.classList.add('flag__text');

		flagContainerEl.append(flagTextEl);

		trackContainer.append(flagContainerEl);
	}
	console.log('--Render Timeline Flags');
}
