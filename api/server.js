const express = require('express'),
	bodyParser = require('body-parser'),
	morgan = require('morgan'),
	fs = require('file-system'),
	shortId = require('shortid'),
	dbFilePath = 'games.json',
	dbFileRathUsers = 'users.json',
	app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('common'));
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});

app.get('/api/games', (req, res) => {
	res.send(getGamesFromDB());
});

app.get('/api/game/:id', (req, res) => {
	const gamesData = getGamesFromDB(),
		game = gamesData.find(game => game.id === req.params.id);

	game ? res.send(game) : res.send({});
});


app.get('/api/users', (req, res) => {
	res.send(getUsersFromDB());
});

app.get('/api/user/:id', (req, res) => {
	const usersData = getUsersFromDB(),
		user = usersData.find(user => user.id === req.params.id);

	user ? res.send(user) : res.send({});
});

app.post('/api/games/list', (req, res) => {
	const gamesData = getGamesFromDB(),
		gamesIds = req.body,
		games = [];

	for (let i = 0; i < gamesIds.length; i++) {
		for (let j = 0; j < gamesData.length; j++) {
			if (gamesData[j].id === gamesIds[i]) {
				games.push(gamesData[j]);
			}
		}
	}

	res.send(games);
});

function getGamesFromDB() {
	return JSON.parse(fs.readFileSync(dbFilePath, 'utf8'));
}

function getUsersFromDB() {
	return JSON.parse(fs.readFileSync(dbFileRathUsers, 'utf8'));
}

// function setTasksToDB(tasksData) {
//     fs.writeFileSync(dbFilePath, JSON.stringify(tasksData));
// }

app.listen(3000, () => console.log('Server has been started...'));

