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
  select: Select,
  checkbox: Checkbox,
  switch: Checkbox,
  date: DatePicker
};

class InputField extends React.Component {
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
      disabled
    } = this.props;
    return (
      <FormContext.Consumer>
        {({ classes, values, errors, handleChange, fields }) => {
          const val = values[name] !== undefined ? values[name] : defaultValue;
          if (fields[name] !== this.props) {
            fields[name] = this.props;
          }
          const InputComponent = mapInputTypes[type];
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
  disabled: PropTypes.bool
};

export default InputField;
