import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { get, isString } from 'lodash';

export default class UnprotectedData extends Component {
    static propTypes = {
        data: PropTypes.any,
        isLoading: PropTypes.bool,
        error: PropTypes.any
    };

    render() {
        if (get(this.props, 'isLoading')) {
            return (
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            );
        } else if (get(this.props, 'data')) {
            let data = get(this.props, 'data');
            if (!isString(data)) {
                data = JSON.stringify(data);
            }
            return (
                <div>
                    <p>Data returned from the API:</p>
                    <code>{data}</code>
                </div>
            );
        } else {
            return (
                <div className="alert alert-danger" role="alert">
                    An error occurred: {get(this.props, 'error', 'Unable to determine the state.')}
                </div>
            );
        }
    }
}
