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

  static getDerivedStateFromProps(nextProps, prevState) {
    return null;
  }

  state = { error: null };
  _prevValues;
  value;

  componentWillUnmount() {
    // TODO unregister field
  }

  getValidationError() {
    if (
      !this.props.disabled &&
      this.props.validate &&
      (this.value || this.props.required)
    ) {
      const error = Array.isArray(this.props.validate)
        ? findValue(this.props.validate, fn => fn(this.value))
        : this.props.validate(this.value);
      if (this.state.error !== error) {
        this.setState({ error });
        console.log(this.props.name, error);
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
    console.log("render input field", name);
    return (
      <FormContext.Consumer>
        {({ classes, values, errors, handleChange, register }) => {
          let val;
          if (this._prevValues !== values) {
            val = values[name] !== undefined ? values[name] : defaultValue;
          } else {
            val = this.value;
          }
          this._prevValues = values;
          this.value = val;
          register(this);
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
              // handleChange={handleChange(name)}
              handleChange={value => {
                this.value = value;
                if (this.props.onChange) {
                  this.props.onChange(value);
                }
                handleChange(name, value);
                this.setState({});
              }}
              value={val || ""}
              validationError={this.state.error}
              disabled={disabled}
              className={className}
            />
          );
        }}
      </FormContext.Consumer>
    );
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
