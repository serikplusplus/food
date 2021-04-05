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
