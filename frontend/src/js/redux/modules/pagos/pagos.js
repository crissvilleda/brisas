import { handleActions } from 'redux-actions';
import { push } from 'react-router-redux';
import { initialize as initializeForm } from 'redux-form';
import { api } from 'api';
import { NotificationManager } from 'react-notifications';
import { AGUA, CEMENTERIO, OTROS } from '../../../utility/constants';
import moment from 'moment';

// ------------------------------------
// Constants
// ------------------------------------

const constants = {
    LOADER: `PAGO_LOADER`,
    ITEM: `PAGO_ITEM`,
    MESES_BLOQUEAR: `MESES_BLOQUEAR_PAGO`,
    CUOTA: 'PAGO_CUOTA',
};

// -----------------------------------
// Pure Actions
// -----------------------------------

const setLoader = (loader) => ({
    type: constants.LOADER,
    loader,
});

const setItem = (item) => ({
    type: constants.ITEM,
    item,
});

const setCuota = (cuota) => ({
    type: constants.CUOTA,
    cuota,
});

const setMeses = (meses) => ({
    type: constants.MESES_BLOQUEAR,
    meses,
});

// -----------------------------------
// Actions
// -----------------------------------

const leer = (id) => (dispatch) => {
    dispatch(setLoader(true));
    api.get(`servicio/${id}`)
        .then((response) => {
            dispatch(setItem(response));
            dispatch(initializeForm('servicioForm', response));
        })
        .catch(() => {})
        .finally(() => {
            dispatch(setLoader(false));
        });
};

const obtenerMeses = (id, anio) => (dispatch, getStore) => {
    let { values } = getStore().form.pagoForm;
    if (!values) values = {};
    dispatch(setLoader(true));
    const params = {};
    if (anio) params.anio = anio;
    api.get(`servicio/${id}/meses`, params)
        .then((response) => {
            const meses = [];
            if (response.meses) {
                response.meses.forEach((mes) => {
                    values[mes['nombre']] = mes['value'];
                    if (mes['value']) meses.push(mes['nombre']);
                });
                dispatch(setMeses(meses));
                dispatch(initializeForm('pagoForm', { ...values }));
            }
            dispatch(setCuota(response.cuota));
        })
        .catch((error) => console.log(error))
        .finally(() => {
            dispatch(setLoader(false));
        });
};

const realizarPago = (id, data) => (dispatch) => {
    let { values } = getStore().form.pagoForm;
    if (!values) values = { anio: moment().year() };
    dispatch(setLoader(true));
    api.post(`servicio/${id}/pago`, data)
        .then((response) => {
            NotificationManager.success(
                'Pago registrado con exito',
                'Éxito',
                3000
            );
        })
        .catch((error) => {
            NotificationManager.error('Error al realizar el pago', 'ERROR');
        })
        .finally(() => {
            dispatch(setLoader(false));
        });
};

export const actions = {
    leer,
    obtenerMeses,
    realizarPago,
};

// -----------------------------------
// Reducers
// -----------------------------------

const reducers = {
    [constants.LOADER]: (state, { loader }) => {
        return {
            ...state,
            loader,
        };
    },
    [constants.ITEM]: (state, { item }) => {
        return {
            ...state,
            item,
        };
    },
    [constants.MESES_BLOQUEAR]: (state, { meses }) => {
        return {
            ...state,
            meses,
        };
    },
    [constants.CUOTA]: (state, { cuota }) => {
        return {
            ...state,
            cuota,
        };
    },
};

const initialState = {
    cuota: 0,
    loader: false,
    item: {},
    meses: [],
};

export default handleActions(reducers, initialState);
