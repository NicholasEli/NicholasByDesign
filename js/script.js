import {
	renderTimeline,
	renderTrack,
	renderPoints,
	renderFlags,
	trackScrollEvents,
} from './timeline.js';

window.onload = function () {
	console.log('--Javascript Loading');
	renderTimeline();
	renderTrack();
	renderPoints();
	renderFlags();
	trackScrollEvents();
	console.log('--Javascript Loaded');
};
