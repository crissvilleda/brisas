import React from 'react';
import { Field, reduxForm } from 'redux-form';
import {
    AsyncSelectField,
    SelectField,
    renderTextArea,
} from '../../Utils/renderField/renderField';
import { Link } from 'react-router-dom';
import { api } from 'api';
import moment from 'moment';

const optionsMes = [
    { value: 1, label: 'Enero' },
    { value: 2, label: 'Febrero' },
    { value: 3, label: 'Marzo' },
    { value: 4, label: 'Abril' },
    { value: 5, label: 'Mayo' },
    { value: 6, label: 'Junio' },
    { value: 7, label: 'Julio' },
    { value: 8, label: 'Agosto' },
    { value: 9, label: 'Septiembre' },
    { value: 10, label: 'Octubre' },
    { value: 11, label: 'Noviembre' },
    { value: 12, label: 'Diciembre' },
];

const optionsAnio = [
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
    if (!values.usuario) errors.usuario = 'Campo requerido';
    if (!values.anio) errors.anio = 'Campo requerido';
    if (!values.mes) errors.mes = 'Campo requerido';
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
        <form action="" onSubmit={handleSubmit}>
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
                <div className="d-flex justify-content-center pt-4">
                    <p className="m-0">
                        Seleccione el año y el mes hasta donde el usuario esta
                        al dia del cementerio.
                    </p>
                </div>
                <div className="p-0 pt-3 d-flex flex-column flex-md-row col-6 m-auto">
                    <div className="d-flex flex-column flex-1 mx-3">
                        <label htmlFor="anio">Año</label>
                        <Field
                            name="anio"
                            placeholder="Seleccione año"
                            component={SelectField}
                            options={optionsAnio}
                            labelKey="label"
                            valueKey="value"
                            type="text"
                            className="form-control"
                            disabled={ver}
                        />
                    </div>
                </div>
                <div className="p-0 pt-3 d-flex flex-column flex-md-row col-6 m-auto">
                    <div className="d-flex flex-column flex-1 mx-3">
                        <label htmlFor="mes">Mes</label>
                        <Field
                            name="mes"
                            placeholder="Seleccione mes"
                            component={SelectField}
                            options={optionsMes}
                            labelKey="label"
                            valueKey="value"
                            type="text"
                            className="form-control"
                            disabled={ver}
                        />
                    </div>
                </div>
                <div className="p-0 pt-3 d-flex flex-column flex-md-row col-6 m-auto">
                    <div className="d-flex flex-column flex-1 mx-3">
                        <label htmlFor="mes">Descripción</label>
                        <Field
                            name="descripcion"
                            placeholder="Agrega descripción"
                            component={renderTextArea}
                            rows={4}
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
                        <Link
                            className="btn btn-secondary ml-2"
                            to="/usuarios/cementerio"
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
    form: 'servicioForm', // a unique identifier for this form
    validate,
    initialValues: {
        anio: moment().year(),
        mes: moment().month() - 1,
    },
})(CrearEditar);
