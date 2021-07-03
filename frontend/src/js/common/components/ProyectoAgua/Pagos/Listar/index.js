import { connect } from 'react-redux';
import { actions as actions_proyectos } from '../../../../../redux/modules/proyectos/proyectos';
import { actions } from '../../../../../redux/modules/detalles/detalles';
import Listar from './Listar';

const ms2p = (state) => {
    return {
        ...state.detalles,
        item_proyecto: state.proyectos.item,
    };
};

const md2p = { ...actions, leer_proyecto: actions_proyectos.leer };

export default connect(ms2p, md2p)(Listar);
