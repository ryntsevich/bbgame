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

}

export default Meetings;