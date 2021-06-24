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
            <h3 className="py-4 text-dark"> LISTADO DE USUARIOS </h3>
            <div className="py-4 card card-small px-4">
                <div className="py-4 d-flex justify-content-end ">
                    <Link className="btn btn-primary" to="/usuario">
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
                            ver: '/usuario',
                            editar: '/usuario',
                        })}
                    >
                        ACCIONES
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="dpi">DPI</TableHeaderColumn>
                    <TableHeaderColumn dataField="nombres">
                        NOMBRES
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="apellidos">
                        APELLIDOS
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="telefono">
                        TELÉFONO
                    </TableHeaderColumn>
                </Tabla>
            </div>
        </React.Fragment>
    );
};

export default ListarSectores;
