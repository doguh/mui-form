import React from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import FormContext from "./FormContext";

class InputField extends React.Component {
  render() {
    const {
      type,
      name,
      label,
      placeholder,
      id,
      required,
      defaultValue
    } = this.props;
    return (
      <FormContext.Consumer>
        {({ classes, values, errors, handleChange, fields }) => {
          const val = values[name] !== undefined ? values[name] : defaultValue;
          if (fields[name] !== this.props) {
            fields[name] = this.props;
          }
          return (
            <TextField
              type={type}
              name={name}
              label={label}
              placeholder={placeholder}
              id={id}
              required={required}
              className={classes.textField}
              margin="normal"
              onChange={handleChange(this.props.name)}
              value={val || ""}
              error={!!(errors && errors[name])}
              helperText={errors && errors[name]}
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
  required: PropTypes.bool
};

export default InputField;
