import { generateID } from '../helpers/utils.js';

class Games {
    constructor() {
        this.defaultGames = [
            {
                id: generateID(),
                img: 'https://i.ibb.co/xJkHbnc/photo1-200.jpg',
                title: 'Серп'
            },
            {
                id: generateID(),
                img: 'https://i.ibb.co/6n63mzK/photo2-200.png',
                title: 'Крестный отец. Империя Корлеоне'
            },
            {
                id: generateID(),
                img: 'https://i.ibb.co/VBWcBBq/photo3-200.jpg',
                title: 'Пандемия'
            },
            {
                id: generateID(),
                img: 'https://i.ibb.co/8794HWq/photo4-200.jpg',
                title: 'Кодовые имена'
            },
            {
                id: generateID(),
                img: 'https://i.ibb.co/4Ppr1dy/photo5-200.jpg',
                title: 'Дикие джунгли'
            },
            {
                id: generateID(),
                img: 'https://i.ibb.co/gR8Q9jJ/photo6-200.png',
                title: 'Кланы Каледонии'
            }
        ];
        this.gamesLS = localStorage.setItem('games', JSON.stringify(this.defaultGames));
    }

    getGamesFromLS() {
        return JSON.parse(localStorage.getItem('games'));
    }
}

export default Games;