import { handleActions } from 'redux-actions';
import { push } from 'react-router-redux';
import { initialize as initializeForm } from 'redux-form';
import { api } from 'api';
import { NotificationManager } from 'react-notifications';
import { AGUA, CEMENTERIO, OTROS } from '../../../utility/constants';

// ------------------------------------
// Constants
// ------------------------------------

const constants = {
    LOADER: `SERVICIO_LOADER`,
    ITEM: `SERVICIO_ITEM`,
    MESES_BLOQUEAR: `MESES_BLOQUEAR_PAGO`,
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
        })
        .catch((error) => console.log(error))
        .finally(() => {
            dispatch(setLoader(false));
        });
};

export const actions = {
    leer,
    obtenerMeses,
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
};

const initialState = {
    loader: false,
    item: {},
    meses: [],
};

export default handleActions(reducers, initialState);
