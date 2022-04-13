import {
	renderTimeline,
	renderTrack,
	renderPoints,
	renderFlags,
	trackScrollEvents,
} from './timeline.js';

import { renderAside, asideScrollEvents } from './aside.js';

window.onload = function () {
	console.log('--Javascript Loading');
	// Timeline / Main
	renderTimeline();
	renderTrack();
	renderPoints();
	renderFlags();
	trackScrollEvents();

	// Aside
	renderAside();
	asideScrollEvents();
	console.log('--Javascript Loaded');
};
