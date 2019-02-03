import React from "react";
import PropTypes from "prop-types";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import MuiSelect from "@material-ui/core/Select";

class Select extends React.Component {
  render() {
    const {
      name,
      label,
      placeholder,
      id,
      required,
      value,
      onChange,
      classes,
      validationError,
      options
    } = this.props;
    return (
      <FormControl
        className={classes.select}
        error={!!validationError}
        required={required}
      >
        <InputLabel>{label}</InputLabel>
        <MuiSelect
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          name={name}
        >
          {options.map(({ value, label }) => (
            <MenuItem key={value} value={value}>
              {label}
            </MenuItem>
          ))}
        </MuiSelect>
        {validationError ? (
          <FormHelperText>{validationError}</FormHelperText>
        ) : null}
      </FormControl>
    );
  }
}

Select.propTypes = {
  options: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  id: PropTypes.string,
  required: PropTypes.bool,
  validationError: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.any
};

export default Select;
