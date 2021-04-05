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
