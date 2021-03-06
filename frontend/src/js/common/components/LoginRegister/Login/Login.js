import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import LoginForm from './LoginForm';
import './login.css';
import LoadMask from 'Utils/LoadMask/LoadMask';

class Login extends Component {
    static propTypes = {
        onSubmit: PropTypes.func.isRequired,
    };

    componentDidMount(props) {
        this.state = { prueba: true };
    }

    render() {
        const { onSubmit, loader } = this.props;
        if (localStorage.getItem('token')) {
            return <Redirect to="/" />;
        }
        return (
            <div className="blue-gradient-bg">
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <div className="d-flex flex-column justify-content-center align-items-center pt-3 bienvenida">
                    <h3 className="text-center">Sistema las brisas</h3>
                </div>
                <br />
                <div className="login-wrapper">
                    <div className="card card-login col-lg-3 col-md-4 col-11">
                        <h5 className="text-center pv">INGRESAR</h5>
                        <LoadMask loading={loader} light>
                            <LoginForm onSubmit={onSubmit} />
                        </LoadMask>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
