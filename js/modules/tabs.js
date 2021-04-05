/**
 * Модуль табов
 * @param {*} selectorTabsParrent - селектор родительского элемента табов
 * @param {*} selectorTabs - селектор табов
 * @param {*} selectorTabsContent - контент табов
 * @param {*} activeClassTabs - активный класс табов
 */
function tabs(selectorTabsParrent, selectorTabs, selectorTabsContent, activeClassTabs) {
	const tabsContent = document.querySelectorAll(selectorTabsContent),
		tabs = document.querySelectorAll(selectorTabs),
		tabsParrent = document.querySelector(selectorTabsParrent);

	/**
	 * Скрывает контент всех табов
	 */
	const hideTabContent = () => {
		tabsContent.forEach(elem => {
			elem.classList.add('hide');
			elem.classList.remove('show', 'fade');
		});

		tabs.forEach(elem => {
			elem.classList.remove(activeClassTabs);
		});
	};

	/**
	 * Отображение контента активного таба
	 * @param {*} i - порядковый номер таба
	 */
	const showTab = (i = 0) => {
		tabsContent[i].classList.add('show', 'fade');
		tabsContent[i].classList.remove('hide');
		tabs[i].classList.add(activeClassTabs);
	};

	//Делигирование табов
	tabsParrent.addEventListener('click', event => {
		if (event.target && event.target.classList.contains(selectorTabs.slice(1))) {
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

export default tabs;
