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
