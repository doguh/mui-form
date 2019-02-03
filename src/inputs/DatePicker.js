import React from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";

class DatePickers extends React.Component {
  render() {
    const {
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
        type="date"
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
        InputLabelProps={{
          shrink: true
        }}
      />
    );
  }
}

DatePickers.propTypes = {
  classes: PropTypes.object.isRequired,
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

export default DatePickers;
