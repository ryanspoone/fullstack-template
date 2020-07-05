import React, { Component } from 'react';
import { get, isEmpty, isString } from 'lodash';
import fetch from 'isomorphic-fetch';
import '../../styles/welcome.css';
import ProtectedData from './ProtectedData';

export default class Welcome extends Component {
    constructor(props) {
        super(props);

        this.state = {
            protectedData: undefined,
            isProtectedDataLoading: true,
            protectedDataError: undefined,
            globalError: undefined
        };
    }

    componentDidMount() {
        try {
            this.getProtectedData();
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

    async getProtectedData() {
        const response = await fetch('/api/protected?token=D6W69PRgCoDKgHZGJmRUNA', {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({ id: 'SOME_PROTECTED_ID' })
        });
        const protectedData = await response.json();
        if (response.status !== 200) {
            const error = get(protectedData, 'error', protectedData);
            this.setState({
                protectedDataError: error,
                protectedData: undefined,
                isProtectedDataLoading: false
            });
        } else {
            this.setState({ protectedData, protectedDataError: undefined, isProtectedDataLoading: false });
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
                <h1>Welcome</h1>
                <p className="lead">This page is protected.</p>
                <div className="lead">
                    <ProtectedData
                        data={get(this.state, 'protectedData')}
                        error={get(this.state, 'protectedDataError')}
                        isLoading={get(this.state, 'isProtectedDataLoading')}
                    />
                </div>
            </div>
        );
    }
}
