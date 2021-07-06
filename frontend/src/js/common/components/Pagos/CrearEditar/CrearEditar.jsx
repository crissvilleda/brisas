import React from 'react';
import Form from './Form';
import LoadMask from '../../Utils/LoadMask/LoadMask';

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

    const renderUsuario = () => {
        if (props.item && props.item.usuario) {
            const { nombres, apellidos } = props.item.usuario;
            return `${nombres} ${apellidos}`;
        }
        return '';
    };

    return (
        <React.Fragment>
            <div className="py-4">
                <h3 className="text-dark">{renderUsuario()}</h3>
                <LoadMask loading={props.loader} blur>
                    <Form
                        onSubmit={onSubmit}
                        ver={!!props.location.pathname.includes('ver')}
                        item={props.item}
                    />
                </LoadMask>
            </div>
        </React.Fragment>
    );
};

export default CrearEditar;
