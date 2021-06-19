import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { renderField } from '../../Utils/renderField/renderField';

const validate = (values) => {
    const errors = {};
    if (!values.nombre) errors.nombre = 'Campo requerido';
    return errors;
};

const CrearEditar = (props) => {
    const { handleSubmit } = props;
    return (
        <form action="" onSubmit={handleSubmit} className="py-4">
            <h2>SECTORES</h2>
            <div className="mb-4 card card-small">
                <div className="p-0 pt-3 d-flex flex-column flex-md-row">
                    <div className="d-flex flex-column flex-1 mx-3">
                        <label htmlFor="nombre">Nombre</label>
                        <Field
                            name="nombre"
                            placeholder="Nombre de sector"
                            component={renderField}
                            type="text"
                            className="form-control"
                        />
                    </div>
                </div>

                <div className="d-flex">
                    <button
                        type="submit"
                        className="btn btn-primary mx-auto mb-3"
                    >
                        Guardar
                    </button>
                </div>
            </div>
        </form>
    );
};

export default reduxForm({
    form: 'sectorForm', // a unique identifier for this form
    validate,
})(CrearEditar);
