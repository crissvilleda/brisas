import React from 'react';
import { Field, reduxForm } from 'redux-form';
import {
    renderField,
    AsyncSelectField,
    renderTextArea,
    renderCurrency,
    renderDatePicker,
    renderDayPicker,
    SelectField,
} from '../../../Utils/renderField/renderField';
import { Link } from 'react-router-dom';
import { api } from 'api';

const validate = (values) => {
    const errors = {};
    if (!values.descripcion) errors.descripcion = 'Campo requerido';
    if (!values.monto) errors.monto = 'Campo requerido';
    return errors;
};

const CrearEditar = (props) => {
    const { handleSubmit, ver, item_proyecto = {} } = props;
    const { id = 0, nombre = "" } = item_proyecto || {}
    return (
        <form action="" onSubmit={handleSubmit} className="py-4">
            <h3 className="py-4 text-dark"> ROYECTOS {nombre} </h3>
            <div className="mb-4 card card-small">
                <div className="p-0 pt-3 d-flex flex-column flex-md-row col-5 m-auto">
                    <div className="d-flex flex-column flex-1 mx-3">
                        <label htmlFor="descripcion">Descripción</label>
                        <Field
                            name="descripcion"
                            placeholder="Descripción"
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

                        <label htmlFor="monto">Monto</label>
                        <Field
                            name="monto"
                            placeholder="Monto"
                            component={renderCurrency}
                            type="text"
                            className="form-control"
                            disabled={ver}
                        />
                    </div>
                </div>
                <div className="p-0 pt-3 d-flex flex-column flex-md-row col-5 m-auto">
                    <div className="d-flex flex-column flex-1 mx-3">

                        <label htmlFor="tipo_detalle">Tipo del monto</label>
                        <Field
                            name="tipo_detalle"
                            options={[{ "name": "Egreso", "id": 20 },
                            { "name": "Neutro", "id": 30 }]}
                            component={SelectField}
                            placeholder="Tipo del monto"
                            disabled={ver}
                            isSearchable={false}
                            defaultValue={20}
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
                            to={`/proyecto/agua/${id}/pagos`}
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
    form: 'DetalleProyectoForm', // a unique identifier for this form
    validate,
})(CrearEditar);
