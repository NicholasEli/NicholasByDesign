import { renderTimeline, renderTrack, renderPoints, renderFlags } from './timeline.js';

window.onload = function () {
	console.log('--Javascript Loading');
	renderTimeline();
	renderTrack();
	renderPoints();
	renderFlags();
	console.log('--Javascript Loaded');
};
