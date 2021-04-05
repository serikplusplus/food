/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calculator.js":
/*!**********************************!*\
  !*** ./js/modules/calculator.js ***!
  \**********************************/
/***/ ((module) => {

function calculator() {
	const calculatingResult = document.querySelector('.calculating__result span');
	let sex, height, weight, age, action;

	//Установка значение по умолчанию с локального хранилища
	if (localStorage.getItem('sex')) {
		sex = localStorage.getItem('sex');
	} else {
		sex = 'female';
		localStorage.setItem('sex', 'female');
	}
	if (localStorage.getItem('action')) {
		action = localStorage.getItem('action');
	} else {
		action = 1.375;
		localStorage.setItem('action', 1.375);
	}

	/**
	 * Определение дневной нормы калорий по данным с формы
	 */
	const calcCalories = () => {
		if (sex && height && weight && age && action) {
			if (sex === 'female') {
				calculatingResult.textContent = Math.round(
					(447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * action
				);
			} else {
				calculatingResult.textContent = Math.round(
					(88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * action
				);
			}
		} else {
			calculatingResult.textContent = '____';
			return;
		}
	};

	calcCalories();

	/**
	 * Получение статических данных с элементов
	 * @param {string} selector - селектор элементов
	 * @param {string} activeClass - класс активности для элементов
	 */
	const getStaticInformation = (selector, activeClass) => {
		const elements = document.querySelectorAll(selector);

		elements.forEach(element => {
			element.addEventListener('click', event => {
				if (event.target.getAttribute('data-action')) {
					action = +event.target.getAttribute('data-action');
					localStorage.setItem('action', action);
				} else {
					sex = event.target.getAttribute('id');
					localStorage.setItem('sex', sex);
				}
				elements.forEach(element => {
					element.classList.remove(activeClass);
				});
				event.target.classList.add(activeClass);
				calcCalories();
			});
		});
	};

	/**
	 * Получение введенных данных пользователем
	 *@param {string} selector - селектор отслеживаемого элемента
	 */
	const getInputInformation = selector => {
		const input = document.querySelector(selector);
		input.addEventListener('input', event => {
			switch (input.getAttribute('id')) {
				case 'height':
					input.value = height = withoutLetters(input.value);
					break;
				case 'weight':
					input.value = weight = withoutLetters(input.value);
					break;
				case 'age':
					input.value = age = withoutLetters(input.value);
					break;
				default:
					break;
			}
			calcCalories();
		});
	};

	/**
	 * Добавление изначальной активности элементам равным значениям из лоального хранилища
	 * @param {*} selector - селектор элементов
	 * @param {*} activeClass - класс активности
	 */
	const setInitialActivity = (selector, activeClass) => {
		const items = document.querySelectorAll(selector);
		items.forEach(item => {
			item.classList.remove(activeClass);
			if (
				item.getAttribute('id') === localStorage.getItem('sex') ||
				item.getAttribute('data-action') === localStorage.getItem('action')
			) {
				item.classList.add(activeClass);
			}
		});
	};

	setInitialActivity('#gender div', 'calculating__choose-item_active');
	setInitialActivity('.calculating__choose_big div', 'calculating__choose-item_active');
	getStaticInformation('#gender div', 'calculating__choose-item_active');
	getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');
	getInputInformation('#height');
	getInputInformation('#weight');
	getInputInformation('#age');
}
module.exports = calculator;


/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((module) => {

function cards() {
	/**
	 * Работа с json сервером - получение данных
	 * @param {*} url - адрес взаимодействия
	 * @param {*} data - данные для отправки
	 * @returns промис с данными
	 */
	const getData = async url => {
		const res = await fetch(url);

		//Обработка ошибок - fetch не выдает ошибки при отсутствии данных или подключения к базе
		// throw -выкидывает ошибку с функции
		if (!res.ok) {
			throw new Error(`Dont fetch ${url} status: ${res.status}`);
		}

		return await res.json();
	};

	//Класс создание карточек меню
	class menuCard {
		/**
		 * Конструктор карточки
		 * @param {string} subtitle - название
		 * @param {string} descr - описание
		 * @param {int} total -  цена
		 * @param {string} img - путь к картинке
		 * @param {string} alt - альтернативный текс катринки
		 * @param {string} parent - место вставки карточик
		 * @param  {...any} classes  - классы к карточке
		 */
		constructor(subtitle, descr, total, img, alt, parent, ...classes) {
			this.subtitle = subtitle;
			this.descr = descr;
			this.total = total;
			this.img = img;
			this.alt = alt;
			this.classes = classes;
			this.parent = document.querySelector(parent);
		}

		/**
		 * Вывод карточек в верстку
		 */
		pasteItem() {
			const item = document.createElement('div');
			if (this.classes.length === 0) {
				item.classList.add('menu__item');
			}
			item.classList.add(...this.classes);
			item.innerHTML = `
						<img src="${this.img}" alt="${this.alt}" />
						<h3 class="menu__item-subtitle">Меню "${this.subtitle}"</h3>
						<div class="menu__item-descr">
							${this.descr}
						</div>
						<div class="menu__item-divider"></div>
						<div class="menu__item-price">
							<div class="menu__item-cost">Цена:</div>
							<div class="menu__item-total"><span>${this.total}</span> грн/день</div>
						</div>`;
			this.parent.append(item);
		}
	}

	//вывод карточек меню
	getData('http://localhost:3000/menu').then(data => {
		//перебор полученого массива от сервера по обьектам с разбиением каждого обьекта на переменные
		data.forEach(({ img, altimg, title, descr, price }) => {
			new menuCard(title, descr, price, img, altimg, '.menu .container').pasteItem();
		});
	});
}
module.exports = cards;


/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((module) => {

function forms(params) {
	const forms = document.querySelectorAll('form');
	const message = {
		loading: 'img/1474.gif',
		success: 'Скоро позвоним',
		error: 'Ошибка',
	};

	/**
	 * Показ статуса отправки формы
	 * @param {*} message
	 */
	const showModalThanks = message => {
		showModal();
		const modalDialog = document.querySelector('.modal__dialog');
		modalDialog.classList.add('hide');

		const thanksDialog = document.createElement('div');
		thanksDialog.classList.add('modal__dialog');
		thanksDialog.innerHTML = `
		<div class="modal__content">
			<div data-modalclose class="modal__close">&times;</div>
			<div class="modal__title">${message}</div>
		</div>
		`;

		modal.append(thanksDialog);

		setTimeout(() => {
			thanksDialog.remove();
			modalDialog.classList.remove('hide');
			closeModal();
		}, 4000);
	};

	/**
	 * Работа с json сервером - отправка данных
	 * @param {*} url - адрес взаимодействия
	 * @param {*} data - данные для отправки
	 * @returns промис с данными
	 */
	const postData = async (url, dat) => {
		//fetch == promise, res == promise
		const res = await fetch(url, {
			//await-ждет выполнения промиса fetch
			method: 'POST',
			headers: {
				'Content-type': 'application/json',
			},
			body: dat,
		});
		//возвращаем промис для дальнейщего развития дерева проверок
		return await res.json(); //res=promise res.json=promise
	};

	/**
	 * Отправка данных формы на сервер
	 * @param {*} form - форма
	 */
	const bindPostData = form => {
		form.addEventListener('submit', event => {
			event.preventDefault();

			const statusMessage = document.createElement('img');
			statusMessage.src = message.loading;
			statusMessage.style.cssText = `
					display:block;
					margin: 0 auto;	
					margin-top:20px;
					width:50px;
					height:50px;		
			`;

			form.insertAdjacentElement('afterend', statusMessage);

			const formData = new FormData(form);

			//? Перевод formData > JSON
			const json = JSON.stringify(Object.fromEntries(formData.entries()));
			postData('http://localhost:3000/requests', json)
				.then(data => {
					showModalThanks(message.success);
					statusMessage.remove();
				})
				.catch(() => {
					statusMessage.remove();
					showModalThanks(message.error);
				})
				.finally(() => {
					form.reset();
				});
		});
	};

	//Назначение обработчика всем формам
	forms.forEach(element => {
		bindPostData(element);
	});
}
module.exports = forms;


/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((module) => {

function modal() {
	const modalsBtn = document.querySelectorAll('[data-modal]'),
		modal = document.querySelector('.modal');

	/**
	 * Закрытие модального окна
	 */
	const closeModal = () => {
		modal.classList.add('hide');
		modal.classList.remove('show');
		document.body.style.overflow = '';
		clearInterval(modalTimerId);
	};

	/**
	 * Открытие модального окна
	 */
	const showModal = () => {
		modal.classList.add('show');
		modal.classList.remove('hide');
		document.body.style.overflow = 'hidden'; //? Запрет прокрутки страницы
	};

	/**
	 * Открытие модального окна при скроле
	 *
	 */
	const showModalByScrolling = () => {
		if (
			window.pageYOffset + document.documentElement.clientHeight >=
			document.documentElement.scrollHeight
		) {
			showModal();
			window.removeEventListener('scroll', showModalByScrolling);
		}
	};

	const modalTimerId = setTimeout(showModal, 20000);

	modalsBtn.forEach(elem => {
		elem.addEventListener('click', showModal);
	});

	// Закрытие модального окна при клике мимо него или по кнопке закрытия
	modal.addEventListener('click', event => {
		if (event.target === modal || event.target.getAttribute('data-modalclose') == '') {
			closeModal();
		}
	});

	// Закрытие модального окна клавишей escape
	document.addEventListener('keydown', event => {
		if (modal.classList.contains('show') && event.code === 'Escape') {
			closeModal();
		}
	});

	//показать модальное окно когда долистал до конца
	window.addEventListener('scroll', showModalByScrolling);
}

module.exports = modal;


/***/ }),

/***/ "./js/modules/sliders.js":
/*!*******************************!*\
  !*** ./js/modules/sliders.js ***!
  \*******************************/
/***/ ((module) => {

function sliders() {
	const slides = document.querySelectorAll('.offer__slide'),
		slider = document.querySelector('.offer__slider'),
		currentSlide = document.querySelector('#current'),
		totalSlides = document.querySelector('#total'),
		prevSlide = document.querySelector('.offer__slider-prev'),
		nextSlide = document.querySelector('.offer__slider-next'),
		slidesWrapper = document.querySelector('.offer__slider-wrapper'),
		slidesField = document.querySelector('.offer__slider-inner'),
		width = window.getComputedStyle(slidesWrapper).width;

	let thisSlide = 1,
		offset = 0;

	//! Слайдер со сликом

	slidesField.style.width = 100 * slides.length + '%'; //Ширина области слайдера
	slidesField.style.display = 'flex';
	slidesField.style.transition = '0.5s all';
	slidesWrapper.style.overflow = 'hidden';
	slides.forEach(slide => {
		slide.style.width = width; //ширина слайда равна ширине области показа слайда
	});

	//Создание родителя для точек слайдера
	slider.style.position = 'relative';
	const indicators = document.createElement('ol');
	indicators.classList.add('carousel-indicators');
	indicators.style.cssText = `
		position: absolute;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 15;
		display: flex;
		justify-content: center;
		margin-right: 15%;
		margin-left: 15%;
		list-style: none;
	`;
	slider.append(indicators);

	//Создание точек слайдера
	const dots = [];
	for (let i = 0; i < slides.length; i++) {
		const dot = document.createElement('li');
		dot.setAttribute('data-slide-to', i + 1);
		//dot.classList.add('dot');
		dot.style.cssText = `
			box-sizing: content-box;
			flex: 0 1 auto;
			width: 30px;
			height: 6px;
			margin-right: 3px;
			margin-left: 3px;
			cursor: pointer;
			background-color: #fff;
			background-clip: padding-box;
			border-top: 10px solid transparent;
			border-bottom: 10px solid transparent;
			opacity: 0.5;
			transition: opacity 0.6s ease;
		`;
		if (i == 0) {
			dot.style.opacity = 1;
		}
		indicators.append(dot);
		dots.push(dot);
	}

	/** Вставка числового индекса в элемент
	 * @param {*} index - число для вывода
	 * @param {*} elem - элемент для вставки
	 */
	const showIndexText = (index, elem) => {
		if (index < 10) {
			elem.textContent = '0' + index;
		} else {
			elem.textContent = index;
		}
	};

	/**
	 * Добавление состояния активности на точку слайдера
	 * @param {*} index - порядковый номер точки
	 */
	const activateSlide = offset => {
		slidesField.style.transform = `translateX(-${offset}px)`;
		showIndexText(thisSlide, currentSlide);
		dots.forEach(dot => {
			dot.style.opacity = '0.5';
		});
		dots[thisSlide - 1].style.opacity = 1;
	};

	function withoutLetters(string) {
		return +string.replace(/\D/g, '');
	}

	showIndexText(slides.length, totalSlides);
	showIndexText(thisSlide, currentSlide);
	nextSlide.addEventListener('click', () => {
		if (offset == withoutLetters(width) * (slides.length - 1)) {
			offset = 0;
		} else {
			//Смещение на ширину области показа слайдера
			offset += withoutLetters(width);
		}
		if (thisSlide == slides.length) {
			thisSlide = 1;
		} else {
			thisSlide++;
		}

		activateSlide(offset);
	});

	prevSlide.addEventListener('click', () => {
		if (offset == 0) {
			offset = withoutLetters(width) * (slides.length - 1);
		} else {
			//Смещение на ширину области показа слайдера
			offset -= withoutLetters(width);
		}
		if (thisSlide == 1) {
			thisSlide = slides.length;
		} else {
			thisSlide--;
		}
		activateSlide(offset);
	});

	//Обработка клика на точку слайдера
	dots.forEach(dot => {
		dot.addEventListener('click', event => {
			const slideTo = event.target.getAttribute('data-slide-to');
			thisSlide = slideTo;
			offset = withoutLetters(width) * (slideTo - 1);
			activateSlide(offset);
		});
	});

	//! Слайдер без слика

	// /**
	//  * Отображение  активного слайда
	//  *	@param {} index - порядковый номер слайда
	//  */
	// const showSlide = index => {
	// 	if (index > slides.length) {
	// 		thisSlide = 1;
	// 	}
	// 	if (index < 1) {
	// 		thisSlide = slides.length;
	// 	}
	// 	slides.forEach(elem => {
	// 		elem.classList.add('hide');
	// 		elem.classList.remove('show', 'fade');
	// 	});
	// 	slides[thisSlide - 1].classList.add('show', 'fade');
	// 	slides[thisSlide - 1].classList.remove('hide');
	// 	showIndexText(thisSlide, currentSlide);
	// 	showIndexText(slides.length, totalSlides);
	// };

	// showSlide(thisSlide);

	// prevSlide.addEventListener('click', () => {
	// 	showSlide(--thisSlide);
	// });
	// nextSlide.addEventListener('click', () => {
	// 	showSlide(++thisSlide);
	// });
}
module.exports = sliders;


/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((module) => {

function tabs() {
	const tabsContent = document.querySelectorAll('.tabcontent'),
		tabs = document.querySelectorAll('.tabheader__item'),
		tabgParrent = document.querySelector('.tabheader__items');

	/**
	 * Скрывает контент всех табов
	 */
	const hideTabContent = () => {
		tabsContent.forEach(elem => {
			elem.classList.add('hide');
			elem.classList.remove('show', 'fade');
		});

		tabs.forEach(elem => {
			elem.classList.remove('tabheader__item_active');
		});
	};

	/**
	 * Отображение контента активного таба
	 * @param {*} i - порядковый номер таба
	 */
	const showTab = (i = 0) => {
		tabsContent[i].classList.add('show', 'fade');
		tabsContent[i].classList.remove('hide');
		tabs[i].classList.add('tabheader__item_active');
	};

	//Делигирование табов
	tabgParrent.addEventListener('click', event => {
		if (event.target && event.target.classList.contains('tabheader__item')) {
			tabs.forEach((elem, i) => {
				if (elem === event.target) {
					hideTabContent();
					showTab(i);
				}
			});
		}
	});

	hideTabContent();
	showTab();
}

module.exports = tabs;


/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((module) => {

function timer() {
	const deadline = '2021-05-20';

	/**
	 * Получение разницы во времени
	 * @param {*} endtime - конечное время
	 */
	const getTimeRemaining = endtime => {
		const total = Date.parse(endtime) - Date.parse(new Date()),
			days = Math.floor(total / (1000 * 60 * 60 * 24)),
			hours = Math.floor((total / (1000 * 60 * 60)) % 24),
			minutes = Math.floor((total / (1000 * 60)) % 60),
			seconds = Math.floor((total / 1000) % 60);

		return {
			total,
			days,
			hours,
			minutes,
			seconds,
		};
	};

	/**
	 * Обновление таймера на странице
	 *
	 * @param {*} selector - Селектор таймера
	 * @param {*} endtime - конечное время отчета
	 */
	const setClock = (selector, endTime) => {
		const timer = document.querySelector(selector),
			days = timer.querySelector('#days'),
			hours = timer.querySelector('#hours'),
			minutes = timer.querySelector('#minutes'),
			seconds = timer.querySelector('#seconds'),
			timeInterval = setInterval(updateClock, 1000);

		updateClock();

		function updateClock() {
			const t = getTimeRemaining(endTime);
			days.innerHTML = t.days;
			hours.innerHTML = t.hours;
			minutes.innerHTML = t.minutes;
			seconds.innerHTML = t.seconds;

			if (t.total <= 0) {
				clearInterval(timeInterval);
			}
		}
	};

	setClock('.timer', deadline);
}

module.exports = timer;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/


window.addEventListener('DOMContentLoaded', event => {
	const tabs = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js"),
		timer = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js"),
		modal = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js"),
		cards = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js"),
		forms = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js"),
		sliders = __webpack_require__(/*! ./modules/sliders */ "./js/modules/sliders.js"),
		calculator = __webpack_require__(/*! ./modules/calculator */ "./js/modules/calculator.js");

	tabs();
	timer();
	modal();
	cards();
	forms();
	sliders();
	calculator();
});

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map