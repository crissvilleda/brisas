import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { NotificationContainer } from 'react-notifications';

import { Login, Profile, Registro } from './common/components/LoginRegister';
import Demo from './common/components/Demo/Demo';
import ProtectedRoute from './ProtectedRoute';
import NotFound from './common/components/layout/NotFound/NotFound';
import CrearEditarSector from './common/components/Sector/CrearEditar';
import ListarSectores from './common/components/Sector/Listar';
import CrearEditarUsuario from './common/components/Usuario/CrearEditar';
import ListarUsuarios from './common/components/Usuario/Listar';
import ListarUsuariosAgua from './common/components/UsuarioAgua/Listar';
import ListarUsuariosCementerio from './common/components/UsuarioCementerio/Listar';
import AgregarUsuarioAgua from './common/components/UsuarioAgua/CrearEditar/';
import AgregarUsuarioCementerio from './common/components/UsuarioCementerio/CrearEditar/';
import HistorialServicio from './common/components/Pagos/Listar';
import AgregarPago from './common/components/Pagos/CrearEditar';
import GaleriaProyecto from './common/components/Proyecto/Fotos';
//- configuración
import Config from './common/components/configuracion/CrearEditar';

// ----- proyecto agua
import CrearEditarProyecto from './common/components/Proyecto/CrearEditar';
import ListarProyectos from './common/components/Proyecto/Listar';
import ListarPagosProyectos from './common/components/Proyecto/Pagos/Listar';
import CrearEditarPagoProyecto from './common/components/Proyecto/Pagos/CrearEditar';

import '../assets/fonts/fonts.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-responsive-modal/styles.css';
import 'react-image-lightbox/style.css';
require('../../node_modules/font-awesome/css/font-awesome.css');
require('../../node_modules/bootstrap/dist/css/bootstrap.css');

require('../style/index.css');

module.exports = (
    <div>
        <div className="container__content">
            <Switch>
                <Route exact path="/login" component={Login} />
                <Route exact path="/registro" component={Registro} />
                <ProtectedRoute exact path="/" component={Demo} />
                {/* Sectores */}
                <ProtectedRoute
                    exact
                    path="/sector"
                    component={CrearEditarSector}
                />
                <ProtectedRoute
                    exact
                    path="/sector/:id/ver"
                    component={CrearEditarSector}
                />
                <ProtectedRoute
                    exact
                    path="/sector/:id/editar"
                    component={CrearEditarSector}
                />
                <ProtectedRoute
                    exact
                    path="/sectores"
                    component={ListarSectores}
                />
                {/* Usuarios */}
                <ProtectedRoute
                    exact
                    path="/usuario"
                    component={CrearEditarUsuario}
                />
                <ProtectedRoute
                    exact
                    path="/usuario/:id/ver"
                    component={CrearEditarUsuario}
                />
                <ProtectedRoute
                    exact
                    path="/usuario/:id/editar"
                    component={CrearEditarUsuario}
                />
                <ProtectedRoute
                    exact
                    path="/usuarios"
                    component={ListarUsuarios}
                />
                {/* Usuarios servicio Agua */}

                <ProtectedRoute
                    exact
                    path="/usuarios/agua"
                    component={ListarUsuariosAgua}
                />
                <ProtectedRoute
                    exact
                    path="/servicio/agua"
                    component={AgregarUsuarioAgua}
                />

                {/* Usuarios servicio Cementerio */}
                <ProtectedRoute
                    exact
                    path="/usuarios/cementerio"
                    component={ListarUsuariosCementerio}
                />
                <ProtectedRoute
                    exact
                    path="/servicio/cementerio"
                    component={AgregarUsuarioCementerio}
                />

                {/* Proyectos Agua */}
                <ProtectedRoute
                    exact
                    path="/proyecto/:textTipo"
                    component={CrearEditarProyecto}
                />
                <ProtectedRoute
                    exact
                    path="/proyecto/:textTipo/:id/ver"
                    component={CrearEditarProyecto}
                />
                <ProtectedRoute
                    exact
                    path="/proyecto/:textTipo/:id/editar"
                    component={CrearEditarProyecto}
                />
                <ProtectedRoute
                    exact
                    path="/proyectos/:textTipo"
                    component={ListarProyectos}
                />
                <ProtectedRoute
                    exact
                    path="/proyecto/:textTipo/:idProyecto/pagos"
                    component={ListarPagosProyectos}
                />
                <ProtectedRoute
                    exact
                    path="/proyecto/:textTipo/:idProyecto/pago/:id/ver"
                    component={CrearEditarPagoProyecto}
                />
                <ProtectedRoute
                    exact
                    path="/proyecto/:textTipo/:idProyecto/pago/:id/editar"
                    component={CrearEditarPagoProyecto}
                />
                <ProtectedRoute
                    exact
                    path="/proyecto/:textTipo/:idProyecto/pago"
                    component={CrearEditarPagoProyecto}
                />
                {/* Listar pagos */}
                <ProtectedRoute
                    exact
                    path="/servicio/:id/ver"
                    component={HistorialServicio}
                />
                <ProtectedRoute
                    exact
                    path="/servicio/:id/pagar"
                    component={AgregarPago}
                />
                <ProtectedRoute
                    exact
                    path="/proyecto/:id/fotos"
                    component={GaleriaProyecto}
                />

                <ProtectedRoute exact path="/config" component={Config} />

                <Route component={NotFound} />
            </Switch>
        </div>
        <NotificationContainer />
    </div>
);
