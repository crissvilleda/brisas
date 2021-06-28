import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { AsyncSelectField } from '../../Utils/renderField/renderField';
import { Link } from 'react-router-dom';
import { api } from 'api';

const validate = (values) => {
    const errors = {};
    if (!values.usuario) errors.usuario = 'Campo requerido';
    return errors;
};

const loadOptions = (search) => {
    const params = {};
    if (search) params.search = search;
    return api
        .get('usuario', params)
        .then((response) => response.results)
        .catch(() => []);
};

const CrearEditar = (props) => {
    const { handleSubmit, ver } = props;
    return (
        <form action="" onSubmit={handleSubmit} className="py-4">
            <h3 className="text-dark">REGISTRAR USUARIO AL SERVICIO AGUA</h3>
            <div className="mb-4 card card-small">
                <div className="p-0 pt-3 d-flex flex-column flex-md-row col-6 m-auto">
                    <div className="d-flex flex-column flex-1 mx-3">
                        <label htmlFor="usuario">Usuarios</label>
                        <Field
                            name="usuario"
                            placeholder="Seleccione usuario"
                            component={AsyncSelectField}
                            loadOptions={loadOptions}
                            labelKey="nombres"
                            labelKey2="apellidos"
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
    form: 'servicioForm', // a unique identifier for this form
    validate,
})(CrearEditar);
