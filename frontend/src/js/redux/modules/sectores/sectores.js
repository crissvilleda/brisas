import { handleActions } from 'redux-actions';
import { createReducer } from '../baseReducer/baseReducer';

// ------------------------------------
// Constants
// ------------------------------------

export const { reducers, initialState, actions } = createReducer(
    'sectores',
    'sector',
    'sectorForm',
    '/sectores'
);

export default handleActions(reducers, initialState);
