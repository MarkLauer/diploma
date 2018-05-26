import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { AuthProvider, AuthForm } from './Auth';
import { ajax } from './utils';

class Home extends React.Component {
    render() {
        return (
            <div>
                <h2>Home</h2>
                <button onClick={() => {
                    ajax('/conferences/get_all').then(data => {
                        const { conferences } = JSON.parse(data);
                        ajax('/pages/create', {
                            name: 'test page',
                            content: 'sample',
                            conference_id: conferences[0]['id']
                        })
                    });
                }}>create page</button>
                <button onClick={() => ajax('/pages/get_all').then(pages => console.log(pages))}>
                    get pages
                </button>
                <button onClick={() => ajax('/conferences/get_all').then(data => console.log(data))}>
                    get conferences
                </button>
            </div>
        );
    }
}

const About = () => (
    <div>
        <h2>About</h2>
    </div>
)

const Topic = ({ match }) => (
    <div>
        <h3>{match.params.topicId}</h3>
    </div>
)

const Topics = ({ match }) => (
    <div>
        <h2>Topics</h2>
        <ul>
            <li>
                <Link to={`${match.url}/rendering`}>
                    Rendering with React
                </Link>
            </li>
            <li>
                <Link to={`${match.url}/components`}>
                    Components
                </Link>
            </li>
            <li>
                <Link to={`${match.url}/props-v-state`}>
                    Props v. State
                </Link>
            </li>
        </ul>

        <Route path={`${match.path}/:topicId`} component={Topic} />
        <Route exact path={match.path} render={() => (
            <h3>Please select a topic.</h3>
        )} />
    </div>
)

const Navbar = () => (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link to="/" className="navbar-brand">Conference</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                    <Link to="/" className="nav-link">Home <span className="sr-only">(current)</span></Link>
                </li>
                <li className="nav-item">
                    <Link to="/about" className="nav-link">About</Link>
                </li>
                <li className="nav-item">
                    <Link to="/topics" className="nav-link">Topics</Link>
                </li>
            </ul>
            <AuthForm />
        </div>
    </nav>
);

class App extends React.Component {
    render() {
        return (
            <AuthProvider>
                <BrowserRouter>
                    <div className="container">
                        <Navbar />
                        <Route exact path="/" component={Home} />
                        <Route path="/about" component={About} />
                        <Route path="/topics" component={Topics} />
                    </div>
                </BrowserRouter>
            </AuthProvider>
        );
    }
}

export default App;
