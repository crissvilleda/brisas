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
    PAGE: `SERVICIO_PAGE`,
    ORDERING: `SERVICIO_ORDERING`,
    SEARCH: `SERVICIO_SEARCH`,
    MESES_BLOQUEAR: `MESES_BLOQUEAR_PAGO`,
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

const setMeses = (meses) => ({
    type: constants.MESES_BLOQUEAR,
    meses,
});

// -----------------------------------
// Actions
// -----------------------------------

const listar =
    (page = 1, tipo = undefined) =>
    (dispatch, getStore) => {
        const resource = getStore().servicios;
        const params = { page };
        params.ordering = resource.ordering;
        params.search = resource.search;
        if (tipo) params.tipo = tipo;
        dispatch(setLoader(true));
        api.get('servicio', params)
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

const searchChange = (search) => (dispatch) => {
    dispatch(setSearch(search));
    dispatch(listar());
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
    listar,
    leer,
    crear,
    editar,
    eliminar,
    searchChange,
    onSortChange,
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
    [constants.MESES_BLOQUEAR]: (state, { meses }) => {
        return {
            ...state,
            meses,
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
    meses: [],
    page: 1,
    ordering: '',
    search: '',
};

export default handleActions(reducers, initialState);
