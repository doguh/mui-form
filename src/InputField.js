import React from "react";
import PropTypes from "prop-types";
import FormContext from "./FormContext";
import Text from "./inputs/Text";
import Select from "./inputs/Select";
import Checkbox from "./inputs/Checkbox";
import DatePicker from "./inputs/DatePicker";

const mapInputTypes = {
  text: Text,
  email: Text,
  password: Text,
  tel: Text,
  number: Text,
  select: Select,
  checkbox: Checkbox,
  switch: Checkbox,
  date: DatePicker,
  time: DatePicker
};

class InputField extends React.Component {
  static contextType = FormContext;

  componentWillUnmount() {
    if (this.context && this.context.fields) {
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
          if (fields[name] !== this.props) {
            fields[name] = this.props;
          }
          const InputComponent = component || mapInputTypes[type];
          if (!InputComponent) {
            throw new Error(`unknown InputField type: ${type}`);
          }
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
              handleChange={handleChange(this.props.name)}
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
  validate: PropTypes.func, // eslint-disable-line
  defaultValue: PropTypes.any,
  id: PropTypes.string,
  required: PropTypes.bool,
  options: PropTypes.array, // select options
  disabled: PropTypes.bool,
  className: PropTypes.string,
  component: PropTypes.any
};

export default InputField;
