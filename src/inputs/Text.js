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
      onChange,
      classes,
      validationError
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
        onChange={onChange}
        value={value}
        error={!!validationError}
        helperText={validationError}
        margin="normal"
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
  onChange: PropTypes.func,
  value: PropTypes.any
};

export default Text;
