import { closeModal, showModal } from './modal';
import { postData } from '../services/services';

/**
 * Модуль форм
 * @param {*} modalTimerId - - таймер отложеного запуска модального окна
 * @param {*} formSelector - селектор форм
 */
function forms(formSelector, modalTimerId) {
	const forms = document.querySelectorAll(formSelector);
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
		showModal('.modal', modalTimerId);
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

		document.querySelector('.modal').append(thanksDialog);

		setTimeout(() => {
			thanksDialog.remove();
			modalDialog.classList.remove('hide');
			closeModal('.modal');
		}, 4000);
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
				.then(() => {
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
export default forms;
