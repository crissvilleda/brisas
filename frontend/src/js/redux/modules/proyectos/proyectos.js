import { handleActions } from 'redux-actions';
import { push } from 'react-router-redux';
import { initialize as initializeForm, destroy } from 'redux-form';
import { api } from 'api';
import { NotificationManager } from 'react-notifications';
import { AGUA, CEMENTERIO, OTROS } from '../../../utility/constants';

// ------------------------------------
// Constants
// ------------------------------------

const constants = {
    LOADER: `PROYECTO_LOADER`,
    DATA: `PROYECTO_DATA`,
    ITEM: `PROYECTO_ITEM`,
    PAGE: `PROYECTO_PAGE`,
    SEARCH: `PROYECTO_SEARCH`,
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

const listar = (page = 1, tipo = undefined) =>
    (dispatch, getStore) => {
        const resource = getStore().proyectos;
        const params = { page };
        params.search = resource.search;
        if (tipo) params.tipo = tipo;
        dispatch(setLoader(true));
        dispatch(setData({
            results: [],
            count: 0,
        }));
        api.get('proyecto', params)
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
    api.get(`proyecto/${id}`)
        .then((response) => {
            dispatch(setItem(response));
            dispatch(initializeForm('proyectoForm', response));
        })
        .catch(() => { })
        .finally(() => {
            dispatch(setLoader(false));
        });
};

const crear = (data) => (dispatch) => {
    dispatch(setLoader(true));
    api.post('proyecto', data)
        .then(() => {
            NotificationManager.success('Registro creado', 'Éxito', 3000);
            if (data.tipo === AGUA)
                dispatch(push('/proyectos/agua'));
            if (data.tipo === CEMENTERIO)
                dispatch(push('/proyectos/cementerio'));
            if (data.tipo === OTROS)
                dispatch(push('/proyectos/otros'));
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
    api.put(`proyecto/${id}`, data)
        .then(() => {
            NotificationManager.success('Registro actualizado', 'Éxito', 3000);
            if (data.tipo === AGUA)
                dispatch(push('/proyectos/agua'));
            if (data.tipo === CEMENTERIO)
                dispatch(push('/proyectos/cementerio'));
            if (data.tipo === OTROS)
                dispatch(push('/proyectos/otros'));
        })
        .catch(() => {
            NotificationManager.error('Error en la edición', 'ERROR', 0);
        })
        .finally(() => {
            dispatch(setLoader(false));
        });
};

const cerrarProyecto = (id, tipo = undefined) => (dispatch) => {
    dispatch(setLoader(true));
    api.put(`proyecto/${id}/cerrar`)
        .then(() => {
            NotificationManager.success('Proyecto cerrado', 'Éxito', 3000);
            dispatch(listar(1, tipo));
        })
        .catch(() => {
            NotificationManager.error('Error al cerrar proyecto', 'ERROR', 3000);
        })
        .finally(() => {
            dispatch(setLoader(false));
        });
};

const searchChange = (search) => (dispatch) => {
    dispatch(setSearch(search));
    dispatch(listar());
};

const destroyForm = () => (dispatch) => {
    dispatch(setItem({}));
    dispatch(destroy('proyectoForm'));
};


export const actions = {
    listar,
    leer,
    crear,
    editar,
    searchChange,
    cerrarProyecto,
    destroyForm,
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
