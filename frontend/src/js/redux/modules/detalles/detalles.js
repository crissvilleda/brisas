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
    ORDERING: `PROYECTO_DETALLE_ORDERING`,
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

const setOrdering = (ordering) => ({
    type: constants.ORDERING,
    ordering,
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
            dispatch(setData({
                results: [],
                count: 0,
            }));
            api.get('detalle', params)
                .then((response) => {
                    dispatch(setData(response));
                    dispatch(setPage(page));
                })
                .catch(() => { })
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
        .catch(() => { })
        .finally(() => {
            dispatch(setLoader(false));
        });
};

const crear = (data) => (dispatch) => {
    dispatch(setLoader(true));
    api.post('detalle', data)
        .then(() => {
            NotificationManager.success('Registro creado', 'Éxito', 3000);
            if (data.tipo === AGUA)
                dispatch(push(`/proyecto/agua/${data.proyecto}/pagos`));
            if (data.tipo === CEMENTERIO)
                dispatch(push(`/proyecto/cementerio/${data.proyecto}/pagos`));
        })
        .catch((error) => {
            let msj = 'Error en la creación';
            if (error && error.dpi) msj = error.dpi;
            NotificationManager.error(msj, 'ERROR');
        })
        .finally(() => {
            dispatch(setLoader(false));
        });
};

const editar = (id, data) => (dispatch) => {
    dispatch(setLoader(true));
    api.put(`detalle/${id}`, data)
        .then(() => {
            NotificationManager.success('Registro actualizado', 'Éxito', 3000);
            if (data.tipo === AGUA)
                dispatch(push(`proyecto/agua/${data.proyecto}/pagos`));
            if (data.tipo === CEMENTERIO)
                dispatch(push(`proyecto/cementerio/${data.proyecto}/pagos`));
        })
        .catch(() => {
            NotificationManager.error('Error en la edición', 'ERROR', 0);
        })
        .finally(() => {
            dispatch(setLoader(false));
        });
};


const searchChange = (search) => (dispatch) => {
    dispatch(setSearch(search));
    dispatch(listar());
};

const onSortChange = (ordering) => (dispatch, getStore) => {
    const sort = getStore().detalles.ordering;
    if (ordering === sort) {
        dispatch(setOrdering(`-${ordering}`));
    } else {
        dispatch(setOrdering(ordering));
    }
    dispatch(listar());
};

export const actions = {
    listar,
    leer,
    crear,
    editar,
    searchChange,
    onSortChange,
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
    [constants.ORDERING]: (state, { ordering }) => {
        return {
            ...state,
            ordering,
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
    ordering: '',
    search: '',
};

export default handleActions(reducers, initialState);
