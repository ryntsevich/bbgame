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
			console.log(id)
			const xhr = new XMLHttpRequest();

			xhr.open('GET', `http://localhost:3000/api/users/${id}`);

			xhr.onload = () => resolve(JSON.parse(xhr.response));

			xhr.send();
		});
	}

	addToCollection(userId, gameId, typeCollection) {
		return new Promise(resolve => {
			const xhr = new XMLHttpRequest();

			xhr.open('PUT', `http://localhost:3000/api/users/${userId}/games/${gameId}?typeCollection=${typeCollection}&action=add`);
			xhr.setRequestHeader('Content-Type', 'application/json');

			xhr.onload = () => resolve();

			xhr.send();
		});
	}

	deleteFromCollection(userId, gameId, typeCollection) {
		return new Promise(resolve => {
			const xhr = new XMLHttpRequest();

			xhr.open('PUT', `http://localhost:3000/api/users/${userId}/games/${gameId}?typeCollection=${typeCollection}&action=remove`);
			xhr.setRequestHeader('Content-Type', 'application/json');

			xhr.onload = () => resolve();

			xhr.send();
		});
	}

	addUser(newUser) {
		return new Promise(resolve => {
			const xhr = new XMLHttpRequest();

			xhr.open('POST', 'http://localhost:3000/api/users');
			xhr.setRequestHeader('Content-Type', 'application/json');

			xhr.onload = () => resolve(JSON.parse(xhr.response));

			xhr.send(JSON.stringify(newUser));
		});
	}

	getUsersByIds(users) {
		return new Promise(resolve => {
			const xhr = new XMLHttpRequest();

			xhr.open('POST', 'http://localhost:3000/api/users/names');
			xhr.setRequestHeader('Content-Type', 'application/json');

			xhr.onload = () => resolve(JSON.parse(xhr.response));

			xhr.send(JSON.stringify({ ids: users }));
		});
	}
}

export default Users;