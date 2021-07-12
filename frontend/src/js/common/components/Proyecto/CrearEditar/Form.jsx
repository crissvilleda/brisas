import React from 'react';
import { Field, reduxForm } from 'redux-form';
import {
    renderField,
    AsyncSelectField,
    renderTextArea,
    renderCurrency,
    renderDatePicker,
    renderDayPicker,
} from '../../Utils/renderField/renderField';
import { Link } from 'react-router-dom';
import { api } from 'api';

const validate = (values) => {
    const errors = {};
    if (!values.nombre) errors.nombre = 'Campo requerido';
    if (!values.descripcion) errors.descripcion = 'Campo requerido';
    if (!values.fecha_inicio) errors.fecha_inicio = 'Campo requerido';
    if (!values.fecha_fin) errors.fecha_fin = 'Campo requerido';
    return errors;
};

const CrearEditar = (props) => {
    const { handleSubmit, ver, tipo_proyecto } = props;
    return (
        <form action="" onSubmit={handleSubmit} className="py-4">
            <h3 className="text-dark">PROYECTO {tipo_proyecto == 10 ? "AGUA" : tipo_proyecto == 20 ? "CEMENTERIO" : "OTROS"}</h3>
            <div className="mb-4 card card-small">
                <div className="p-0 pt-3 d-flex flex-column flex-md-row col-5 m-auto">
                    <div className="d-flex flex-column flex-1 mx-3">
                        <label htmlFor="nombres">Nombre</label>
                        <Field
                            name="nombre"
                            placeholder="Nombre del Proyecto"
                            component={renderField}
                            type="text"
                            className="form-control"
                            disabled={ver}
                        />
                    </div>
                </div>
                <div className="p-0 pt-3 d-flex flex-column flex-md-row col-5 m-auto">
                    <div className="d-flex flex-column flex-1 mx-3">
                        <label htmlFor="descripcion">Descripción</label>
                        <Field
                            name="descripcion"
                            placeholder="Descripción  del proyecto"
                            component={renderTextArea}
                            rows={4}
                            type="text"
                            className="form-control"
                            disabled={ver}
                        />
                    </div>
                </div>
                <div className="p-0 pt-3 d-flex flex-column flex-md-row col-5 m-auto">
                    <div className="d-flex flex-column flex-1 mx-3">
                        <label htmlFor="fecha_inicio">Fecha Inicio</label>
                        <Field
                            name="fecha_inicio"
                            placeholder="Fecha inicio del proyecto"
                            component={renderDatePicker}
                            type="text"
                            className="form-control"
                            disabled={ver}
                        />
                    </div>
                </div>
                <div className="p-0 pt-3 d-flex flex-column flex-md-row col-5 m-auto">
                    <div className="d-flex flex-column flex-1 mx-3">
                        <label htmlFor="fecha_fin">Fecha Fin</label>
                        <Field
                            name="fecha_fin"
                            placeholder="Fecha final del proyecto"
                            component={renderDatePicker}
                            type="text"
                            className="form-control flex-1"
                            disabled={ver}
                        />
                    </div>
                </div>
                <div className="d-flex py-4">
                    <div className="col-5 m-auto d-flex justify-content-center">
                        <button
                            type="submit"
                            disabled={ver}
                            className="btn btn-primary mr-2"
                        >
                            Guardar
                        </button>
                        <Link
                            className="btn btn-secondary ml-2"
                            to={`/proyectos/${tipo_proyecto == 10 ? "agua" : tipo_proyecto == 20 ? "cementerio" : "otros"}`}
                        >
                            Cancelar
                        </Link>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default reduxForm({
    form: 'proyectoForm', // a unique identifier for this form
    validate,
})(CrearEditar);
