import React from 'react';
import { Field, reduxForm } from 'redux-form';
import {
    renderField,
    renderCurrency,
} from '../../Utils/renderField/renderField';
import { Link } from 'react-router-dom';

const validate = (values) => {
    const errors = {};
    if (!values.cuota_agua) errors.cuota_agua = 'Campo requerido';
    if (!values.cuota_agua) errors.cuota_agua = 'Campo requerido';
    return errors;
};

const CrearEditar = (props) => {
    const { handleSubmit, ver } = props;
    return (
        <form action="" onSubmit={handleSubmit} className="py-4">
            <h3 className="text-dark">CONFIGURACIÓN</h3>
            <div className="mb-4 card card-small">
                <br />
                <div className="p-0 pt-3 d-flex flex-column flex-md-row col-6 m-auto">
                    <div className="d-flex flex-column flex-1 mx-3">
                        <label htmlFor="cuota_agua">
                            Cuota mensual servicio de agua
                        </label>
                        <Field
                            name="cuota_agua"
                            placeholder="Ingrese cuota mensual"
                            component={renderCurrency}
                            type="number"
                            className="form-control"
                            disabled={ver}
                        />
                    </div>
                </div>
                <br />
                <div className="p-0 pt-3 d-flex flex-column flex-md-row col-6 m-auto">
                    <div className="d-flex flex-column flex-1 mx-3">
                        <label htmlFor="cuota_cementerio">
                            Cuota mensual servicio de cementerio
                        </label>
                        <Field
                            name="cuota_cementerio"
                            placeholder="Ingrese cuota mensual"
                            component={renderCurrency}
                            type="number"
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
                        <Link className="btn btn-secondary ml-2" to="/">
                            Cancelar
                        </Link>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default reduxForm({
    form: 'configForm', // a unique identifier for this form
    validate,
})(CrearEditar);
