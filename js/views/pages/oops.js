import Component from '../component.js';

class Error extends Component {
    render() {
        return new Promise(resolve => {
            resolve(`
            <div class="error">
            <div class="main">Oops!</div>
            <p>Something went wrong and we couldn't process your request. &#x2639;</p>
        </div>
            `);
        });
    }
}

export default Error;