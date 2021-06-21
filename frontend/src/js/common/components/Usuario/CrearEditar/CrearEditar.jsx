import React from 'react';
import Form from './Form';

const CrearEditar = (props) => {
    React.useEffect(() => {
        const { id } = props.match.params;
        if (id) props.leer(id);
    }, []);

    const onSubmit = (data) => {
        const { id } = props.match.params;
        if (id) props.editar(id, data);
        else props.crear(data);
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
