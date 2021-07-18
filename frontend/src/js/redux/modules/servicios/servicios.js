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
    DATA: `SERVICIO_AGUA_DATA`,
    DATA2: `SERVICIO_CEMENTERIO_DATA`,
    ITEM: `SERVICIO_ITEM`,
    PAGE: `SERVICIO_AGUA_PAGE`,
    PAGE2: `SERVICIO_CEMENTERIO_PAGE`,
    ORDERING: `SERVICIO_ORDERING`,
    SEARCH: `SERVICIO_AGUA_SEARCH`,
    SEARCH2: `SERVICIO_CEMENTERIO_SEARCH`,
    FILTER: `SERVICIO_AGUA_FILTER`,
    FILTER2: `SERVICIO_CEMENTERIO_FILTER`,
    HISTORIAL: `SERVICIO_HISTORIAL`,
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

const setPage2 = (page2) => ({
    type: constants.PAGE2,
    page2,
});

const setOrdering = (ordering) => ({
    type: constants.ORDERING,
    ordering,
});

const setSearch = (search) => ({
    type: constants.SEARCH,
    search,
});

const setSearch2 = (search2) => ({
    type: constants.SEARCH2,
    search2,
});

const setFilter = (filter) => ({
    type: constants.FILTER,
    filter,
});

const setFilter2 = (filter2) => ({
    type: constants.FILTER2,
    filter2,
});

const setHistorial = (historial) => ({
    type: constants.HISTORIAL,
    historial,
});

// -----------------------------------
// Actions
// -----------------------------------

const listarAgua =
    (page = 1) =>
    (dispatch, getStore) => {
        const resource = getStore().servicios;
        const params = { page };
        params.search = resource.search;
        params.solvente = resource.filter;
        params.tipo = AGUA;
        dispatch(setLoader(true));
        api.get('servicio', params)
            .then((response) => {
                dispatch(setData(response));
                dispatch(setPage(page));
            })
            .catch(() => {})
            .finally(() => {
                dispatch(setLoader(false));
            });
    };
const listarCementerio =
    (page = 1) =>
    (dispatch, getStore) => {
        const resource = getStore().servicios;
        const params = { page };
        params.search = resource.search2;
        params.solvente = resource.filter2;
        params.tipo = CEMENTERIO;
        dispatch(setLoader(true));
        api.get('servicio', params)
            .then((response) => {
                dispatch(setData2(response));
                dispatch(setPage2(page));
            })
            .catch(() => {})
            .finally(() => {
                dispatch(setLoader(false));
            });
    };

const getHistorial =
    (page = 1, servicio = undefined) =>
    (dispatch, getStore) => {
        const resource = getStore().servicios;
        const params = { page };
        params.ordering = resource.ordering;
        params.search = resource.search;
        dispatch(setLoader(true));
        api.get(`servicio/${servicio}/historial`, params)
            .then((response) => {
                dispatch(setPage(page));
                dispatch(setHistorial(response));
            })
            .catch(() => {})
            .finally(() => {
                dispatch(setLoader(false));
            });
    };

const leer = (id) => (dispatch) => {
    dispatch(setLoader(true));
    return api
        .get(`servicio/${id}`)
        .then((response) => {
            dispatch(setItem(response));
        })
        .catch(() => {})
        .finally(() => {
            dispatch(setLoader(false));
        });
};

const crear = (data) => (dispatch) => {
    dispatch(setLoader(true));
    api.post('servicio', data)
        .then(() => {
            NotificationManager.success('Registro creado', 'Éxito', 3000);
            if (data.tipo === AGUA) dispatch(push('/usuarios/agua'));
            if (data.tipo === CEMENTERIO)
                dispatch(push('/usuarios/cementerio'));
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
    api.put(`servicio/${id}`, data)
        .then(() => {
            NotificationManager.success('Registro actualizado', 'Éxito', 3000);
            if (data.tipo === AGUA) dispatch(push('/usuarios/agua'));
            if (data.tipo === CEMENTERIO)
                dispatch(push('/usuarios/cementerio'));
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
    api.eliminar(`servicio/${id}`)
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

const searchChange =
    (search, tipo = undefined) =>
    (dispatch) => {
        if (tipo === AGUA) {
            dispatch(setSearch(search));
            dispatch(listarAgua(1));
        } else if (tipo === CEMENTERIO) {
            dispatch(setSearch2(search));
            dispatch(listarCementerio(1));
        }
    };

const filterChange =
    (filter, tipo = undefined) =>
    (dispatch) => {
        if (tipo === AGUA) {
            dispatch(setFilter(filter));
            dispatch(listarAgua(1));
        } else if (tipo === CEMENTERIO) {
            dispatch(setFilter2(filter));
            dispatch(listarCementerio(1));
        }
    };

const onSortChange = (ordering) => (dispatch, getStore) => {
    const sort = getStore().servicios.ordering;
    if (ordering === sort) {
        dispatch(setOrdering(`-${ordering}`));
    } else {
        dispatch(setOrdering(ordering));
    }
    dispatch(listar());
};

export const actions = {
    listarAgua,
    listarCementerio,
    leer,
    crear,
    editar,
    eliminar,
    searchChange,
    filterChange,
    onSortChange,
    getHistorial,
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
    [constants.PAGE2]: (state, { page2 }) => {
        return {
            ...state,
            page2,
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
    [constants.SEARCH2]: (state, { search2 }) => {
        return {
            ...state,
            search2,
        };
    },
    [constants.FILTER]: (state, { filter }) => {
        return {
            ...state,
            filter,
        };
    },
    [constants.FILTER2]: (state, { filter2 }) => {
        return {
            ...state,
            filter2,
        };
    },
    [constants.HISTORIAL]: (state, { historial }) => {
        return {
            ...state,
            historial,
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
    historial: {
        results: [],
        count: 0,
    },
    item: {},
    page: 1,
    page2: 1,
    ordering: '',
    search: '',
    search2: '',
    filter: '',
    filter2: '',
};

export default handleActions(reducers, initialState);
