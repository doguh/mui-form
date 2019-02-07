import React from "react";
import PropTypes from "prop-types";
import FormContext from "./FormContext";
import TextField from "./inputs/TextField";
import Select from "./inputs/Select";
import Checkbox from "./inputs/Checkbox";
import findValue from "./helpers/findValue";

const mapInputTypes = {
  select: Select,
  checkbox: Checkbox,
  switch: Checkbox
};

class InputField extends React.Component {
  static contextType = FormContext;

  _prevValues;
  _prevErrors;
  _formFields;
  value;
  error;

  getValidationError() {
    if (
      !this.props.disabled &&
      this.props.validate &&
      (this.value || this.props.required)
    ) {
      const error = Array.isArray(this.props.validate)
        ? findValue(this.props.validate, fn => fn(this.value))
        : this.props.validate(this.value);
      if (this.error !== error) {
        this.error = error;
        this.forceUpdate();
      }
      return error;
    }
  }

  render() {
    const {
      type,
      name,
      label,
      placeholder,
      id,
      required,
      defaultValue,
      options,
      disabled,
      className,
      component
    } = this.props;
    return (
      <FormContext.Consumer>
        {({ values, errors, classes, handleChange, formFields }) => {
          // register this field in the form's fields list
          formFields[name] = this;
          this._formFields = formFields;
          if (this._prevValues !== values) {
            // if Form's values prop has changed, invalidate this.value
            this.value =
              values[name] !== undefined ? values[name] : defaultValue;
            this._prevValues = values;
          }
          if (this._prevErrors !== errors) {
            // if Form's errors prop has changed, invalidate this.error
            this.error = errors[name];
            this._prevErrors = errors;
          }
          const InputComponent = component || mapInputTypes[type] || TextField;
          return (
            <InputComponent
              type={type}
              name={name}
              label={label}
              placeholder={placeholder}
              id={id}
              required={required}
              classes={classes}
              options={options}
              handleChange={value => {
                this.value = value;
                if (this.props.onChange) {
                  this.props.onChange(value);
                }
                if (handleChange) {
                  handleChange(name, value);
                }
                this.forceUpdate();
              }}
              value={this.value || ""}
              validationError={this.error}
              disabled={disabled}
              className={className}
            />
          );
        }}
      </FormContext.Consumer>
    );
  }

  componentWillUnmount() {
    if (this._formFields && this._formFields[this.props.name] === this) {
      // unregister this field from the form's fields list
      delete this._formFields[this.props.name];
    }
    this._formFields = null;
    this._prevValues = null;
    this._prevErrors = null;
    this.value = null;
  }
}

InputField.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  validate: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.arrayOf(PropTypes.func)
  ]),
  onChange: PropTypes.func,
  defaultValue: PropTypes.any,
  id: PropTypes.string,
  required: PropTypes.bool,
  options: PropTypes.array, // select options
  disabled: PropTypes.bool,
  className: PropTypes.string,
  component: PropTypes.any
};

export default InputField;
