import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import './acciones.css';
import Swal from 'sweetalert2';

class Acciones extends Component {
    constructor(props) {
        super(props);
    }

    eliminar = (id) => {
        return () => {
            Swal.fire({
                title: '¿Eliminar?',
                text: '¡No podrá revertir esta acción!',
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: '¡Sí, eliminar!',
                cancelButtonText: 'No, cancelar',
                reverseButtons: true,
            }).then((result) => {
                if (result.value) {
                    this.props.eliminar(id);
                }
            });
        };
    };
    cerrar = (id) => {
        return () => {
            Swal.fire({
                title: 'Cerrar el proyecto?',
                text: '¡No podrá revertir esta acción!',
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: '¡Sí, Cerrar!',
                cancelButtonText: 'No, Cerrar',
                reverseButtons: true,
            }).then((result) => {
                if (result.value) {
                    this.props.cerrar(id);
                }
            });
        };
    };

    render() {
        const { id, ver, editar, eliminar, cerrar, proyecto } = this.props;

        return (
            <div className="d-flex justify-content-center">
                {ver !== undefined && (
                    <Link to={`${ver}/${id}/ver`} className="px-2">
                        <i className="material-icons">remove_red_eye</i>
                    </Link>
                )}
                {editar !== undefined && (
                    <Link
                        className="text-warning"
                        to={`${editar}/${id}/editar`}
                    >
                        <i className="material-icons">edit</i>
                    </Link>
                )}
                {eliminar !== undefined && (
                    <a
                        className="px-2"
                        style={{ cursor: 'pointer', color: '#c4183c' }}
                        onClick={this.eliminar(id)}
                    >
                        <i className="material-icons">delete</i>
                    </a>
                )}
                {proyecto !== undefined && (
                    <Link to={`${ver}/${id}/pagos`} className="px-2">
                        <i className="material-icons">remove_red_eye</i>
                    </Link>
                )}
                {cerrar !== undefined && (
                    <button className="px-2"
                        style={{ cursor: 'pointer', color: '#c4183c' }}
                        onClick={this.cerrar(id)} >CERRAR</button>
                )}
            </div>
        );
    }
}
Acciones.propTypes = {};

export function standardActions(acciones) {
    return (cell, row) => {
        return <Acciones id={cell} {...acciones} />;
    };
}
