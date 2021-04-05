/**
 * Закрытие модального окна
 * @param {*} modalSelector - селектор модального окна
 */
const closeModal = modalSelector => {
	const modal = document.querySelector(modalSelector);
	modal.classList.add('hide');
	modal.classList.remove('show');
	document.body.style.overflow = '';
};

/**
 * Открытие модального окна
 * @param {*} modalSelector - селектор модального окна
 * @param {*} modalTimerId - таймер отложеного запуска модального окна
 */
const showModal = (modalSelector, modalTimerId) => {
	const modal = document.querySelector(modalSelector);
	modal.classList.add('show');
	modal.classList.remove('hide');
	document.body.style.overflow = 'hidden'; //? Запрет прокрутки страницы
	if (modalTimerId) {
		clearInterval(modalTimerId);
	}
};

/**
 * Модуль модального окна
 * @param {*} triggerSelector - селектор элемента через который вызывается модальное окно
 * @param {*} modalSelector - селектор модального окна
 * @param {*} modalTimerId  - таймер отложеного запуска модального окна
 */
function modal(triggerSelector, modalSelector, modalTimerId) {
	const modalsBtn = document.querySelectorAll(triggerSelector),
		modal = document.querySelector(modalSelector);

	/**
	 * Открытие модального окна при скроле
	 *
	 */
	const showModalByScrolling = () => {
		if (
			window.pageYOffset + document.documentElement.clientHeight >=
			document.documentElement.scrollHeight
		) {
			showModal(modalSelector, modalTimerId);
			window.removeEventListener('scroll', showModalByScrolling);
		}
	};

	modalsBtn.forEach(elem => {
		elem.addEventListener('click', () => showModal(modalSelector, modalTimerId));
	});

	// Закрытие модального окна при клике мимо него или по кнопке закрытия
	modal.addEventListener('click', event => {
		if (event.target === modal || event.target.getAttribute('data-modalclose') == '') {
			closeModal(modalSelector);
		}
	});

	// Закрытие модального окна клавишей escape
	document.addEventListener('keydown', event => {
		if (modal.classList.contains('show') && event.code === 'Escape') {
			closeModal(modalSelector);
		}
	});

	//показать модальное окно когда долистал до конца
	window.addEventListener('scroll', showModalByScrolling);
}

export default modal;
export { showModal };
export { closeModal };
