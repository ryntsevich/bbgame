const express = require('express'),
	bodyParser = require('body-parser'),
	morgan = require('morgan'),
	fs = require('file-system'),
	shortId = require('shortid'),
	dbFilePathGames = '../db/games.json',
	dbFilePathUsers = '../db/users.json',
	dbFilePathMeetings = '../db/meetings.json',
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

app.put('/api/user/:userId/games/:gameId', (req, res) => {
	const usersData = getUsersFromDB(),
		gameId = req.params.gameId,
		user = usersData.find(user => user.id === req.params.userId);

	switch (req.query.typeCollection) {
		case 'usersGames':
			user.collectionGames.includes(gameId) || user.collectionGames.push(gameId);
			break;

		case 'wishGames':
			user.wishGames.includes(gameId) || user.wishGames.push(gameId);
			break;

		case 'playedGames':
			user.playedGames.includes(gameId) || user.playedGames.push(gameId);
			break;
	}
	setUsersToDB(usersData);
	res.sendStatus(204);
});

app.get('/api/users', (req, res) => {
	res.send(getUsersFromDB());
});

app.get('/api/user/:id', (req, res) => {
	const usersData = getUsersFromDB(),
		user = usersData.find(user => user.id === req.params.id);

	user ? res.send(user) : res.send({});
});

app.get('/api/meetings', (req, res) => {
	res.send(getMeetingsFromDB());
});

app.get('/api/meeting/:id', (req, res) => {
	const meetingsData = getMeetingsFromDB(),
		meeting = meetingsData.find(meeting => meeting.id === req.params.id);

	meeting ? res.send(meeting) : res.send({});
});

app.post('/api/meeting', (req, res) => {
	const meetingsData = getMeetingsFromDB(),
		meeting = req.body;

	meeting.id = shortId.generate();
	meeting.players = ['01'];
	console.log(meeting.players);
	meeting.description = meeting.description || '-';
	meeting.status = 'Actual';

	meetingsData.push(meeting);
	setMeetingsToDB(meetingsData);

	res.send(meeting);
});

app.delete('/api/meeting/:id', (req, res) => {
	const meetingsData = getMeetingsFromDB(),
		meetings = meetingsData.filter(meeting => meeting.id != req.params.id);

	setMeetingsToDB(meetings);
	res.sendStatus(204);
});

app.put('/api/meeting/:id', (req, res) => {
	const meetingsData = getMeetingsFromDB(),
		meeting = meetingsData.find(meeting => meeting.id === req.params.id),
		updatedMeeting = req.body;

	meeting.day = updatedMeeting.day;
	meeting.time = updatedMeeting.time;
	meeting.place = updatedMeeting.place;
	meeting.description = updatedMeeting.description || '-';

	setMeetingsToDB(meetingsData);

	res.sendStatus(204);
});

app.put('/api/meeting/:id/close', (req, res) => {
	const meetingsData = getMeetingsFromDB();
	meetingsData.find(meeting => meeting.id === req.params.id).status = 'Closed';

	setMeetingsToDB(meetingsData);

	res.sendStatus(204);
});

app.put('/api/meeting/:meetingId/users/:userId', (req, res) => {
	const usersData = getUsersFromDB(),
		user = usersData.find(user => user.id === req.params.userId),
		meetingsData = getMeetingsFromDB(),
		meeting = meetingsData.find(meeting => meeting.id === req.params.meetingId);

	meeting.players.push(user.id);

	setMeetingsToDB(meetingsData);

	res.sendStatus(204);
});

app.get('http://localhost:3000/api/meeting/list', (req, res) => {

	const meetingsData = getMeetingsFromDB(),
		meeting = meetingsData.find(meeting => meeting.id === req.params.id);
	res.send(meeting.players);
});


function getGamesFromDB() {
	return JSON.parse(fs.readFileSync(dbFilePathGames, 'utf8'));
}

function getUsersFromDB() {
	return JSON.parse(fs.readFileSync(dbFilePathUsers, 'utf8'));
}

function getMeetingsFromDB() {
	return JSON.parse(fs.readFileSync(dbFilePathMeetings, 'utf8'));
}

function setUsersToDB(usersData) {
	fs.writeFileSync(dbFilePathUsers, JSON.stringify(usersData));
}

function setMeetingsToDB(meetingsData) {
	fs.writeFileSync(dbFilePathMeetings, JSON.stringify(meetingsData));
}

app.listen(3000, () => console.log('Server has been started...'));

