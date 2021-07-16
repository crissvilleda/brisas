import React from 'react';
import { TableHeaderColumn } from 'react-bootstrap-table';
import Tabla from '../../Utils/Grid';
import { standardActions } from '../../Utils/Grid/StandardActions';
import { Link } from 'react-router-dom';
import { RenderCurrency } from '../../Utils/renderField/renderReadField.js';
import { getMes } from '../../../../utility/utilidades';
const ListarServicios = (props) => {
    const { item } = props;
    React.useEffect(() => {
        const { id } = props.match.params;
        async function cargar() {
            await props.leer(id);
            await props.getHistorial(1, id);
        }
        cargar().then();
    }, []);
    const { id } = props.match.params;

    const renderUsuario = () => {
        if (item && item.usuario) {
            const { nombres, apellidos } = props.item.usuario;
            return `${nombres} ${apellidos}`;
        }
        return '';
    };
    return (
        <React.Fragment>
            <h3 className="py-4 text-dark">
                HISTORIAL DE PAGOS DE {renderUsuario()} -{' '}
                {item.tipo_servicio || ''}
            </h3>
            <div className="py-4 card card-small px-4">
                <div className="py-4 d-flex justify-content-end ">
                    <Link
                        className="btn btn-primary"
                        to={`/servicio/${id}/pagar`}
                    >
                        NUEVO PAGO
                    </Link>
                </div>
                <Tabla
                    data={props.historial || { results: [], count: 0 }}
                    page={props.page}
                    loading={props.loader}
                    onPageChange={(page) => props.getHistorial(page, id)}
                >
                    <TableHeaderColumn isKey dataField="id">
                        ID
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="anio">AÑO</TableHeaderColumn>
                    <TableHeaderColumn
                        dataField="mes"
                        dataFormat={(value) => getMes(value)}
                    >
                        MES
                    </TableHeaderColumn>
                    <TableHeaderColumn
                        dataField="pago"
                        dataFormat={(value) => <RenderCurrency value={value} />}
                    >
                        MONTO
                    </TableHeaderColumn>
                </Tabla>
            </div>
        </React.Fragment>
    );
};

export default ListarServicios;
