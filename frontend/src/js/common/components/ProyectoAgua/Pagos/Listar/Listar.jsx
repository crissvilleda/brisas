import React from 'react';
import { TableHeaderColumn } from 'react-bootstrap-table';
import Tabla from '../../../Utils/Grid';
import { standardActions } from '../../../Utils/Grid/StandardActions';
import { Link } from 'react-router-dom';
import { RenderCurrency } from '../../../Utils/renderField/renderReadField';
import { AGUA } from '../../../../../utility/constants';

const ListarProyectos = (props) => {
    const { item_proyecto = {} } = props
    const { nombre = "", id = 0 } = item_proyecto || {}

    React.useEffect(() => {
        const { idProyecto } = props.match.params;
        if (idProyecto) props.leer_proyecto(idProyecto);
        props.listar(1, idProyecto);
    }, []);

    return (
        <React.Fragment>
            <h3 className="py-4 text-dark"> ROYECTOS {nombre} </h3>
            <div className="py-4 card card-small px-4">
                <div className="py-4 d-flex justify-content-end ">
                    <Link className="btn btn-primary" to="/proyecto/agua/1/pago">
                        Nuevo
                    </Link>
                </div>
                <Tabla
                    data={props.data}
                    page={props.page}
                    loading={props.loader}
                    onPageChange={(page) => props.listar(page, AGUA)}
                >
                    <TableHeaderColumn
                        isKey
                        dataField="id"
                        dataFormat={standardActions({
                            ver: `/proyecto/agua/${id}/pago`,
                            editar: `/proyecto/agua/${id}/pago`,
                        })}
                    >
                        ACCIONES
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="tipo">
                        TIPO
                    </TableHeaderColumn>
                    <TableHeaderColumn
                        dataField="monto"
                        dataFormat={(value) => <RenderCurrency value={value} />}
                    >
                        MONTO NEUTRO
                    </TableHeaderColumn>
                    <TableHeaderColumn
                        dataField="monto_egreso"
                        dataFormat={(value) => <RenderCurrency value={value} />}
                    >
                        MONTO EGRESO
                    </TableHeaderColumn>
                    <TableHeaderColumn
                        dataField="total_costo"
                        dataFormat={(value) => <RenderCurrency value={value} />}
                    >
                        TOTAL COSTO
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="createdAt">
                        FECHA
                    </TableHeaderColumn>
                </Tabla>
            </div>
        </React.Fragment>
    );
};

export default ListarProyectos;
