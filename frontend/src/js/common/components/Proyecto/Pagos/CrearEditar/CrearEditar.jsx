import React from 'react';
import Form from './Form';
import moment from 'moment';
import { AGUA } from '../../../../../utility/constants';

const CrearEditar = (props) => {
    React.useEffect(() => {
        const { idProyecto, id } = props.match.params;
        if (idProyecto) props.leer_proyecto(idProyecto);
        if (id) props.leer(id);
    }, []);

    const onSubmit = (data) => {
        const { id, idProyecto } = props.match.params;
        const body = { ...data };
        console.log(body);
        if (id) {
            props.editar(id, body);
        } else {
            body.proyecto = idProyecto;
            props.crear(body);
        }
    };

    return (
        <React.Fragment>
            <Form
                onSubmit={onSubmit}
                ver={props.location.pathname.includes('ver')}
                item_proyecto={props.item_proyecto}
            />
        </React.Fragment>
    );
};

export default CrearEditar;
