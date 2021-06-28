import React from 'react';
import Form from './Form';
import { AGUA } from '../../../../utility/constants';

const CrearEditar = (props) => {
    React.useEffect(() => {
        const { id } = props.match.params;
        if (id) props.leer(id);
    }, []);

    const onSubmit = (data) => {
        const { id } = props.match.params;
        const body = { ...data };

        body.tipo = AGUA;
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
