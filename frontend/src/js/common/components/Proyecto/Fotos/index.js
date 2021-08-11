import { connect } from 'react-redux';
import { actions } from '../../../../redux/modules/proyectos/proyectos';
import Galeria from './Galeria';

const ms2p = (state) => {
    return {
        ...state.proyectos,
    };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(Galeria);
