import { connect } from 'react-redux';
import { actions } from '../../../../redux/modules/servicios/servicios';
import CrearEditar from './CrearEditar';

const ms2p = (state) => {
    return {
        ...state.servicios,
    };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(CrearEditar);
