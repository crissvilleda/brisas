import { push } from 'react-router-redux';
import { handleActions } from 'redux-actions';
import { initialize as initializeForm } from 'redux-form';
import { api } from 'api';
import { NotificationManager } from 'react-notifications';
import dayjs from 'dayjs';

// ------------------------------------
// Constants
// ------------------------------------

const constants = {
    LOADER: `$FALLECIDOS_LOADER`,
    DATA: `$FALLECIDOS_DATA`,
    ITEM: `$FALLECIDOS_ITEM`,
    PAGE: `$FALLECIDOS_PAGE`,
    ORDERING: `$FALLECIDOS_ORDERING`,
    SEARCH: `$FALLECIDOS_SEARCH`,
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
    (page = 1) =>
    (dispatch, getStore) => {
        const resource = getStore()['fallecidos'];
        const params = { page };
        params.ordering = resource.ordering;
        params.search = resource.search;
        dispatch(setLoader(true));
        api.get('fallecido', params)
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
    api.get(`fallecido/${id}`)
        .then((response) => {
            const data = { ...response };
            dispatch(setItem(data));
            dispatch(initializeForm('fallecidoForm', data));
        })
        .catch(() => {})
        .finally(() => {
            dispatch(setLoader(false));
        });
};

const crear = (data) => (dispatch) => {
    dispatch(setLoader(true));
    api.post('fallecido', data)
        .then(() => {
            NotificationManager.success('Registro creado', 'Éxito', 3000);
            dispatch(push('/fallecidos'));
        })
        .catch(() => {
            NotificationManager.error('Error en la creación', 'ERROR');
        })
        .finally(() => {
            dispatch(setLoader(false));
        });
};

const editar = (id, data) => (dispatch) => {
    dispatch(setLoader(true));
    api.put(`fallecido/${id}`, data)
        .then(() => {
            NotificationManager.success('Registro actualizado', 'Éxito', 3000);
            dispatch(push('/fallecidos'));
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
    api.eliminar(`fallecido/${id}`)
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
    const sort = getStore()['fallecidos'].ordering;
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
