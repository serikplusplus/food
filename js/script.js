'use strict';
//подключение полифтилов для промисов
require('es6-promise').polyfill();
//Полифил для foreach
import 'nodelist-foreach-polyfill';

import tabs from './modules/tabs';
import timer from './modules/timer';
import modal from './modules/modal';
import { showModal } from './modules/modal';
import cards from './modules/cards';
import forms from './modules/forms';
import sliders from './modules/sliders';
import calculator from './modules/calculator';

window.addEventListener('DOMContentLoaded', event => {
	const modalTimerId = setTimeout(() => showModal('.modal', modalTimerId), 20000);

	tabs('.tabheader__items', '.tabheader__item', '.tabcontent', 'tabheader__item_active');
	timer('.timer', '2021-05-20');
	modal('[data-modal]', '.modal', modalTimerId);
	cards();
	forms('form', modalTimerId);
	sliders({
		container: '.offer__slider',
		slide: '.offer__slide',
		nextBtn: '.offer__slider-next',
		prevBtn: '.offer__slider-prev',
		totalCounter: '#total',
		currentCounter: '#current',
		wrapper: '.offer__slider-wrapper',
		field: '.offer__slider-inner',
	});
	calculator();
});
