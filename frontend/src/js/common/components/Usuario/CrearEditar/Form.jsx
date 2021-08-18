import React from 'react';
import { Field, reduxForm } from 'redux-form';
import {
    renderField,
    AsyncSelectField,
} from '../../Utils/renderField/renderField';
import { Link } from 'react-router-dom';
import { api } from 'api';

const validate = (values) => {
    const errors = {};
    if (!values.nombres) errors.nombres = 'Campo requerido';
    if (!values.apellidos) errors.apellidos = 'Campo requerido';
    if (!values.dpi) errors.dpi = 'Campo requerido';
    if (values.dpi && values.dpi.length !== 13)
        errors.dpi = 'EL numero de pdi es invalido';
    if (!values.telefono) errors.telefono = 'Campo requerido';
    if (!values.sector) errors.sector = 'Campo requerido';
    return errors;
};

const loadOptions = (search) => {
    const params = {};
    if (search) params.search = search;
    return api
        .get('sector', params)
        .then((response) => response.results)
        .catch(() => []);
};

const CrearEditar = (props) => {
    const { handleSubmit, ver } = props;
    return (
        <form action="" onSubmit={handleSubmit} className="py-4">
            <h3 className="m-0  text-dark" style={{ fontSize: '1.5rem' }}>
                USUARIO
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
                            placeholder="Nombres del usuario"
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
                            placeholder="Apellidos del usuario"
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
                            placeholder="Dpi del usuario"
                            component={renderField}
                            type="text"
                            className="form-control"
                            disabled={ver}
                        />
                    </div>
                </div>
                <div className="p-0 pt-3 d-flex flex-column flex-md-row col-6 m-auto">
                    <div className="d-flex flex-column flex-1 mx-3">
                        <label htmlFor="telefono">Teléfono</label>
                        <Field
                            name="telefono"
                            placeholder="Teléfono del usuario"
                            component={renderField}
                            type="text"
                            className="form-control"
                            disabled={ver}
                        />
                    </div>
                </div>
                <div className="p-0 pt-3 d-flex flex-column flex-md-row col-6 m-auto">
                    <div className="d-flex flex-column flex-1 mx-3">
                        <label htmlFor="sector">Sector</label>
                        <Field
                            name="sector"
                            placeholder="Sector del usuario"
                            component={AsyncSelectField}
                            loadOptions={loadOptions}
                            labelKey="nombre"
                            valueKey="id"
                            type="text"
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
                        <Link className="btn btn-secondary ml-2" to="/usuarios">
                            Cancelar
                        </Link>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default reduxForm({
    form: 'usuarioForm', // a unique identifier for this form
    validate,
})(CrearEditar);
