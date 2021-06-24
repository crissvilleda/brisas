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
            <h3 className="py-4 text-dark"> LISTADO DE SECTORES </h3>
            <div className="py-4 card card-small px-4">
                <div className="py-4 d-flex justify-content-end ">
                    <Link className="btn btn-primary" to="/sector">
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

export default ListarSectores;
