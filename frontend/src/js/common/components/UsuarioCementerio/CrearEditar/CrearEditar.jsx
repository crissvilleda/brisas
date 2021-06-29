import React from 'react';
import Form from './Form';
import { CEMENTERIO } from '../../../../utility/constants';
import swal from 'sweetalert2';

const CrearEditar = (props) => {
    React.useEffect(() => {
        const { id } = props.match.params;
        if (id) props.leer(id);
    }, []);

    const onSubmit = (data) => {
        const { id } = props.match.params;
        const body = { ...data };

        body.tipo = CEMENTERIO;
        swal.fire({
            title: 'Estas seguro de agregar a este usuario al servicio de cementerio?',
            text: 'No se podrá revertir esta acción!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'No, Cancelar',
            confirmButtonText: 'Si, Agregarlo',
        }).then((res) => {
            if (res.value) props.crear(body);
        });
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
