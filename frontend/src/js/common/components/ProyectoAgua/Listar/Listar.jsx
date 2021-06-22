import React from 'react';
import { TableHeaderColumn } from 'react-bootstrap-table';
import Tabla from '../../Utils/Grid';
import { standardActions } from '../../Utils/Grid/StandardActions';
import { Link } from 'react-router-dom';

const ListarSectores = (props) => {
    React.useEffect(() => {
        props.listar();
    }, []);

    return (
        <React.Fragment>
            <h3 className="my-4"> LISTADO DE PROYECTOS DE AGUA </h3>
            <div className="my-4 card card-small px-4">
                <div className="py-4 d-flex justify-content-end ">
                    <Link className="btn btn-primary" to="/proyecto/agua">
                        NUEVO
                    </Link>
                </div>
                <Tabla
                    data={props.data}
                    page={props.page}
                    loading={props.loader}
                    onPageChange={props.listar}
                >
                    <TableHeaderColumn
                        isKey
                        dataField="id"
                        dataFormat={standardActions({
                            ver: 'proyecto/agua',
                            editar: 'proyecto/agua',
                        })}
                    >
                        ACCIONES
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="dpi">DPI</TableHeaderColumn>
                    <TableHeaderColumn dataField="nombre">
                        NOMBRE
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="fecha_inicio">
                        FECHA INICIO
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="fecha_fin">
                        FECHA FINALIZADO
                    </TableHeaderColumn>
                </Tabla>
            </div>
        </React.Fragment>
    );
};

export default ListarSectores;
