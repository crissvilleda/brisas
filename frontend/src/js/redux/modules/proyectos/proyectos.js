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
    LOADER: `PROYECTO_LOADER`,
    DATA: `PROYECTO_AGUA_DATA`,
    DATA2: `PROYECTO_CEMENTERIO_DATA`,
    ITEM: `PROYECTO_ITEM`,
    PAGE: `PROYECTO_PAGE`,
    ORDERING: `PROYECTO_ORDERING`,
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
const setData2 = (data2) => ({
    type: constants.DATA2,
    data2,
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
    (page = 1, tipo = undefined) =>
    (dispatch, getStore) => {
        const resource = getStore().proyectos;
        const params = { page };
        params.ordering = resource.ordering;
        params.search = resource.search;
        if (tipo) params.tipo = tipo;
        dispatch(setLoader(true));
        api.get('proyecto', params)
            .then((response) => {
                if (tipo === AGUA) dispatch(setData(response));
                if (tipo === CEMENTERIO) dispatch(setData2(response));
                dispatch(setPage(page));
            })
            .catch(() => {})
            .finally(() => {
                dispatch(setLoader(false));
            });
    };

const leer = (id) => (dispatch) => {
    dispatch(setLoader(true));
    api.get(`proyecto/${id}`)
        .then((response) => {
            dispatch(setItem(response));
            dispatch(initializeForm('proyectoForm', response));
        })
        .catch(() => {})
        .finally(() => {
            dispatch(setLoader(false));
        });
};

const crear = (data) => (dispatch) => {
    dispatch(setLoader(true));
    api.post('proyecto', data)
        .then(() => {
            NotificationManager.success('Registro creado', 'Éxito', 3000);
            if (data.tipo === AGUA) dispatch(push('/proyectos/agua'));
            if (data.tipo === CEMENTERIO)
                dispatch(push('/proyectos/cementerio'));
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
            if (data.tipo === AGUA) dispatch(push('/proyectos/agua'));
            if (data.tipo === CEMENTERIO)
                dispatch(push('/proyectos/cementerio'));
        })
        .catch(() => {
            NotificationManager.error('Error en la edición', 'ERROR', 0);
        })
        .finally(() => {
            dispatch(setLoader(false));
        });
};

const eliminar = (id) => (dispatch) => {
    dispatch(setLoader(true));
    api.eliminar(`proyecto/${id}`)
        .then(() => {
            dispatch(listar());
            NotificationManager.success('Registro eliminado', 'Éxito', 3000);
        })
        .catch(() => {
            NotificationManager.success(
                'Error en la transacción',
                'Éxito',
                3000
            );
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
    const sort = getStore().proyectos.ordering;
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
    eliminar,
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
    [constants.DATA2]: (state, { data2 }) => {
        return {
            ...state,
            data2,
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
    data2: {
        results: [],
        count: 0,
    },
    item: {},
    page: 1,
    ordering: '',
    search: '',
};

export default handleActions(reducers, initialState);
