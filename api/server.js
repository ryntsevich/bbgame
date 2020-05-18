const express = require('express'),
      bodyParser = require('body-parser'),
      morgan = require('morgan'),
	  fs = require('file-system'),
	  shortId = require('shortid'),
	  dbFilePath = 'games.json',
      app = express();

app.use(bodyParser.urlencoded({extended: false}));
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

app.post('/api/task', (req, res) => {
	const tasksData = getTasksFromDB(),
		task = req.body;

	task.id = shortId.generate();
	task.description = task.description || 'No Description';
	task.status = 'In Progress';

    tasksData.push(task);
    setTasksToDB(tasksData);

	res.send(task);
});



app.put('/api/task/:id', (req, res) => {
	const tasksData = getTasksFromDB(),
		task = tasksData.find(task => task.id === req.params.id),
		updatedTask = req.body;

	task.title = updatedTask.title;
	task.description = updatedTask.description || 'No Description';

    setTasksToDB(tasksData);

	res.sendStatus(204);
});

function getGamesFromDB() {
    return JSON.parse(fs.readFileSync(dbFilePath, 'utf8'));
}

// function setTasksToDB(tasksData) {
//     fs.writeFileSync(dbFilePath, JSON.stringify(tasksData));
// }

app.listen(3000, () => console.log('Server has been started...'));