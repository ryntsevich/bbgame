class Meetings {
    getMeetingsList() {
        return new Promise(resolve => {
            const xhr = new XMLHttpRequest();

            xhr.open('GET', 'http://localhost:3000/api/meetings');

            xhr.onload = () => resolve(JSON.parse(xhr.response));

            xhr.send();
        });
    }
    getMeeting(id) {
        return new Promise(resolve => {
            const xhr = new XMLHttpRequest();

            xhr.open('GET', `http://localhost:3000/api/meeting/${id}`);

            xhr.onload = () => resolve(JSON.parse(xhr.response));

            xhr.send();
        });
    }

    addMeeting(newMeeting) {
		return new Promise(resolve => {
			const xhr = new XMLHttpRequest();

			xhr.open('POST', 'http://localhost:3000/api/meeting');
			xhr.setRequestHeader('Content-Type', 'application/json');

			xhr.onload = () => resolve(JSON.parse(xhr.response));

			xhr.send(JSON.stringify(newMeeting));
		});
	}

}

export default Meetings;