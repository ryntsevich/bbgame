class Meetings {
    getMeetingsList() {
        return new Promise(resolve => {
            const xhr = new XMLHttpRequest();

            xhr.open('GET', 'http://localhost:3000/api/meetings?status=Actual');

            xhr.onload = () => resolve(JSON.parse(xhr.response));

            xhr.send();
        });
    }
    getMeeting(id) {
        return new Promise(resolve => {
            const xhr = new XMLHttpRequest();

            xhr.open('GET', `http://localhost:3000/api/meetings/${id}`);

            xhr.onload = () => resolve(JSON.parse(xhr.response));

            xhr.send();
        });
    }

    addMeeting(newMeeting) {
        return new Promise(resolve => {
            const xhr = new XMLHttpRequest();

            xhr.open('POST', 'http://localhost:3000/api/meetings');
            xhr.setRequestHeader('Content-Type', 'application/json');

            xhr.onload = () => resolve(JSON.parse(xhr.response));

            xhr.send(JSON.stringify(newMeeting));
        });
    }

    deleteMeeting(id) {
        return new Promise(resolve => {
            const xhr = new XMLHttpRequest();

            xhr.open('DELETE', `http://localhost:3000/api/meetings/${id}`);
            xhr.setRequestHeader('Content-Type', 'application/json');

            xhr.onload = () => resolve();

            xhr.send();
        });
    }
    editMeeting(updatedMeeting) {
        return new Promise(resolve => {
            const xhr = new XMLHttpRequest();

            xhr.open('PUT', `http://localhost:3000/api/meetings/${updatedMeeting._id}`);
            xhr.setRequestHeader('Content-Type', 'application/json');

            xhr.onload = () => resolve();

            xhr.send(JSON.stringify(updatedMeeting));
        });
    }

    closeMeeting(id) {
        return new Promise(resolve => {
            const xhr = new XMLHttpRequest();

            xhr.open('PUT', `http://localhost:3000/api/meetings/${id}/close`);
            xhr.setRequestHeader('Content-Type', 'application/json');

            xhr.onload = () => resolve();


            xhr.send(JSON.stringify({ status: 'Closed' }));
        });
    }

    joinToMeeting(meetingId, userId) {
        return new Promise(resolve => {
            const xhr = new XMLHttpRequest();

            xhr.open('PUT', `http://localhost:3000/api/meetings/${meetingId}/users/${userId}?action=add`);
            xhr.setRequestHeader('Content-Type', 'application/json');

            xhr.onload = () => resolve();

            xhr.send();
        });
    }

    getPlayers(meeting) {
        return new Promise(resolve => {
            const xhr = new XMLHttpRequest();

            xhr.open('GET', `http://localhost:3000/api/meeting/${meeting._id}list`);

            xhr.onload = () => resolve(JSON.parse(xhr.response));

            xhr.send(JSON.stringify(meeting));
        });

    }

}

export default Meetings;