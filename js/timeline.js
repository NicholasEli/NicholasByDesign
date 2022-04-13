import history from './history.js';

export function renderTimeline() {
	const containerEl = document.querySelector('.timeline .container');

	history.forEach((item, index) => {
		const { name, description, from, to } = item;

		const markup = `
			<div class="timeline__history-item">
				<h3>${name} (${from} - ${to})</h3>
				<p>${description}</p>
			</div>
		`;

		containerEl.insertAdjacentHTML('beforeend', markup);
	});
}
