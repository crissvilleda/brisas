import React from 'react';
import { TableHeaderColumn } from 'react-bootstrap-table';
import Tabla from '../../Utils/Grid';
import { standardActions } from '../../Utils/Grid/StandardActions';
import { Link } from 'react-router-dom';

const ListarFallecidos = (props) => {
    React.useEffect(() => {
        props.searchChange('');
    }, []);

    const buscar = (e) => {
        props.searchChange(e.target.value);
    };

    return (
        <React.Fragment>
            <h3 className=" m-0 pt-4 text-dark" style={{ fontSize: '1.5rem' }}>
                LISTADO DE PERSONAS FALLECIDAS
            </h3>
            <hr
                className="bg-white m-0"
                style={{ height: '0.3rem', borderRadius: '0.25rem' }}
            />
            <br />
            <div className="py-4 card card-small px-4">
                <div className="py-4 d-flex justify-content-between">
                    <input
                        type="text"
                        className="form-control col-4"
                        onChange={buscar}
                        placeholder="Buscar..."
                    />
                    <Link className="btn btn-primary" to="/fallecido">
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
                            editar: 'fallecido',
                        })}
                    >
                        ACCIONES
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="id">ID</TableHeaderColumn>
                    <TableHeaderColumn dataField="nombres">
                        NOMBRE
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="apellidos">
                        APELLIDOS
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="dpi">DPI</TableHeaderColumn>
                    <TableHeaderColumn dataField="fecha">
                        FECHA FALLECIMIENTO
                    </TableHeaderColumn>
                </Tabla>
            </div>
        </React.Fragment>
    );
};

export default ListarFallecidos;
