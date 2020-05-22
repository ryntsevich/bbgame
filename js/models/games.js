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

	getGamesByIds(games) {
		return new Promise(resolve => {
			const xhr = new XMLHttpRequest();
			
			xhr.open('POST', `http://localhost:3000/api/games/list`);
			
			xhr.onload = () => resolve(JSON.parse(xhr.response));
			xhr.setRequestHeader('Content-Type', 'application/json');
			
			xhr.send(JSON.stringify(games));
			console.log(games)
		});
	}


}

export default Games;