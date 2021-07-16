import React from 'react';
import Form from './Form';
import LoadMask from '../../Utils/LoadMask/LoadMask';
import moment from 'moment';
import swal from 'sweetalert2';
import { NotificationManager } from 'react-notifications';

const CrearEditar = (props) => {
    const [selectMeses, setSelectMeses] = React.useState(0);
    const [totalPagar, setTotalPagar] = React.useState(0);
    React.useEffect(() => {
        const { id } = props.match.params;
        if (id) {
            props.leer(id);
            props.obtenerMeses(id, moment().year());
        } else props.history.push('/404');
    }, []);

    const onSubmit = (data) => {
        const { id } = props.match.params;

        if (data === 0) {
            NotificationManager.error(
                'Seleccione al menos un mes para poder realizar en pago',
                'Error',
                5000
            );
        } else {
            swal.fire({
                title: 'Estas seguro de realizar el pago?',
                text: 'No se podrá revertir esta acción!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                cancelButtonText: 'No, Cancelar',
                confirmButtonText: 'Si, Realizar',
            }).then((res) => {
                if (res.value) {
                    props.realizarPago(id, { meses: data }).then(() => {
                        setSelectMeses(0);
                        setTotalPagar(0);
                    });
                }
            });
        }
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
                            cuota={props.cuota}
                            onAnioChange={onAnioChange}
                            setSelectMeses={setSelectMeses}
                            selectMeses={selectMeses}
                            setTotalPagar={setTotalPagar}
                            totalPagar={totalPagar}
                        />
                    </div>
                </LoadMask>
            </div>
        </React.Fragment>
    );
};

export default CrearEditar;
