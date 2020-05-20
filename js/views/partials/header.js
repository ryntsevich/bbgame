import Component from '../component.js';

class Header extends Component {
    render() {
        const resource = this.request.resource;

        return new Promise(resolve => {
            resolve(`
                 <header class="header">                    
                     <a class="header__link ${!resource ? 'active' : ''}" href="/#/">
                         Sign In
                     </a>
                     <a class="header__link ${resource === 'games' ? 'active' : ''}" href="/#/games">
                         Games List
                     </a>     
                     <a class="header__link ${resource === 'users' ? 'active' : ''}" href="/#/users">
                     Users List
                 </a>   
                 <a class="header__link ${resource === 'meetings' ? 'active' : ''}" href="/#/meetings">
                 Meetings List
             </a>                                       
                </header>
            `);
        });
    }
}

export default Header;