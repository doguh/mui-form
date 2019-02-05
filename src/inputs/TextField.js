import React from "react";
import PropTypes from "prop-types";
import MuiTextField from "@material-ui/core/TextField";

const shrinkOpts = { shrink: true };

const mapTypesOpts = {
  number: shrinkOpts,
  date: shrinkOpts,
  time: shrinkOpts
};

class TextField extends React.Component {
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
      <MuiTextField
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
        // some input types needs to always shrink
        InputLabelProps={mapTypesOpts[type]}
      />
    );
  }
}

TextField.propTypes = {
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

export default TextField;
