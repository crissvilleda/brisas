import React from 'react';
import { TableHeaderColumn } from 'react-bootstrap-table';
import Tabla from '../../Utils/Grid';
import { standardActions } from '../../Utils/Grid/StandardActions';
import { Link } from 'react-router-dom';
import { AGUA } from '../../../../utility/constants';

const ListarSectores = (props) => {
    React.useEffect(() => {
        props.listar(1, AGUA);
    }, []);
    console.log(props.data);
    return (
        <React.Fragment>
            <h3 className="py-4 text-dark">USUARIOS DEL SERVICIO DE AGUA </h3>
            <div className="py-4 card card-small px-4">
                <div className="py-4 d-flex justify-content-end ">
                    <Link className="btn btn-primary" to="/servicio/agua">
                        REGISTRAR NUEVO USUARIO
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
                            ver: '/servicio',
                        })}
                    >
                        ACCIONES
                    </TableHeaderColumn>
                    <TableHeaderColumn
                        dataField="usuario"
                        dataFormat={(value) => value.dpi}
                    >
                        DPI
                    </TableHeaderColumn>
                    <TableHeaderColumn
                        dataField="usuario"
                        dataFormat={(value) => value.nombres}
                    >
                        NOMBRES
                    </TableHeaderColumn>
                    <TableHeaderColumn
                        dataField="usuario"
                        dataFormat={(value) => value.apellidos}
                    >
                        APELLIDOS
                    </TableHeaderColumn>
                    <TableHeaderColumn
                        dataField="usuario"
                        dataFormat={(value) => value.telefono}
                    >
                        TELÉFONO
                    </TableHeaderColumn>
                    <TableHeaderColumn
                        dataField="solvente"
                        dataFormat={(value) => (value ? 'SI' : 'NO')}
                    >
                        SOLVENTE
                    </TableHeaderColumn>
                </Tabla>
            </div>
        </React.Fragment>
    );
};

export default ListarSectores;
