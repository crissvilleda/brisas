import React from 'react';
import { Field, reduxForm } from 'redux-form';
import {
    renderField,
    renderFieldCheck,
    SelectField,
} from '../../Utils/renderField/renderField';
import { Link } from 'react-router-dom';

const options = [
    { value: 2020, label: '2020' },
    { value: 2021, label: '2021' },
    { value: 2022, label: '2022' },
    { value: 2023, label: '2023' },
    { value: 2024, label: '2024' },
    { value: 2025, label: '2025' },
    { value: 2026, label: '2026' },
    { value: 2027, label: '2027' },
];

const validate = (values) => {
    const errors = {};
    if (!values.nombre) errors.nombre = 'Campo requerido';
    return errors;
};

const CrearEditar = (props) => {
    const { handleSubmit, ver } = props;

    const renderUsuario = () => {
        console.log(props);
        if (props.item && props.item.usuario) {
            const { nombres, apellidos } = props.item.usuario;
            return `${nombres} ${apellidos}`;
        }
        return '';
    };

    return (
        <form action="" onSubmit={handleSubmit} className="py-4">
            <h3 className="text-dark">{renderUsuario()}</h3>
            <div className="mb-4 card card-small">
                <div className="p-0 pt-3 d-flex flex-column flex-md-row col-6 m-auto">
                    <div className="d-flex flex-column flex-1 mx-3">
                        <label htmlFor="nombre">Enero</label>
                        <Field
                            name="enero"
                            component={SelectField}
                            labelKey="label"
                            valueKey="value"
                            options={options}
                            type="text"
                            className="form-control"
                            disabled={ver}
                        />
                    </div>
                </div>
                <div className="p-0 pt-3 d-flex flex-column flex-md-row col-6 m-auto">
                    <div className="d-flex flex-column flex-1 mx-3">
                        <label htmlFor="nombre">Enero</label>
                        <Field
                            name="enero"
                            component={renderFieldCheck}
                            type="text"
                            className="form-control"
                            disabled={ver}
                        />
                    </div>
                    <div className="d-flex flex-column flex-1 mx-3">
                        <label htmlFor="nombre">Febrero</label>
                        <Field
                            name="febrero"
                            component={renderFieldCheck}
                            type="text"
                            className="form-control"
                            disabled={ver}
                        />
                    </div>
                </div>
                <div className="p-0 pt-3 d-flex flex-column flex-md-row col-6 m-auto">
                    <div className="d-flex flex-column flex-1 mx-3">
                        <label htmlFor="nombre">Marzo</label>
                        <Field
                            name="marzo"
                            component={renderFieldCheck}
                            type="text"
                            className="form-control"
                            disabled={ver}
                        />
                    </div>
                    <div className="d-flex flex-column flex-1 mx-3">
                        <label htmlFor="nombre">Abril</label>
                        <Field
                            name="abril"
                            component={renderFieldCheck}
                            type="text"
                            className="form-control"
                            disabled={ver}
                        />
                    </div>
                </div>
                <div className="p-0 pt-3 d-flex flex-column flex-md-row col-6 m-auto">
                    <div className="d-flex flex-column flex-1 mx-3">
                        <label htmlFor="nombre">Mayo</label>
                        <Field
                            name="mayo"
                            component={renderFieldCheck}
                            type="text"
                            className="form-control"
                            disabled={ver}
                        />
                    </div>
                    <div className="d-flex flex-column flex-1 mx-3">
                        <label htmlFor="nombre">Junio</label>
                        <Field
                            name="junio"
                            component={renderFieldCheck}
                            type="text"
                            className="form-control"
                            disabled={ver}
                        />
                    </div>
                </div>
                <div className="p-0 pt-3 d-flex flex-column flex-md-row col-6 m-auto">
                    <div className="d-flex flex-column flex-1 mx-3">
                        <label htmlFor="nombre">Julio</label>
                        <Field
                            name="julio"
                            component={renderFieldCheck}
                            type="text"
                            className="form-control"
                            disabled={ver}
                        />
                    </div>
                    <div className="d-flex flex-column flex-1 mx-3">
                        <label htmlFor="nombre">Agosto</label>
                        <Field
                            name="agosto"
                            component={renderFieldCheck}
                            type="text"
                            className="form-control"
                            disabled={ver}
                        />
                    </div>
                </div>
                <div className="p-0 pt-3 d-flex flex-column flex-md-row col-6 m-auto">
                    <div className="d-flex flex-column flex-1 mx-3">
                        <label htmlFor="nombre">Septiembre</label>
                        <Field
                            name="septiembre"
                            component={renderFieldCheck}
                            type="text"
                            className="form-control"
                            disabled={ver}
                        />
                    </div>
                    <div className="d-flex flex-column flex-1 mx-3">
                        <label htmlFor="nombre">Octubre</label>
                        <Field
                            name="octubre"
                            component={renderFieldCheck}
                            type="text"
                            className="form-control"
                            disabled={ver}
                        />
                    </div>
                </div>
                <div className="p-0 pt-3 d-flex flex-column flex-md-row col-6 m-auto">
                    <div className="d-flex flex-column flex-1 mx-3">
                        <label htmlFor="nombre">Noviembre</label>
                        <Field
                            name="noviembre"
                            component={renderFieldCheck}
                            type="text"
                            className="form-control"
                            disabled={ver}
                        />
                    </div>
                    <div className="d-flex flex-column flex-1 mx-3">
                        <label htmlFor="nombre">Diciembre</label>
                        <Field
                            name="diciembre"
                            component={renderFieldCheck}
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
    form: 'pagoForm', // a unique identifier for this form
    validate,
})(CrearEditar);
