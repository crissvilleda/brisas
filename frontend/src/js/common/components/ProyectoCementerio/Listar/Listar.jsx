import React from 'react';
import { TableHeaderColumn } from 'react-bootstrap-table';
import Tabla from '../../Utils/Grid';
import { standardActions } from '../../Utils/Grid/StandardActions';
import { Link } from 'react-router-dom';
import { RenderCurrency } from '../../Utils/renderField/renderReadField';
import { AGUA } from '../../../../utility/constants';

const ListarSectores = (props) => {
    React.useEffect(() => {
        props.listar(1, AGUA);
    }, []);

    return (
        <React.Fragment>
            <h3 className="py-4 text-dark">
                LISTADO DE PROYECTOS DE CEMENTERIO
            </h3>
            <div className="py-4 card card-small px-4">
                <div className="py-4 d-flex justify-content-end ">
                    <Link className="btn btn-primary" to="/proyecto/cementerio">
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
                            ver: '/proyecto/cementerio',
                            editar: '/proyecto/cementerio',
                        })}
                    >
                        ACCIONES
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="nombre">
                        PROYECTO
                    </TableHeaderColumn>
                    <TableHeaderColumn
                        dataField="costo"
                        dataFormat={(value) => <RenderCurrency value={value} />}
                    >
                        Monto
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
