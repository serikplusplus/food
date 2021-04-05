/**
 * Удаление со строки всех букв
 * @param {*} string - строка
 * @returns - строка без букв
 */
function withoutLetters(string) {
	return +string.replace(/\D/g, '');
}

/**
 * Модуль слайдера
 * @param {*} param0 - обьект настроек
 * @param {*} param0__container - селектор контейнера слайдера
 * @param {*} param0__slide - селектор слайдов
	@param {*} param0__nextBtn - селектор кнопки переключения слайда "Вперед"
	@param {*} param0__prevBtn - селектор кнопки переключения слайда "Назад"
	@param {*} param0__totalCounter - селектор поля отображения общего количества слайдов
	@param {*} param0__currentCounter - селектор поля отображения текущего слайда
	@param {*} param0__wrapper - селектор области слайда (обертка для field)
	@param {*} param0__field - селектор полосы слайдов (обертка слайдов)
 */
function sliders({
	container,
	slide,
	nextBtn,
	prevBtn,
	totalCounter,
	currentCounter,
	wrapper,
	field,
}) {
	const slides = document.querySelectorAll(slide),
		slider = document.querySelector(container),
		currentSlide = document.querySelector(currentCounter),
		totalSlides = document.querySelector(totalCounter),
		prevSlide = document.querySelector(prevBtn),
		nextSlide = document.querySelector(nextBtn),
		slidesWrapper = document.querySelector(wrapper),
		slidesField = document.querySelector(field),
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
export default sliders;
export { withoutLetters };
