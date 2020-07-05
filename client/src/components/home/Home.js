import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { get, isEmpty, isString } from 'lodash';
import fetch from 'isomorphic-fetch';
import { client } from '../../Client';

import UnprotectedData from '../home/UnprotectedData';

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            unprotectedData: undefined,
            isUnprotectedDataLoading: true,
            unprotectedDataError: undefined,
            globalError: undefined
        };
    }

    componentDidMount() {
        try {
            this.getUnprotectedData();
        } catch (err) {
            let error = get(err, 'message') || get(err, 'error', err);
            console.error('Thrown error from server:', error);
            if (isEmpty(error)) {
                error = 'An error status was returned but no error message.';
            }
            if (!isString(error)) {
                error = JSON.stringify(error);
            }
            this.setState({ globalError: error });
        }
    }

    async getUnprotectedData() {
        const response = await fetch('/api/unprotected', {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({ id: 'SOME_UNPROTECTED_ID' })
        });
        const unprotectedData = await response.json();
        if (response.status !== 200) {
            const error = get(unprotectedData, 'error', unprotectedData);
            this.setState({
                unprotectedDataError: error,
                unprotectedData: undefined,
                isUnprotectedDataLoading: false
            });
        } else {
            this.setState({
                unprotectedData,
                unprotectedDataError: undefined,
                isUnprotectedDataLoading: false
            });
        }
    }

    render() {
        if (get(this.state, 'globalError')) {
            return (
                <div className="container">
                    <div className="alert alert-danger" role="alert">
                        <h4 className="alert-heading">Oh no!</h4>
                        <p>It seems we failed to get some content.</p>
                        <hr />
                        <p className="mb-0">{get(this.state, 'globalError')}</p>
                    </div>
                </div>
            );
        }
        return (
            <div className="container">
                <h1>Home</h1>
                <p className="lead">This page is unprotected.</p>
                <div className="lead">
                    <UnprotectedData
                        data={get(this.state, 'unprotectedData')}
                        error={get(this.state, 'unprotectedDataError')}
                        isLoading={get(this.state, 'isUnprotectedDataLoading')}
                    />
                </div>
                {client.isLoggedIn ? (
                    <div className="lead">
                        <div>Check out the protected page:</div>
                        <Link className="btn btn-primary btn-lg" to="/welcome">
                            Welcome
                        </Link>
                    </div>
                ) : (
                    <div className="lead">
                        <div>Login to check out the protected page:</div>
                        <Link className="btn btn-primary btn-lg" to="/login">
                            Login
                        </Link>
                    </div>
                )}
            </div>
        );
    }
}
