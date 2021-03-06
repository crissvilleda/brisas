import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { renderField } from '../../Utils/renderField/renderField';
import { Link } from 'react-router-dom';

const validate = (values) => {
    const errors = {};
    if (!values.nombre) errors.nombre = 'Campo requerido';
    return errors;
};

const CrearEditar = (props) => {
    const { handleSubmit, ver } = props;
    return (
        <form action="" onSubmit={handleSubmit} className="py-4">
            <h3 className=" m-0 text-dark" style={{ fontSize: '1.5rem' }}>
                SECTOR
            </h3>
            <hr
                className="bg-white m-0"
                style={{ height: '0.3rem', borderRadius: '0.25rem' }}
            />
            <br />
            <div className="mb-4 card card-small">
                <div className="p-0 pt-3 d-flex flex-column flex-md-row col-6 m-auto">
                    <div className="d-flex flex-column flex-1 mx-3">
                        <label htmlFor="nombre">Nombre</label>
                        <Field
                            name="nombre"
                            placeholder="Nombre de sector"
                            component={renderField}
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
                        <Link className="btn btn-secondary ml-2" to="/sectores">
                            Cancelar
                        </Link>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default reduxForm({
    form: 'sectorForm', // a unique identifier for this form
    validate,
})(CrearEditar);
