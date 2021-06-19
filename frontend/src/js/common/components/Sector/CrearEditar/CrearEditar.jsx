import React from 'react';
import Form from './Form';

const CrearEditar = (props) => {
    React.useEffect(() => {}, []);

    const onSubmit = (data) => {
        props.crear(data);
    };

    return (
        <React.Fragment>
            <Form onSubmit={onSubmit} />
        </React.Fragment>
    );
};

export default CrearEditar;
