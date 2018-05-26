import React from 'react';
import { ajax } from './utils';

export const AuthContext = React.createContext();

export class AuthProvider extends React.Component {
    state = {
        status: false,
        email: '',
        password: ''
    }

    componentDidMount() {
        ajax('/auth/is_logged').then(data => {
            const { status, email } = JSON.parse(data);
            if (status && email) this.setState({ status, email });
        });
    }

    handleChange = event => this.setState({ [event.target.name]: event.target.value });

    handleSubmit = event => {
        event.preventDefault();
        const { email, password } = this.state;
        if (event.target.name === 'login')
            ajax('/auth/login', { email, password }).then(data => {
                const { status, error } = JSON.parse(data);
                if (error) console.log(error);
                if (status) this.setState({ status });
            });
        else if (event.target.name === 'register')
            ajax('/auth/register', { email, password }).then(data => {
                const { status, error } = JSON.parse(data);
                if (error) console.log(error);
                if (status) this.setState({ status });
            });
    };

    handleLogout = () => ajax('/auth/logout').then(data => {
        const { status } = JSON.parse(data);
        this.setState({ status: !status });
    });

    render() {
        return (
            <AuthContext.Provider value={{
                state: this.state,
                onChange: this.handleChange,
                onSubmit: this.handleSubmit,
                onLogout: this.handleLogout
            }}>
                {this.props.children}
            </AuthContext.Provider>
        );
    }
}

export class AuthForm extends React.Component {
    state = { mode: 'initial' };

    handleModeChange = event => this.setState({ mode: event.target.name });

    render() {
        const { mode } = this.state;

        return (
            <AuthContext.Consumer>
                {context => context.state.status
                    ? <div className="my-2 my-lg-0">
                        <button className="btn btn-link">{context.state.email}</button>
                        <button className="btn btn-outline-danger" onClick={context.onLogout}>Logout</button>
                    </div>
                    : mode === 'initial'
                        ? <div className="btn-group my-2 my-lg-0">
                            <button className="btn btn-outline-primary" name="login" onClick={this.handleModeChange}>Login</button>
                            <button className="btn btn-outline-primary" name="register" onClick={this.handleModeChange}>Register</button>
                        </div>
                        : <form className="form-inline my-2 my-lg-0" name={mode} onSubmit={context.onSubmit}>
                            <input className="form-control mr-sm-2"
                                type="text"
                                name="email"
                                required
                                placeholder="Email"
                                aria-label="Email"
                                value={context.state.email}
                                onChange={context.onChange} />
                            <input className="form-control mr-sm-2"
                                type="password"
                                name="password"
                                required
                                placeholder="Password"
                                aria-label="Password"
                                value={context.state.password}
                                onChange={context.onChange} />
                            <div className="btn-group">
                                <button className="btn btn-outline-primary" type="submit">{(mode === 'login' && 'Login') || (mode === 'register' && 'Register')}</button>
                                <button className="btn btn-outline-danger" name="initial" onClick={this.handleModeChange}>Cancel</button>
                            </div>
                        </form>
                }
            </AuthContext.Consumer>
        );
    }
}
