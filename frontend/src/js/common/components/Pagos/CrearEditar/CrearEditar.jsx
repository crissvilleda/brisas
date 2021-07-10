import React from 'react';
import Form from './Form';
import LoadMask from '../../Utils/LoadMask/LoadMask';
import moment from 'moment';

const CrearEditar = (props) => {
    React.useEffect(() => {
        const { id } = props.match.params;
        if (id) {
            props.leer(id);
            props.obtenerMeses(id, moment().year());
        } else props.history.push('/404');
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
    const onAnioChange = (e) => {
        const { id } = props.match.params;
        props.obtenerMeses(id, e.value);
    };

    return (
        <React.Fragment>
            <div className="py-4">
                <h3 className="text-dark">{renderUsuario()}</h3>
                <LoadMask loading={props.loader} blur>
                    <div className="d-flex mb-4 card card-small">
                        <Form
                            onSubmit={onSubmit}
                            ver={!!props.location.pathname.includes('ver')}
                            item={props.item}
                            meses={props.meses}
                            onAnioChange={onAnioChange}
                        />
                    </div>
                </LoadMask>
            </div>
        </React.Fragment>
    );
};

export default CrearEditar;
