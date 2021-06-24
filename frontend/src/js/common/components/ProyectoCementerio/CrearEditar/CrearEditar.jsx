import React from 'react';
import Form from './Form';
import moment from 'moment';
import { CEMENTERIO } from '../../../../utility/constants';

const CrearEditar = (props) => {
    React.useEffect(() => {
        const { id } = props.match.params;
        if (id) props.leer(id);
    }, []);

    const onSubmit = (data) => {
        const { id } = props.match.params;
        const body = { ...data };

        body.tipo = CEMENTERIO;
        body.fecha_fin = moment(data.fecha_fin).format('YYYY-MM-DD');
        body.fecha_inicio = moment(data.fecha_inicio).format('YYYY-MM-DD');

        if (id) props.editar(id, body);
        else props.crear(body);
    };

    return (
        <React.Fragment>
            <Form
                onSubmit={onSubmit}
                ver={props.location.pathname.includes('ver')}
            />
        </React.Fragment>
    );
};

export default CrearEditar;
