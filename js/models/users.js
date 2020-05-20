class Users {
	getUsersList() {
		return new Promise(resolve => {
			const xhr = new XMLHttpRequest();

			xhr.open('GET', 'http://localhost:3000/api/users');

			xhr.onload = () => resolve(JSON.parse(xhr.response));

			xhr.send();
		});
	}

	getUser(id) {
		return new Promise(resolve => {
			const xhr = new XMLHttpRequest();

			xhr.open('GET', `http://localhost:3000/api/user/${id}`);

			xhr.onload = () => resolve(JSON.parse(xhr.response));

			xhr.send();
		});
	}

	addToCollection(userId, gameId, typeCollection) {
		return new Promise(resolve => {
			const xhr = new XMLHttpRequest();

			xhr.open('PUT', `http://localhost:3000/api/user/${userId}/games/${gameId}?typeCollection=${typeCollection}`);
			xhr.setRequestHeader('Content-Type', 'application/json');

			xhr.onload = () => resolve();

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

export default Users;