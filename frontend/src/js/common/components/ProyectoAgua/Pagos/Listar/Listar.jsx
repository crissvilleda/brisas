import React from 'react';
import { TableHeaderColumn } from 'react-bootstrap-table';
import Tabla from '../../../Utils/Grid';
import { standardActions } from '../../../Utils/Grid/StandardActions';
import { Link } from 'react-router-dom';
import { RenderCurrency } from '../../../Utils/renderField/renderReadField';
import { AGUA } from '../../../../../utility/constants';
import moment from "moment";

const ListarProyectos = (props) => {
    const { item_proyecto = {} } = props
    const { nombre = "", id = 0, cerrado } = item_proyecto || {}

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
                    {!cerrado &&
                        <TableHeaderColumn
                            dataField="id"
                            dataFormat={standardActions({
                                ver: `/proyecto/agua/${id}/pago`,
                                editar: `/proyecto/agua/${id}/pago`,
                            })}
                            width="110px"
                        >
                            ACCIONES
                        </TableHeaderColumn>
                    }
                    <TableHeaderColumn
                        isKey
                        dataField="tipo"
                        dataFormat={(value) => {
                            let text = "--"
                            if (value == 10) {
                                text = "Servicio Agua"
                            } else if (value == 20) {
                                text = "Servicio Cementerio"
                            }
                            return text
                        }}>

                        TIPO
                    </TableHeaderColumn>
                    <TableHeaderColumn
                        dataField="monto"
                        width="150px"
                        dataFormat={(value, row) => row.tipo_detalle == 30 ? <RenderCurrency value={value} /> : "--"}
                    >
                        MONTO NEUTRO
                    </TableHeaderColumn>
                    <TableHeaderColumn
                        dataField="monto"
                        width="150px"
                        dataFormat={(value, row) => row.tipo_detalle == 20 ? <RenderCurrency value={value} /> : "--"}
                    >
                        MONTO EGRESO
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="createdAt"
                        dataFormat={cell => moment(cell).format("DD-MMM-YYYY, h:mm a")}
                        width="180px"
                    >
                        FECHA
                    </TableHeaderColumn>
                </Tabla>
            </div>
        </React.Fragment>
    );
};

export default ListarProyectos;
