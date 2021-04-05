import { withoutLetters } from './sliders';

/**
 * Модуль калькулятора калорий
 */
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
export default calculator;
