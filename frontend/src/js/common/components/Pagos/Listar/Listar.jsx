import React from 'react';
import { TableHeaderColumn } from 'react-bootstrap-table';
import Tabla from '../../Utils/Grid';
import { standardActions } from '../../Utils/Grid/StandardActions';
import { Link } from 'react-router-dom';

const ListarServicios = (props) => {
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
        if (props.item && props.item.usuario) {
            const { nombres, apellidos } = props.item.usuario;
            return `${nombres} ${apellidos}`;
        }
        return '';
    };
    return (
        <React.Fragment>
            <h3 className="py-4 text-dark">
                HISTORIAL DE PAGOS DE {renderUsuario()}
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
                    onPageChange={(page) => props.historial(page, id)}
                >
                    <TableHeaderColumn
                        isKey
                        dataField="id"
                        dataFormat={standardActions({
                            ver: 'sector',
                            editar: 'sector',
                        })}
                    >
                        ACCIONES
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="id">ID</TableHeaderColumn>
                    <TableHeaderColumn dataField="nombre">
                        NOMBRE
                    </TableHeaderColumn>
                </Tabla>
            </div>
        </React.Fragment>
    );
};

export default ListarServicios;
