import { handleActions } from 'redux-actions';
import { initialize as initializeForm } from 'redux-form';
import { NotificationManager } from 'react-notifications';
import { api } from 'api';

const constants = {
    LOADER: `CONFIGURACIÓN_LOADER`,
    ITEM: `CONFIGURACION_ITEM`,
};

const leer = () => (dispatch) => {
    dispatch(setLoader(true));
    api.get(`config/leer`)
        .then((response) => {
            dispatch(setItem(response));
            dispatch(initializeForm('configForm', response));
        })
        .catch((error) => {})
        .finally(() => {
            dispatch(setLoader(false));
        });
};

const actualizar = (data) => (dispatch) => {
    dispatch(setLoader(true));
    api.post(`config/actualizar`, data)
        .then(() => {
            NotificationManager.success('Registro actualizado', 'Éxito', 3000);
            dispatch(leer());
        })
        .catch(() => {
            NotificationManager.error('Error en la edición', 'ERROR', 0);
        })
        .finally(() => {
            dispatch(setLoader(false));
        });
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

export const actions = {
    leer,
    actualizar,
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
};

const initialState = {
    loader: false,
    item: {},
};

export default handleActions(reducers, initialState);
