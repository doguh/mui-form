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
      className,
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
        className={className || (classes && classes.textField)}
        onChange={event => handleChange(event.target.value)}
        value={value}
        error={!!validationError}
        helperText={validationError}
        margin="normal"
        disabled={disabled}
        InputLabelProps={type === "number" ? { shrink: true } : undefined}
      />
    );
  }
}

Text.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  classes: PropTypes.object,
  className: PropTypes.string,
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
