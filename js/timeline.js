import history from './history.js';

const $ = document;
const historySelector = '.timeline .container .history';

export function renderTimeline() {
	const containerEl = $.querySelector(historySelector);

	history.forEach((item, index) => {
		const { name, description, from, to } = item;

		const markup = `
			<div class="history__item history__item-${index}">
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

	console.log('--Render Timeline Track');
}

export function renderPoints() {
	const trackContainer = $.querySelector('.track');
	const trackContainerBounds = trackContainer.getBoundingClientRect();
	const historyItemHeaders = $.querySelectorAll('.history__item h3');

	history.forEach((item, index) => {
		const pointContainerEl = $.createElement('div');
		pointContainerEl.classList.add('point');
		pointContainerEl.classList.add('point-' + index);
		pointContainerEl.style.top = historyItemHeaders[index].offsetTop + 'px';

		const pointCenterEl = $.createElement('div');
		pointCenterEl.classList.add('point__center');

		pointContainerEl.append(pointCenterEl);

		trackContainer.append(pointContainerEl);
	});
	console.log('--Render Timeline Points');
}

export function renderFlags() {
	const trackContainer = $.querySelector('.track');
	const trackContainerBounds = trackContainer.getBoundingClientRect();
	const historyItemHeaders = $.querySelectorAll('.history__item h3');

	history.forEach((item, index) => {
		const flagContainerEl = $.createElement('div');
		flagContainerEl.classList.add('flag');
		flagContainerEl.classList.add('flag-' + index);
		flagContainerEl.style.top = historyItemHeaders[index].offsetTop + 'px';

		const flagTextEl = $.createElement('p');
		flagTextEl.innerText = history[index].from;
		flagTextEl.classList.add('flag__text');

		flagContainerEl.append(flagTextEl);

		trackContainer.append(flagContainerEl);
	});
	console.log('--Render Timeline Flags');
}

export function trackScrollEvents() {
	const trackContainer = $.querySelector('.track');
	const trackContainerBounds = trackContainer.getBoundingClientRect();
	const trackSlide = $.querySelector('.track__slide');
	const points = $.querySelectorAll('.point');
	const flags = $.querySelectorAll('.flag');
	const historyItems = $.querySelectorAll('.history__item');

	const buffer = 200;

	const _animate = () => {
		// Animate track height
		const gradientContainer = $.querySelector('.history__gradient');
		const trackContainerBounds = trackContainer.getBoundingClientRect();
		const trackSlideBounds = trackSlide.getBoundingClientRect();
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

		if (footerBounds.bottom < window.innerHeight) {
			gradientContainer.classList.add('history__gradient--inactive');
		} else {
			gradientContainer.classList.remove('history__gradient--inactive');
		}

		if (trackContainerBounds.y > buffer) {
			trackSlide.style.height = '0%';
		}

		// Animate points & flags
		for (let i = 0; i < points.length; i++) {
			const point = points[i];
			const flag = flags[i];
			const item = historyItems[i];
			const pointBounds = point.getBoundingClientRect();
			if (trackSlideBounds.bottom >= pointBounds.top) {
				point.classList.add('point--active');
				flag.classList.add('flag--active');
				item.classList.add('history__item--active');
			} else {
				point.classList.remove('point--active');
				flag.classList.remove('flag--active');
				item.classList.remove('history__item--active');
			}
		}
	};

	_animate();

	window.addEventListener('scroll', (e) => {
		_animate();
	});

	console.log('--Register Timeline Events');
}
