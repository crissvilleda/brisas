import React, { useEffect } from 'react';
import Select, { Creatable, Async } from 'react-select';
import NumberFormat from 'react-number-format';
import classNames from 'classnames';
import Switch from 'react-switch';
import DayPicker from '../DayPicker';
import FileUploader from '../FileUploader/FileUploader';
import DatePicker from 'react-date-picker';
import _ from 'lodash';
import dayjs from 'dayjs';

export const renderField = ({
    input,
    placeholder,
    type,
    disabled,
    meta: { touched, error },
}) => {
    const invalid = touched && error;
    return (
        <div>
            <input
                {...input}
                placeholder={placeholder}
                disabled={disabled || false}
                type={type}
                className={classNames('form-control', {
                    'is-invalid': invalid,
                })}
            />
            {invalid && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};

export const renderTextArea = ({
    input,
    placeholder,
    rows,
    meta: { touched, error },
    disabled,
}) => {
    const invalid = touched && error;
    return (
        <div>
            <textarea
                {...input}
                placeholder={placeholder}
                style={{ resize: 'none' }}
                rows={rows || 3}
                disabled={disabled}
                className={classNames('form-control', {
                    'is-invalid': invalid,
                })}
            />
            {invalid && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};

export const renderNumber = ({
    input,
    decimalScale,
    placeholder,
    meta: { touched, error },
    prefix = '',
    suffix = '',
    numberFormat,
}) => {
    const invalid = touched && error;
    return (
        <div>
            <NumberFormat
                placeholder={placeholder}
                className={classNames('form-control', {
                    'is-invalid': invalid,
                })}
                decimalScale={decimalScale || 0}
                format={numberFormat}
                fixedDecimalScale
                value={input.value}
                thousandSeparator
                prefix={prefix}
                suffix={suffix}
                onValueChange={(values) => {
                    input.onChange(values.value);
                }}
            />
            {invalid && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};

export const renderCurrency = ({
    input,
    meta: { touched, error },
    prefix = 'Q ',
    placeholder,
    disabled,
}) => {
    const invalid = touched && error;
    return (
        <div>
            <NumberFormat
                className={classNames('form-control', {
                    'is-invalid': invalid,
                })}
                decimalScale={2}
                fixedDecimalScale
                placeholder={placeholder}
                value={input.value}
                disabled={disabled}
                thousandSeparator
                prefix={prefix}
                onValueChange={(values) => {
                    input.onChange(values.value);
                }}
            />
            {invalid && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};

export const renderSwitch = ({
    input,
    meta: { touched, error },
    label,
    disabled,
}) => {
    const invalid = touched && error;
    return (
        <div className="d-flex align-items-center">
            <Switch
                onColor="#007bff"
                height={18}
                width={36}
                disabled={disabled}
                onChange={(value) => {
                    input.onChange(value);
                }}
                checked={input.value ? input.value : false}
                // id="normal-switch"
            />
            &nbsp;{label}
            {invalid && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};

export const renderFieldCheck = ({
    input,
    label,
    value,
    onCambio,
    disabled,
    type,
    meta: { touched, error },
}) => {
    const invalid = touched && error;
    return (
        <React.Fragment>
            <div className="checkbox c-checkbox">
                <label className="needsclick">
                    <input
                        type="checkbox"
                        {...input}
                        disabled={disabled}
                        onChange={(value) => {
                            input.onChange(value);
                            if (onCambio) onCambio(value.target.value);
                        }}
                        checked={input.value}
                        className={classNames('', { 'is-invalid': invalid })}
                    />
                    <span className="fa fa-check" />
                    &nbsp;{label}
                </label>
            </div>
            {invalid && <div className="invalid-feedback">{error}</div>}
        </React.Fragment>
    );
};

export const renderFieldRadio = ({
    input,
    label,
    value,
    disabled,
    meta: { touched, error },
}) => {
    const invalid = touched && error;
    return (
        <React.Fragment>
            <div className="radio c-radio c-radio-nofont d-flex">
                <label className="negro font-weight-normal">
                    <input
                        type="radio"
                        disabled={disabled}
                        {...input}
                        className={classNames('', { 'is-invalid': invalid })}
                    />
                    <span />
                    &nbsp;{label}
                </label>
            </div>
            {invalid && <div className="invalid-feedback">{error}</div>}
        </React.Fragment>
    );
};

export const SelectField = ({
    onCambio,
    input,
    disabled,
    isClearable,
    isMulti,
    isSearchable,
    options,
    placeholder,
    labelKey = 'name',
    valueKey = 'id',
    meta: { touched, error },
    defaultValue,
}) => {
    const invalid = touched && error;
    const _options = [];
    options.forEach((option) => {
        _options.push({
            ...option,
            label: option[labelKey],
            value: option[valueKey],
        });
    });
    let value = input.value;
    if (value !== null && value !== undefined) {
        value = _.find(_options, { value });
    }
    useEffect(() => {
        if (!value) {
            if (defaultValue) input.onChange(defaultValue);
        }
    }, []);

    return (
        <React.Fragment>
            <Select
                isClearable={isClearable}
                className={classNames('react-select-container', {
                    'is-invalid': invalid,
                })}
                backspaceRemovesValue={false}
                isMulti={isMulti}
                isSearchable={isSearchable}
                options={_options}
                placeholder={placeholder}
                onChange={(e) => {
                    input.onChange(e ? e[valueKey] : null);
                    if (onCambio) onCambio(e);
                }}
                value={value}
                isDisabled={disabled}
            />
            {invalid && <div className="invalid-feedback">{error}</div>}
        </React.Fragment>
    );
};

export const AsyncSelectField = ({
    input,
    disabled,
    isClearable,
    isSearchable,
    loadOptions,
    placeholder,
    valueKey,
    labelKey,
    labelKey2,
    meta: { touched, error },
}) => {
    const invalid = touched && error;

    return (
        <React.Fragment>
            <Async
                isClearable={isClearable}
                cacheOptions
                className={classNames('react-select-container', {
                    'is-invalid': invalid,
                })}
                backspaceRemovesValue={false}
                isSearchable={isSearchable}
                defaultOptions
                loadOptions={loadOptions}
                placeholder={placeholder}
                getOptionValue={(option) => option[valueKey]}
                getOptionLabel={(option) =>
                    option[labelKey] +
                    ' ' +
                    (labelKey2 ? option[labelKey2] : '')
                }
                onChange={(e) => {
                    input.onChange(e ? e : null);
                }}
                value={input.value}
                isDisabled={disabled}
            />
            {invalid && <div className="invalid-feedback">{error}</div>}
        </React.Fragment>
    );
};

export const CreatableSelectField = ({
    input,
    disabled,
    isClearable,
    isSearchable,
    options,
    placeholder,
    labelKey = 'label',
    valueKey = 'value',
    meta: { touched, error },
}) => {
    const invalid = touched && error;
    const _options = [];
    options.forEach((option) => {
        _options.push({
            ...option,
            label: option[labelKey],
            value: option[valueKey],
        });
    });

    return (
        <React.Fragment>
            <Creatable
                isClearable={isClearable}
                className={classNames('react-select-container', {
                    'is-invalid': invalid,
                })}
                backspaceRemovesValue={false}
                isSearchable={isSearchable}
                options={_options}
                placeholder={placeholder}
                onChange={(e) => {
                    input.onChange(e ? e : null);
                }}
                value={input.value}
                isDisabled={disabled}
            />
            {invalid && <div className="invalid-feedback">{error}</div>}
        </React.Fragment>
    );
};

/**
 * @param photo: este parametro se usa para tener la imagen previa de una imagen en dado caso el formulario es
 * usado para una actualizacion, se espera que sea la ruta donde se encuentra la imagen
 * @param setFile
 * @param className
 * @param disabled
 * @param input
 * @param touched
 * @param error
 * */
export const renderFilePicker = ({
    photo,
    setFile,
    className,
    disabled,
    input,
    meta: { touched, error },
}) => {
    const invalid = touched && error;
    return (
        <div className={classNames(`${className}`, { 'is-invalid': invalid })}>
            <FileUploader
                disabled={disabled}
                img={!!photo ? photo : null}
                onFileChange={(e, file) => {
                    file = file || e.target.files[0];
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        input.onChange(reader.result);
                        if (!!setFile) {
                            setFile(file);
                        }
                    };
                    reader.readAsDataURL(file);
                }}
            />
            {invalid && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};

export const renderDayPicker = ({
    className,
    disabled,
    maxDate,
    minDate,
    input,
    meta: { touched, error },
}) => {
    const invalid = touched && error;
    return (
        <div className={classNames(`${className}`, { 'is-invalid': invalid })}>
            <DayPicker
                disabled={disabled}
                maxDate={maxDate}
                minDate={minDate}
                onChange={(e) => input.onChange(e)}
                value={input.value}
            />
            {invalid && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};

export const renderDatePicker = ({
    className,
    disabled,
    maxDate,
    minDate,
    input,
    meta: { touched, error },
}) => {
    const invalid = touched && error;
    let value = null;
    if (dayjs(input.value).isValid()) {
        value = dayjs(input.value).toDate();
    }
    return (
        <div className={classNames(`${className}`, { 'is-invalid': invalid })}>
            <DatePicker
                onChange={(e) => input.onChange(e)}
                className="d-flex flex-1"
                disabled={disabled}
                maxDate={maxDate}
                minDate={minDate}
                value={value}
            />
            {invalid && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};

export const RenderField = {
    renderField,
    renderTextArea,
    renderNumber,
    renderCurrency,
    renderSwitch,
    renderFieldCheck,
    renderFieldRadio,
};
