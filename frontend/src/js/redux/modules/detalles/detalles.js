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
    LOADER: `PROYECTO_DETALLE_LOADER`,
    DATA: `PROYECTO_DETALLE_DATA`,
    ITEM: `PROYECTO_DETALLE_ITEM`,
    PAGE: `PROYECTO_DETALLE_PAGE`,
    SEARCH: `PROYECTO_DETALLE_SEARCH`,
};

// -----------------------------------
// Pure Actions
// -----------------------------------

const setLoader = (loader) => ({
    type: constants.LOADER,
    loader,
});

const setData = (data) => ({
    type: constants.DATA,
    data,
});
const setItem = (item) => ({
    type: constants.ITEM,
    item,
});

const setPage = (page) => ({
    type: constants.PAGE,
    page,
});

const setSearch = (search) => ({
    type: constants.SEARCH,
    search,
});

// -----------------------------------
// Actions
// -----------------------------------

const listar =
    (page = 1, idProyecto = undefined) =>
    (dispatch, getStore) => {
        const resource = getStore().detalles;
        const params = { page };
        params.ordering = resource.ordering;
        params.search = resource.search;
        if (idProyecto) params.idProyecto = idProyecto;
        dispatch(setLoader(true));
        dispatch(
            setData({
                results: [],
                count: 0,
            })
        );
        api.get('detalle', params)
            .then((response) => {
                dispatch(setData(response));
                dispatch(setPage(page));
            })
            .catch(() => {})
            .finally(() => {
                dispatch(setLoader(false));
            });
    };

const leer = (id) => (dispatch) => {
    dispatch(setLoader(true));
    dispatch(setItem({}));
    api.get(`detalle/${id}`)
        .then((response) => {
            dispatch(setItem(response));
            dispatch(initializeForm('DetalleProyectoForm', response));
        })
        .catch(() => {})
        .finally(() => {
            dispatch(setLoader(false));
        });
};

const crear = (data) => (dispatch) => {
    dispatch(setLoader(true));
    api.post('detalle', data)
        .then((res) => {
            NotificationManager.success('Registro creado', '??xito', 3000);
            if (res.tipo_proyecto === AGUA)
                dispatch(push(`/proyecto/agua/${data.proyecto}/pagos`));
            if (res.tipo_proyecto === CEMENTERIO)
                dispatch(push(`/proyecto/cementerio/${data.proyecto}/pagos`));
        })
        .catch((error) => {
            let msj = 'Error en la creaci??n';
            if (error && error.dpi) msj = error.dpi;
            NotificationManager.error(msj, 'ERROR');
        })
        .finally(() => {
            dispatch(setLoader(false));
        });
};

const editar = (id, data) => (dispatch) => {
    dispatch(setLoader(true));
    const id_proyecto = data.proyecto.id;
    delete data.proyecto;
    api.put(`detalle/${id}`, data)
        .then((res) => {
            NotificationManager.success('Registro actualizado', '??xito', 3000);
            if (res.tipo_proyecto === AGUA)
                dispatch(push(`/proyecto/agua/${id_proyecto}/pagos`));
            if (res.tipo_proyecto === CEMENTERIO)
                dispatch(push(`/proyecto/cementerio/${id_proyecto}/pagos`));
        })
        .catch(() => {
            NotificationManager.error('Error en la edici??n', 'ERROR', 0);
        })
        .finally(() => {
            dispatch(setLoader(false));
        });
};

const searchChange = (search) => (dispatch) => {
    dispatch(setSearch(search));
    dispatch(listar());
};

export const actions = {
    listar,
    leer,
    crear,
    editar,
    searchChange,
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
    [constants.DATA]: (state, { data }) => {
        return {
            ...state,
            data,
        };
    },
    [constants.ITEM]: (state, { item }) => {
        return {
            ...state,
            item,
        };
    },
    [constants.PAGE]: (state, { page }) => {
        return {
            ...state,
            page,
        };
    },
    [constants.SEARCH]: (state, { search }) => {
        return {
            ...state,
            search,
        };
    },
};

const initialState = {
    loader: false,
    data: {
        results: [],
        count: 0,
    },
    item: {},
    page: 1,
    search: '',
};

export default handleActions(reducers, initialState);
