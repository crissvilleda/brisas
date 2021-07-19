import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
class SideBar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { toggleOpen, navToggle, logOut } = this.props;
        return (
            <aside
                className={`main-sidebar px-0 col-12 col-md-3 col-lg-2 ${
                    toggleOpen ? '' : 'open'
                }`}
            >
                <div className="main-navbar">
                    <nav className="align-items-stretch bg-white flex-md-nowrap border-bottom p-0 navbar navbar-light">
                        <a href="#" className="w-100 mr-0 navbar-brand">
                            <div className="d-table m-auto">
                                <span>Sistema Las brisas</span>
                            </div>
                        </a>
                        <a
                            className="toggle-sidebar d-sm-inline d-md-none d-lg-none"
                            onClick={navToggle}
                        >
                            <i className="material-icons"></i>
                        </a>
                    </nav>
                </div>
                <div className="nav-wrapper">
                    <ul className="nav--no-borders flex-column nav">
                        <li className="nav-item">
                            <NavLink
                                to="/"
                                exact
                                className="nav-link "
                                activeClassName={'active'}
                            >
                                <div className="d-inline-block item-icon-wrapper">
                                    <span style={{ fontSize: '1.25rem' }}>
                                        <i className="fas fa-home"></i>
                                    </span>
                                </div>
                                <span>INICIO</span>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to="/sectores"
                                className="nav-link"
                                activeClassName={'active'}
                            >
                                <div className="d-inline-block item-icon-wrapper">
                                    <span style={{ fontSize: '1.25rem' }}>
                                        <i className="fas fa-vector-square"></i>
                                    </span>
                                </div>
                                <span>SECTORES</span>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to="/usuarios"
                                className="nav-link"
                                activeClassName={'active'}
                            >
                                <div className="d-inline-block item-icon-wrapper">
                                    <span style={{ fontSize: '1.25rem' }}>
                                        <i className="fas fa-user"></i>
                                    </span>
                                </div>
                                <span>USUARIOS</span>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to="/usuarios/agua"
                                className="nav-link"
                                activeClassName={'active'}
                            >
                                <div className="d-inline-block item-icon-wrapper">
                                    <span style={{ fontSize: '1.25rem' }}>
                                        <i className="fas fa-user"></i>
                                    </span>
                                    <span style={{ fontSize: '1.25rem' }}>
                                        <i className="fas fa-tint"></i>
                                    </span>
                                </div>
                                <span>USUARIOS AGUA</span>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to="/usuarios/cementerio"
                                className="nav-link"
                                activeClassName={'active'}
                            >
                                <div className="d-inline-block item-icon-wrapper">
                                    <span style={{ fontSize: '1.25rem' }}>
                                        <i className="fas fa-user"></i>
                                    </span>
                                    <span style={{ fontSize: '1.25rem' }}>
                                        <i className="fas fa-skull"></i>
                                    </span>
                                </div>
                                <span>USUARIOS CEMENTERIO </span>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to="/proyectos/agua"
                                className="nav-link"
                                activeClassName={'active'}
                            >
                                <div className="d-inline-block item-icon-wrapper">
                                    <span style={{ fontSize: '1.25rem' }}>
                                        <i className="fas fa-briefcase"></i>
                                    </span>
                                    <span style={{ fontSize: '1.25rem' }}>
                                        <i className="fas fa-tint"></i>
                                    </span>
                                </div>
                                <span>PROYECTOS AGUA</span>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to="/proyectos/cementerio"
                                className="nav-link"
                                activeClassName={'active'}
                            >
                                <div className="d-inline-block item-icon-wrapper">
                                    <span style={{ fontSize: '1.25rem' }}>
                                        <i className="fas fa-briefcase"></i>
                                    </span>
                                    <span style={{ fontSize: '1.25rem' }}>
                                        <i className="fas fa-skull"></i>
                                    </span>
                                </div>
                                <span>PROYECTOS CEMENTERIO</span>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to="/config"
                                className="nav-link"
                                activeClassName={'active'}
                            >
                                <div className="d-inline-block item-icon-wrapper">
                                    <span style={{ fontSize: '1.25rem' }}>
                                        <i className="fas fa-tools"></i>
                                    </span>
                                </div>
                                <span>CONFIGURACIÓN</span>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <Link
                                to="/login"
                                onClick={logOut}
                                className="nav-link"
                            >
                                <div className="d-inline-block item-icon-wrapper">
                                    <i className="material-icons">lock</i>
                                </div>
                                <span>Salir</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </aside>
        );
    }
}

export default SideBar;
