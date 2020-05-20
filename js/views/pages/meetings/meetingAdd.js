import Component from '../../component.js';
// import Meetings from '../../../models/meetings.js';
import Error404 from '../../../views/pages/error404.js';


class MeetingAdd extends Component {

    render() {
        return new Promise(resolve => {
            resolve(`
            <h1 class="page-title">Создание встречи</h1>
            <div class="meet">
                <div class="meet-propertis">
                    <div class="meet-propertis__title">Игра:</div>
                    <input class="meet-propertis__content">
                </div>
                <div class="meet-propertis">
                    <div class="meet-propertis__title">Дата:</div>
                    <input class="meet-propertis__content">
                </div>
                <div class="meet-propertis">
                    <div class="meet-propertis__title">Время:</div>
                    <input class="meet-propertis__content">
                </div>
                <div class="meet-propertis">
                    <div class="meet-propertis__title">Место:</div>
                    <input class="meet-propertis__content">
                </div>
                <div class="meet-propertis">
                    <div class="meet-propertis__title">Описание:</div>
                    <input class="meet-propertis__content">
                </div>
                <div class="meet-propertis-btn">
                    <button class="btn-create-meet">Создать</button>
                </div>
            </div>
            `);
        });
    }


    

}

export default MeetingAdd;

