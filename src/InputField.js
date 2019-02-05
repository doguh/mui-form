import React from "react";
import PropTypes from "prop-types";
import FormContext from "./FormContext";
import TextField from "./inputs/TextField";
import Select from "./inputs/Select";
import Checkbox from "./inputs/Checkbox";

const mapInputTypes = {
  select: Select,
  checkbox: Checkbox,
  switch: Checkbox
};

class InputField extends React.Component {
  static contextType = FormContext;

  componentWillUnmount() {
    if (
      this.context &&
      this.context.fields &&
      this.context.fields[this.props.name] === this
    ) {
      delete this.context.fields[this.props.name];
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
        {({ classes, values, errors, handleChange, fields }) => {
          const val = values[name] !== undefined ? values[name] : defaultValue;
          if (fields[name] !== this) {
            fields[name] = this;
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
              handleChange={handleChange(name)}
              value={val || ""}
              validationError={errors && errors[name]}
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
  // eslint-disable-next-line
  validate: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.arrayOf(PropTypes.func)
  ]),
  defaultValue: PropTypes.any,
  id: PropTypes.string,
  required: PropTypes.bool,
  options: PropTypes.array, // select options
  disabled: PropTypes.bool,
  className: PropTypes.string,
  component: PropTypes.any
};

export default InputField;
