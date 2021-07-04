import React from 'react';
import { TableHeaderColumn } from 'react-bootstrap-table';
import Tabla from '../../Utils/Grid';
import { standardActions } from '../../Utils/Grid/StandardActions';
import { Link } from 'react-router-dom';
import { RenderCurrency } from '../../Utils/renderField/renderReadField';
import { AGUA } from '../../../../utility/constants';
import moment from "moment";

const ListarProyectos = (props) => {
    React.useEffect(() => {
        props.listar(1, AGUA);
    }, []);
    const cerrar = (id) => {
        props.cerrarProyecto(id, AGUA)
    }

    return (
        <React.Fragment>
            <h3 className="py-4 text-dark"> LISTADO DE PROYECTOS DE AGUA </h3>
            <div className="py-4 card card-small px-4">
                <div className="py-4 d-flex justify-content-end ">
                    <Link className="btn btn-primary" to="/proyecto/agua">
                        NUEVO
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
                            ver: '/proyecto/agua',
                            editar: '/proyecto/agua',
                            proyecto: '/proyecto/agua',
                        })}
                        width="110px"
                    >
                        ACCIONES
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="nombre">
                        PROYECTO
                    </TableHeaderColumn>
                    <TableHeaderColumn
                        dataField="monto_neutro"
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
                    <TableHeaderColumn
                        dataField="fecha_inicio"
                        dataFormat={cell => moment(cell).format("DD-MMM-YYYY")}
                    >
                        FECHA INICIO
                    </TableHeaderColumn>
                    <TableHeaderColumn
                        dataField="fecha_fin"
                        dataFormat={cell => cell ? moment(cell).format("DD-MMM-YYYY") : "--"}
                    >
                        FECHA FINALIZADO
                    </TableHeaderColumn>
                    <TableHeaderColumn
                        dataField="id"
                        dataFormat={(cell, arrow) => standardActions({ 'cerrar': !arrow.cerrado ? cerrar : undefined })(cell)}
                        width="110px"
                    >
                        ACCIONES
                    </TableHeaderColumn>
                </Tabla>
            </div>
        </React.Fragment>
    );
};

export default ListarProyectos;
