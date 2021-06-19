import { connect } from 'react-redux';
import { actions } from '../../../../redux/modules/sectores/sectores';
import CrearEditar from './CrearEditar';

const ms2p = (state) => {
    return {
        ...state.sectores,
    };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(CrearEditar);
