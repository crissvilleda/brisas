import React from 'react';
import Form from './Form';

const CrearEditar = (props) => {
    React.useEffect(() => {
        props.leer();
    }, []);

    const onSubmit = (data) => {
        props.actualizar(data);
    };

    return (
        <React.Fragment>
            <Form onSubmit={onSubmit} />
        </React.Fragment>
    );
};

export default CrearEditar;
