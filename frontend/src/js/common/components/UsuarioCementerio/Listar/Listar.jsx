import React from 'react';
import { TableHeaderColumn } from 'react-bootstrap-table';
import Tabla from '../../Utils/Grid';
import Select from 'react-select';
import { standardActions } from '../../Utils/Grid/StandardActions';
import { Link } from 'react-router-dom';
import { CEMENTERIO } from '../../../../utility/constants';

const options = [
    { value: 1, label: 'Solvente' },
    { value: 2, label: 'Insolvente' },
];

const ListarUsuariosCementerio = (props) => {
    React.useEffect(() => {
        props.listarCementerio(1);
    }, []);

    const buscar = (e) => {
        props.searchChange(e.target.value, CEMENTERIO);
    };

    const filtrar = (e) => {
        const texto = e && e.value ? e.value : '';
        props.filterChange(texto, CEMENTERIO);
    };

    return (
        <React.Fragment>
            <h3 className="py-4 text-dark">
                USUARIOS DEL SERVICIO DE CEMENTERIO
            </h3>
            <div className="py-4 card card-small px-4">
                <div className="py-4 d-flex justify-content-between">
                    <input
                        type="text"
                        className="form-control col-4"
                        onChange={buscar}
                        placeholder="Buscar..."
                    />
                    <Select
                        options={options}
                        isClearable={true}
                        placeholder="Filtrar por ....."
                        onChange={filtrar}
                        className="col-4"
                    />
                    <Link className="btn btn-primary" to="/servicio/agua">
                        REGISTRAR NUEVO USUARIO
                    </Link>
                </div>
                <Tabla
                    data={props.data2}
                    page={props.page2}
                    loading={props.loader}
                    onPageChange={(page) => props.listarCementerio(page)}
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

export default ListarUsuariosCementerio;
