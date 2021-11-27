import React from 'react';
import { Field, reduxForm } from 'redux-form';
import {
    renderField,
    renderDatePicker,
} from '../../Utils/renderField/renderField';
import { Link } from 'react-router-dom';

const validate = (values) => {
    const errors = {};
    if (!values.nombres) errors.nombres = 'Campo requerido';
    if (!values.apellidos) errors.apellidos = 'Campo requerido';
    if (!values.dpi) errors.dpi = 'Campo requerido';
    if (!values.fecha) errors.fecha = 'Campo requerido';
    if (values.dpi && values.dpi.length !== 13)
        errors.dpi = 'EL numero de pdi es invalido';
    return errors;
};

const CrearEditar = (props) => {
    const { handleSubmit, ver } = props;
    return (
        <form action="" onSubmit={handleSubmit} className="py-4">
            <h3 className=" m-0 text-dark" style={{ fontSize: '1.5rem' }}>
                FALLECIDO
            </h3>
            <hr
                className="bg-white m-0"
                style={{ height: '0.3rem', borderRadius: '0.25rem' }}
            />
            <br />
            <div className="mb-4 card card-small">
                <div className="p-0 pt-3 d-flex flex-column flex-md-row col-6 m-auto">
                    <div className="d-flex flex-column flex-1 mx-3">
                        <label htmlFor="nombres">Nombres</label>
                        <Field
                            name="nombres"
                            placeholder="Nombres"
                            component={renderField}
                            type="text"
                            className="form-control"
                            disabled={ver}
                        />
                    </div>
                </div>
                <div className="p-0 pt-3 d-flex flex-column flex-md-row col-6 m-auto">
                    <div className="d-flex flex-column flex-1 mx-3">
                        <label htmlFor="apellidos">Apellidos</label>
                        <Field
                            name="apellidos"
                            placeholder="Apellidos"
                            component={renderField}
                            type="text"
                            className="form-control"
                            disabled={ver}
                        />
                    </div>
                </div>
                <div className="p-0 pt-3 d-flex flex-column flex-md-row col-6 m-auto">
                    <div className="d-flex flex-column flex-1 mx-3">
                        <label htmlFor="dpi">Dpi</label>
                        <Field
                            name="dpi"
                            placeholder="dpi"
                            component={renderField}
                            type="number"
                            className="form-control"
                            disabled={ver}
                        />
                    </div>
                </div>
                <div className="p-0 pt-3 d-flex flex-column flex-md-row col-6 m-auto">
                    <div className="d-flex flex-column flex-1 mx-3">
                        <label htmlFor="fecha">Fecha Fallecimiento</label>
                        <Field
                            name="fecha"
                            placeholder="fecha"
                            component={renderDatePicker}
                            className="form-control"
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
                            to="/fallecidos"
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
    form: 'fallecidoForm', // a unique identifier for this form
    validate,
})(CrearEditar);
