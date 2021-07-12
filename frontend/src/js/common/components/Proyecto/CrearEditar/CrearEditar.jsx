import React from 'react';
import Form from './Form';
import moment from 'moment';
import { AGUA, CEMENTERIO, OTROS } from '../../../../utility/constants';
import { Redirect } from 'react-router-dom';

const CrearEditar = (props) => {
    const { textTipo } = props.match.params;
    if (!['agua', 'cementerio'].includes(textTipo)) {
        return <Redirect to="/" />;
    }

    const TIPO_PROYECTO = textTipo == 'agua' ? AGUA : textTipo == 'cementerio' ? CEMENTERIO : OTROS


    React.useEffect(() => {
        props.destroyForm()
        const { id } = props.match.params;
        if (id) props.leer(id);
    }, []);

    const onSubmit = (data) => {
        const { id } = props.match.params;
        const body = { ...data };

        body.tipo = TIPO_PROYECTO;
        body.fecha_fin = moment(data.fecha_fin).format('YYYY-MM-DD');
        body.fecha_inicio = moment(data.fecha_inicio).format('YYYY-MM-DD');

        if (id) {
            props.editar(id, body);
        }
        else {
            props.crear(body);
        }
    };

    return (
        <React.Fragment>
            <Form
                onSubmit={onSubmit}
                tipo_proyecto={TIPO_PROYECTO}
                ver={props.location.pathname.includes('ver')}
            />
        </React.Fragment>
    );
};

export default CrearEditar;
