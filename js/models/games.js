class Games {
	getGamesList() {
		return new Promise(resolve => {
			const xhr = new XMLHttpRequest();

			xhr.open('GET', 'http://localhost:3000/api/games');

			xhr.onload = () => resolve(JSON.parse(xhr.response));

			xhr.send();
		});
	}

	getGame(id) {
		return new Promise(resolve => {
			const xhr = new XMLHttpRequest();

			xhr.open('GET', `http://localhost:3000/api/game/${id}`);

			xhr.onload = () => resolve(JSON.parse(xhr.response));

			xhr.send();
		});
	}



	// addTask(newTask) {
	// 	return new Promise(resolve => {
	// 		const xhr = new XMLHttpRequest();

	// 		xhr.open('POST', 'http://localhost:3000/api/task');
	// 		xhr.setRequestHeader('Content-Type', 'application/json');

	// 		xhr.onload = () => resolve(JSON.parse(xhr.response));

	// 		xhr.send(JSON.stringify(newTask));
	// 	});
	// }



	// editTask(updatedTask) {
	// 	return new Promise(resolve => {
	// 		const xhr = new XMLHttpRequest();

	// 		xhr.open('PUT', `http://localhost:3000/api/task/${updatedTask.id}`);
	// 		xhr.setRequestHeader('Content-Type', 'application/json');

	// 		xhr.onload = () => resolve();

	// 		xhr.send(JSON.stringify(updatedTask));
	// 	});
	// }
}

export default Games;