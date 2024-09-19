export const header = function () {
	const root = document.querySelector(':root');
	const header = document.querySelector('header');

	if (!header) return;

	const headerHeight = header.getBoundingClientRect().height;
	root.style.setProperty('--header-height', headerHeight + 'px');

	return headerHeight;
};
