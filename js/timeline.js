import history from './history.js';

export function renderTimeline() {
	const containerEl = document.querySelector('.timeline .container');

	history.forEach((item, index) => {
		const { name, description, from, to } = item;
	});
}
