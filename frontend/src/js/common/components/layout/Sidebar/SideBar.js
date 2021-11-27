import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import InicioIcono from '../../../../../assets/img/casa.png';
import SectorIcono from '../../../../../assets/img/grafico-de-torta.png';
import UsuariosIcono from '../../../../../assets/img/lista-de-contactos.png';
import UsuariosAguaIcono from '../../../../../assets/img/usuario-agua.png';
import UsuariosCementerioIcono from '../../../../../assets/img/usuario-cementerio.png';
import ProyectoAguaIcono from '../../../../../assets/img/proyecto-agua.png';
import ProyectoCementerioIcono from '../../../../../assets/img/proyecto-cementerio.png';
import ConfiguracionIcono from '../../../../../assets/img/configuracion.png';
import SalirIcono from '../../../../../assets/img/salida.png';
import FallecidosIcono from '../../../../../assets/img/fallecido.png';
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
                                <img
                                    src={InicioIcono}
                                    width="25px"
                                    className="mr-2"
                                />

                                <span>INICIO</span>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to="/sectores"
                                className="nav-link"
                                activeClassName={'active'}
                            >
                                <img
                                    src={SectorIcono}
                                    width="25px"
                                    className="mr-2"
                                />
                                <span>SECTORES</span>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to="/usuarios"
                                className="nav-link"
                                activeClassName={'active'}
                            >
                                <img
                                    src={UsuariosIcono}
                                    width="25px"
                                    className="mr-2"
                                />
                                <span>USUARIOS</span>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to="/usuarios/agua"
                                className="nav-link"
                                activeClassName={'active'}
                            >
                                <img
                                    src={UsuariosAguaIcono}
                                    width="25px"
                                    className="mr-2"
                                />
                                <span>USUARIOS AGUA</span>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to="/usuarios/cementerio"
                                className="nav-link"
                                activeClassName={'active'}
                            >
                                <img
                                    src={UsuariosCementerioIcono}
                                    width="25px"
                                    className="mr-2"
                                />
                                <span>USUARIOS CEMENTERIO </span>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to="/fallecidos"
                                className="nav-link"
                                activeClassName={'active'}
                            >
                                <img
                                    src={FallecidosIcono}
                                    width="25px"
                                    className="mr-2"
                                />
                                <span>FALLECIDOS</span>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to="/proyectos/agua"
                                className="nav-link"
                                activeClassName={'active'}
                            >
                                <img
                                    src={ProyectoAguaIcono}
                                    width="25px"
                                    className="mr-2"
                                />
                                <span>PROYECTOS AGUA</span>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to="/proyectos/cementerio"
                                className="nav-link"
                                activeClassName={'active'}
                            >
                                <img
                                    src={ProyectoCementerioIcono}
                                    width="25px"
                                    className="mr-2"
                                />
                                <span>PROYECTOS CEMENTERIO</span>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to="/config"
                                className="nav-link"
                                activeClassName={'active'}
                            >
                                <img
                                    src={ConfiguracionIcono}
                                    width="25px"
                                    className="mr-2"
                                />
                                <span>CONFIGURACIÓN</span>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <Link
                                to="/login"
                                onClick={logOut}
                                className="nav-link"
                            >
                                <img
                                    src={SalirIcono}
                                    width="25px"
                                    className="mr-2"
                                />
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
