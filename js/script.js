'use strict';

window.addEventListener('DOMContentLoaded', event => {
	const tabs = require('./modules/tabs'),
		timer = require('./modules/timer'),
		modal = require('./modules/modal'),
		cards = require('./modules/cards'),
		forms = require('./modules/forms'),
		sliders = require('./modules/sliders'),
		calculator = require('./modules/calculator');

	tabs();
	timer();
	modal();
	cards();
	forms();
	sliders();
	calculator();
});
