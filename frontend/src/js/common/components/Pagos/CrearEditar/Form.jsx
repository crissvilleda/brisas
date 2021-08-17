import React from 'react';
import { Field, reduxForm } from 'redux-form';
import {
    renderField,
    renderFieldCheck,
    SelectField,
} from '../../Utils/renderField/renderField';
import { Link } from 'react-router-dom';
import moment from 'moment';

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
    const {
        handleSubmit,
        selectMeses,
        totalPagar,
        setSelectMeses,
        setTotalPagar,
    } = props;

    React.useEffect(() => {
        const total = props.cuota * selectMeses;
        setTotalPagar(total);
    }, [selectMeses]);

    const onCambio = (value) => {
        if (value === 'true') {
            setSelectMeses(selectMeses - 1);
        } else if (value === 'false') {
            setSelectMeses(selectMeses + 1);
        }
    };

    return (
        <form action="" onSubmit={handleSubmit}>
            <div className="d-flex flex-1 flex-column flex-md-row">
                <div className="d-flex flex-1 flex-column">
                    <div className="p-0 pt-3 d-flex flex-column flex-md-row flex-1">
                        <div className="d-flex flex-column flex-1 mx-3">
                            <label htmlFor="nombre">Año</label>
                            <Field
                                name="anio"
                                component={SelectField}
                                labelKey="label"
                                valueKey="value"
                                options={options}
                                onCambio={props.onAnioChange}
                                type="text"
                                className="form-control"
                            />
                        </div>
                    </div>
                    <div className="p-0 pt-3 d-flex flex-row flex-1">
                        <div className="d-flex flex-column flex-1 mx-3  align-items-center">
                            <label htmlFor="nombre">Enero</label>
                            <Field
                                name="enero"
                                component={renderFieldCheck}
                                type="text"
                                onCambio={onCambio}
                                disabled={props.meses.includes('enero')}
                                className="form-control"
                            />
                        </div>
                        <div className="d-flex flex-column flex-1 mx-3  align-items-center">
                            <label htmlFor="nombre">Febrero</label>
                            <Field
                                name="febrero"
                                component={renderFieldCheck}
                                type="text"
                                onCambio={onCambio}
                                disabled={props.meses.includes('febrero')}
                                className="form-control"
                            />
                        </div>
                    </div>
                    <div className="p-0 pt-3 d-flex flex-row flex-1">
                        <div className="d-flex flex-column flex-1 mx-3  align-items-center">
                            <label htmlFor="nombre">Marzo</label>
                            <Field
                                name="marzo"
                                component={renderFieldCheck}
                                type="text"
                                onCambio={onCambio}
                                disabled={props.meses.includes('marzo')}
                                className="form-control"
                            />
                        </div>
                        <div className="d-flex flex-column flex-1 mx-3  align-items-center">
                            <label htmlFor="nombre">Abril</label>
                            <Field
                                name="abril"
                                component={renderFieldCheck}
                                type="text"
                                onCambio={onCambio}
                                disabled={props.meses.includes('abril')}
                                className="form-control"
                            />
                        </div>
                    </div>
                    <div className="p-0 pt-3 d-flex flex-row flex-1">
                        <div className="d-flex flex-column flex-1 mx-3  align-items-center">
                            <label htmlFor="nombre">Mayo</label>
                            <Field
                                name="mayo"
                                component={renderFieldCheck}
                                type="text"
                                onCambio={onCambio}
                                disabled={props.meses.includes('mayo')}
                                className="form-control"
                            />
                        </div>
                        <div className="d-flex flex-column flex-1 mx-3  align-items-center">
                            <label htmlFor="nombre">Junio</label>
                            <Field
                                name="junio"
                                component={renderFieldCheck}
                                type="text"
                                onCambio={onCambio}
                                disabled={props.meses.includes('junio')}
                                className="form-control"
                            />
                        </div>
                    </div>
                    <div className="p-0 pt-3 d-flex flex-row flex-1">
                        <div className="d-flex flex-column flex-1 mx-3  align-items-center">
                            <label htmlFor="nombre">Julio</label>
                            <Field
                                name="julio"
                                component={renderFieldCheck}
                                type="text"
                                onCambio={onCambio}
                                disabled={props.meses.includes('julio')}
                                className="form-control"
                            />
                        </div>
                        <div className="d-flex flex-column flex-1 mx-3  align-items-center">
                            <label htmlFor="nombre">Agosto</label>
                            <Field
                                name="agosto"
                                component={renderFieldCheck}
                                type="text"
                                onCambio={onCambio}
                                disabled={props.meses.includes('agosto')}
                                className="form-control"
                            />
                        </div>
                    </div>
                    <div className="p-0 pt-3 d-flex flex-row flex-1">
                        <div className="d-flex flex-column flex-1 mx-3  align-items-center">
                            <label htmlFor="nombre">Septiembre</label>
                            <Field
                                name="septiembre"
                                component={renderFieldCheck}
                                type="text"
                                onCambio={onCambio}
                                disabled={props.meses.includes('septiembre')}
                                className="form-control"
                            />
                        </div>
                        <div className="d-flex flex-column flex-1 mx-3  align-items-center">
                            <label htmlFor="nombre">Octubre</label>
                            <Field
                                name="octubre"
                                component={renderFieldCheck}
                                type="text"
                                onCambio={onCambio}
                                disabled={props.meses.includes('octubre')}
                                className="form-control"
                            />
                        </div>
                    </div>
                    <div className="p-0 pt-3 d-flex flex-row flex-1">
                        <div className="d-flex flex-column flex-1 mx-3  align-items-center">
                            <label htmlFor="nombre">Noviembre</label>
                            <Field
                                name="noviembre"
                                component={renderFieldCheck}
                                type="text"
                                onCambio={onCambio}
                                disabled={props.meses.includes('noviembre')}
                                className="form-control"
                            />
                        </div>
                        <div className="d-flex flex-column flex-1 mx-3  align-items-center">
                            <label htmlFor="nombre">Diciembre</label>
                            <Field
                                name="diciembre"
                                component={renderFieldCheck}
                                type="text"
                                onCambio={onCambio}
                                disabled={props.meses.includes('diciembre')}
                                className="form-control"
                            />
                        </div>
                    </div>
                </div>

                <div className="d-flex flex-1 flex-column">
                    <br className="d-none d-md-flex" />
                    <div className="pt-4 pl-4">
                        <span className="font-weight-bolder text-md">
                            Servicio a pagar:{' '}
                        </span>{' '}
                        <span className="text-md">Agua</span>
                    </div>
                    <div className="pt-4 pl-4">
                        <span className="font-weight-bolder text-md">
                            Pago por mes:{' '}
                        </span>{' '}
                        <span className="text-md">{`Q ${props.cuota.toFixed(
                            2
                        )}`}</span>
                    </div>
                    <div className="pt-4 pl-4">
                        <span className="font-weight-bolder text-md">
                            Meses a pagar:{' '}
                        </span>
                        <span className="text-md">{selectMeses}</span>
                    </div>
                    <div className="pt-4 pl-4">
                        <span className="font-weight-bolder text-md">
                            Total a pagar:{' '}
                        </span>
                        <span className="text-md">{`Q ${totalPagar.toFixed(
                            2
                        )}`}</span>
                    </div>
                </div>
            </div>

            <div className="d-flex py-4">
                <div className="col-5 m-auto d-flex justify-content-center">
                    <button
                        type="button"
                        className="btn btn-primary mr-2"
                        onClick={(e) => props.onSubmit(selectMeses)}
                    >
                        Pagar
                    </button>
                    <Link
                        className="btn btn-secondary ml-2"
                        to={`/servicio/${props.item.id}/ver`}
                    >
                        Cancelar
                    </Link>
                </div>
            </div>
        </form>
    );
};

export default reduxForm({
    form: 'pagoForm', // a unique identifier for this form
    validate,
    initialValues: {
        anio: moment().year(),
    },
})(CrearEditar);
