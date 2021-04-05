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

export { postData };
export { getData };
