import React from "react";
import PropTypes from "prop-types";
import FormContext from "./FormContext";
import Text from "./inputs/Text";
import Select from "./inputs/Select";

const mapInputTypes = {
  text: Text,
  email: Text,
  select: Select
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
      options
    } = this.props;
    return (
      <FormContext.Consumer>
        {({ classes, values, errors, handleChange, fields }) => {
          const val = values[name] !== undefined ? values[name] : defaultValue;
          if (fields[name] !== this.props) {
            fields[name] = this.props;
          }
          const InputComponent = mapInputTypes[type] || Text;
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
              onChange={handleChange(this.props.name)}
              value={val || ""}
              validationError={errors && errors[name]}
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
  options: PropTypes.array
};

export default InputField;
