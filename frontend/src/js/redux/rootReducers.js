import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import login from './modules/cuenta/login';
import register from './modules/cuenta/register';
import profile from './modules/cuenta/profile';
import usuarios from './modules/usuarios/usuarios';
import notificaciones from './modules/notificaciones/notificaciones';
import sectores from './modules/sectores/sectores';
import proyectos from './modules/proyectos/proyectos';
import servicios from './modules/servicios/servicios';
import pagos from './modules/pagos/pagos';
import detalles from './modules/detalles/detalles';
import config from './modules/configuracion/configuracion';
import fallecidos from './modules/fallecidos/fallecidos';

export default combineReducers({
    form: formReducer,
    login,
    register,
    profile,
    usuarios,
    routing,
    notificaciones,
    sectores,
    proyectos,
    servicios,
    pagos,
    detalles,
    config,
    fallecidos,
});
