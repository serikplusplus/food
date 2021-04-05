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
