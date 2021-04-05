/**
 * Модуль таймера обратного отсчета
 * @param {*} selectorTimer - селектор таймера
 * @param {*} deadline - дата конца отсчета
 */
function timer(selectorTimer, deadline) {
	/**
	 * Получение разницы во времени
	 * @param {*} endtime - конечное время
	 */
	const getTimeRemaining = endtime => {
		const total = Date.parse(endtime) - Date.parse(new Date()),
			days = Math.floor(total / (1000 * 60 * 60 * 24)),
			hours = Math.floor((total / (1000 * 60 * 60)) % 24),
			minutes = Math.floor((total / (1000 * 60)) % 60),
			seconds = Math.floor((total / 1000) % 60);

		return {
			total,
			days,
			hours,
			minutes,
			seconds,
		};
	};

	/**
	 * Обновление таймера на странице
	 *
	 * @param {*} selector - Селектор таймера
	 * @param {*} endtime - конечное время отчета
	 */
	const setClock = (selector, endTime) => {
		const timer = document.querySelector(selector),
			days = timer.querySelector('#days'),
			hours = timer.querySelector('#hours'),
			minutes = timer.querySelector('#minutes'),
			seconds = timer.querySelector('#seconds'),
			timeInterval = setInterval(updateClock, 1000);

		updateClock();

		function updateClock() {
			const t = getTimeRemaining(endTime);
			days.innerHTML = t.days;
			hours.innerHTML = t.hours;
			minutes.innerHTML = t.minutes;
			seconds.innerHTML = t.seconds;

			if (t.total <= 0) {
				clearInterval(timeInterval);
			}
		}
	};

	setClock(selectorTimer, deadline);
}

export default timer;
