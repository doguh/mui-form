import React from "react";
import PropTypes from "prop-types";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";

class Select extends React.Component {
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
      className,
      validationError,
      options,
      disabled
    } = this.props;
    return (
      <TextField
        id={id}
        select
        label={label}
        className={className || (classes && classes.select)}
        value={value}
        name={name}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        onChange={event => handleChange(event.target.value)}
        error={!!validationError}
        helperText={validationError}
        margin="normal"
      >
        {options.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    );
  }
}

Select.propTypes = {
  options: PropTypes.array.isRequired,
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

export default Select;
