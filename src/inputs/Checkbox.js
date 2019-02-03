import React from "react";
import PropTypes from "prop-types";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import MuiCheckbox from "@material-ui/core/Checkbox";
import Switch from "@material-ui/core/Switch";

class Checkbox extends React.Component {
  render() {
    const {
      type,
      name,
      label,
      id,
      required,
      value,
      handleChange,
      classes,
      className,
      validationError,
      disabled
    } = this.props;
    const CheckboxComponent = type === "switch" ? Switch : MuiCheckbox;
    return (
      <FormControl
        className={className || (classes && classes.formControl)}
        error={!!validationError}
        required={required}
        disabled={disabled}
      >
        <FormGroup>
          <FormControlLabel
            control={
              <CheckboxComponent
                id={id}
                name={name}
                checked={value}
                onChange={event => handleChange(event.target.checked)}
              />
            }
            label={label}
          />
        </FormGroup>
        {validationError ? (
          <FormHelperText>{validationError}</FormHelperText>
        ) : null}
      </FormControl>
    );
  }
}

Checkbox.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  classes: PropTypes.object,
  className: PropTypes.string,
  label: PropTypes.string,
  id: PropTypes.string,
  required: PropTypes.bool,
  validationError: PropTypes.string,
  handleChange: PropTypes.func,
  value: PropTypes.any,
  disabled: PropTypes.bool
};

export default Checkbox;
