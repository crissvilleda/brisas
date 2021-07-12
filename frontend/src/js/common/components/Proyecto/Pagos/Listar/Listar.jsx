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
    const { nombre = "", id = 0, cerrado, tipo = 30 } = item_proyecto || {}

    React.useEffect(() => {
        const { idProyecto } = props.match.params;
        if (idProyecto) props.leer_proyecto(idProyecto);
        props.listar(1, idProyecto);
    }, []);

    const URL = `/proyecto/${tipo == 10 ? "agua" : tipo == 20 ? "cementerio" : "otros"}/${id}/pago`
    return (
        <React.Fragment>
            <h3 className="pt-4 pb-0 text-dark">PROYECTO DE {tipo == 10 ? "AGUA" : tipo == 20 ? "CEMENTERIO" : "OTROS"}:</h3>
            <h3 className="pt-0 pb-4 text-dark">{nombre} </h3>
            <div className="py-4 card card-small px-4">
                <div className="py-4 d-flex justify-content-end ">
                    {!cerrado &&
                        <Link className="btn btn-primary" to={URL}>
                            Nuevo
                        </Link>
                    }
                </div>
                <Tabla
                    data={props.data}
                    page={props.page}
                    loading={props.loader}
                    onPageChange={(page) => props.listar(page, id)}
                >
                    {!cerrado &&
                        <TableHeaderColumn
                            dataField="id"
                            dataFormat={standardActions({
                                ver: URL,
                                editar: URL,
                            })}
                            width="110px"
                        >
                            ACCIONES
                        </TableHeaderColumn>
                    }
                    <TableHeaderColumn
                        isKey
                        dataField="tipo"
                        width="120px"
                        dataFormat={(value) => {
                            let text = "--"
                            if (value == 10) {
                                text = "Servicio Agua"
                            } else if (value == 20) {
                                text = "Servicio Cementerio"
                            } else if (value == 30) {
                                text = "Servicio OTROS"
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
