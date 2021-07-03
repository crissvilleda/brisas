import React from 'react';
import Form from './Form';

const CrearEditar = (props) => {
    React.useEffect(() => {
        const { id } = props.match.params;
        if (id) props.leer(id);
        else props.history.push('/404');
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
                ver={!!props.location.pathname.includes('ver')}
                item={props.item}
            />
        </React.Fragment>
    );
};

export default CrearEditar;
