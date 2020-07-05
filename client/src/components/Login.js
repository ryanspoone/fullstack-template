import React, { Component } from 'react';
import { get } from 'lodash';
import { Redirect } from 'react-router-dom';
import { client } from '../Client';
import '../styles/login.css';

class Login extends Component {
    state = {
        loginInProgress: false,
        shouldRedirect: false
    };

    performLogin = () => {
        this.setState({ loginInProgress: true });
        client.login().then(() => this.setState({ shouldRedirect: true }));
    };

    redirectPath = () => {
        return get(this.props, 'location.state.from.pathname', '/welcome');
    };

    render() {
        if (get(this.state, 'shouldRedirect')) {
            return <Redirect to={this.redirectPath()} />;
        } else {
            return (
                <form className="form-login">
                    <img className="mb-4" src="/images/logo.png" alt="" width="72" height="72" />
                    <h1 className="h3 mb-3 font-weight-normal">Please login</h1>
                    <label htmlFor="inputEmail" className="sr-only">
                        Email address
                    </label>
                    <input
                        type="email"
                        id="inputEmail"
                        className="form-control"
                        placeholder="Email address"
                        required
                        autoFocus
                    />
                    <label htmlFor="inputPassword" className="sr-only">
                        Password
                    </label>
                    <input
                        type="password"
                        id="inputPassword"
                        className="form-control"
                        placeholder="Password"
                        required
                    />
                    <div className="checkbox mb-3">
                        <label>
                            <input type="checkbox" value="remember-me" /> Remember me
                        </label>
                    </div>
                    {get(this.state, 'loginInProgress') ? (
                        <div className="spinner-border" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    ) : (
                        <button
                            className="btn btn-lg btn-primary btn-block"
                            type="submit"
                            onClick={this.performLogin}
                        >
                            Login
                        </button>
                    )}
                </form>
            );
        }
    }
}

export default Login;
