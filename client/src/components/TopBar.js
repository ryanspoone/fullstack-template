import React from 'react';
import { Link } from 'react-router-dom';
import { client } from '../Client';

const TopBar = () => (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
        <Link className="navbar-brand" to="#">
            Navbar
        </Link>
        <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navDefault"
            aria-controls="navDefault"
            aria-expanded="false"
            aria-label="Toggle navigation"
        >
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navDefault">
            <ul className="navbar-nav mr-auto">
                <Link className="nav-link" to="/home">
                    Home
                </Link>
                <li className="nav-item dropdown">
                    <Link
                        className="nav-link dropdown-toggle"
                        to="#"
                        id="dropdown01"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                    >
                        Protected
                    </Link>
                    <div className="dropdown-menu" aria-labelledby="dropdown01">
                        <Link
                            className={client.isLoggedIn ? 'dropdown-item' : 'dropdown-item disabled'}
                            to="/welcome"
                        >
                            Welcome
                        </Link>
                    </div>
                </li>
                {client.isLoggedIn ? (
                    <Link className="nav-link" to="/logout">
                        Logout
                    </Link>
                ) : (
                    <Link className="nav-link" to="/login">
                        Login
                    </Link>
                )}
            </ul>
            <form className="form-inline my-2 my-lg-0">
                <input
                    className="form-control mr-sm-2"
                    type="text"
                    placeholder="Search"
                    aria-label="Search"
                />
                <button className="btn btn-secondary my-2 my-sm-0" type="submit">
                    Search
                </button>
            </form>
        </div>
    </nav>
);

export default TopBar;
