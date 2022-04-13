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
				.replace(/,/g, '');
		}

		return arr
			.map(
				(item) =>
					`<li class="qualification__list-gauge"><span>${item.name}</span><span class="gauge"><span class="gauge__track" data-value="${item.value}%"></span></span></li>`
			)
			.join(',')
			.replace(/,/g, '');
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

	console.log('--Render Qualifications List');
}

export function asideScrollEvents() {
	const _animate = () => {
		const gaugeItems = $.querySelectorAll('.gauge__track');

		for (let i = 0; i < gaugeItems.length; i++) {
			const gaugeItem = gaugeItems[i];
			const gaugeBounds = gaugeItem.getBoundingClientRect();
			const animatePercentage = gaugeItem.getAttribute('data-value');

			if (gaugeBounds.y < window.innerHeight - 100) {
				gaugeItem.classList.add('gauge--active');
				gaugeItem.style.width = animatePercentage;
			} else {
				gaugeItem.style.width = '0%';
				setTimeout(() => gaugeItem.classList.remove('gauge__track--active'), 200);
			}
		}
	};

	_animate();

	window.addEventListener('scroll', (e) => {
		_animate();
	});

	console.log('--Register Qualification Events');
}
