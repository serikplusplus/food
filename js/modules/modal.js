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
