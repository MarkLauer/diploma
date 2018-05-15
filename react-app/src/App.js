import React from 'react';
import {ajax} from './utils';

class App extends React.Component {
    componentDidMount() {
        ajax('/test').then(data => console.log(data));
    }

    render() {
        return (
            <div />
        );
    }
}

export default App;