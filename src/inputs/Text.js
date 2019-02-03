import React from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";

class Text extends React.Component {
  render() {
    const {
      type,
      name,
      label,
      placeholder,
      id,
      required,
      value,
      handleChange,
      classes,
      validationError,
      disabled
    } = this.props;
    return (
      <TextField
        type={type}
        name={name}
        label={label}
        placeholder={placeholder}
        id={id}
        required={required}
        className={classes.textField}
        onChange={event => handleChange(event.target.value)}
        value={value}
        error={!!validationError}
        helperText={validationError}
        margin="normal"
        disabled={disabled}
      />
    );
  }
}

Text.propTypes = {
  classes: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  id: PropTypes.string,
  required: PropTypes.bool,
  validationError: PropTypes.string,
  handleChange: PropTypes.func,
  value: PropTypes.any,
  disabled: PropTypes.bool
};

export default Text;
