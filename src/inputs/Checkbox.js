import React from "react";
import PropTypes from "prop-types";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import MuiCheckbox from "@material-ui/core/Checkbox";

class Checkbox extends React.Component {
  render() {
    const {
      name,
      label,
      id,
      required,
      value,
      handleChange,
      classes,
      validationError,
      disabled
    } = this.props;

    return (
      <FormControl
        className={classes.formControl}
        error={!!validationError}
        required={required}
        disabled={disabled}
      >
        <FormGroup>
          <FormControlLabel
            control={
              <MuiCheckbox
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
  classes: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  id: PropTypes.string,
  required: PropTypes.bool,
  validationError: PropTypes.string,
  handleChange: PropTypes.func,
  value: PropTypes.any,
  disabled: PropTypes.bool
};

export default Checkbox;