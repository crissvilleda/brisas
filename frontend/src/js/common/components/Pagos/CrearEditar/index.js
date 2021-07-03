import { connect } from 'react-redux';
import { actions } from '../../../../redux/modules/pagos/pagos';
import CrearEditar from './CrearEditar';

const ms2p = (state) => {
    return {
        ...state.pagos,
    };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(CrearEditar);
