import React from "react";
import PropTypes from "prop-types";
import FormContext from "./FormContext";

class Form extends React.Component {
  _fields = {};

  getValues() {
    const values = {};
    Object.keys(this._fields).forEach(key => {
      const field = this._fields[key];
      values[field.props.name] = field.value;
    });
    return values;
  }

  getValidationErrors() {
    const errors = {};
    Object.keys(this._fields).forEach(key => {
      const field = this._fields[key];
      const errmsg = field.getValidationError();
      if (errmsg) {
        errors[field.props.name] = errmsg;
      }
    });
    return Object.keys(errors).length ? errors : null;
  }

  handleSubmit = event => {
    event.preventDefault();
    const values = this.getValues();
    const errors = this.getValidationErrors();
    if (this.props.onSubmit) {
      this.props.onSubmit(values, errors);
    }
  };

  handleChange = (name, newValue) => {
    if (this.props.onChange) {
      const values = this.getValues();
      this.props.onChange(values, name);
    }
  };

  render() {
    console.log("render form");
    const {
      classes,
      children,
      className,
      noNativeValidate,
      values,
      errors,
      onChange
    } = this.props;
    return (
      <FormContext.Provider
        value={{
          values,
          errors,
          classes,
          handleChange: onChange ? this.handleChange : null,
          formFields: this._fields
        }}
      >
        <form
          className={className || (classes && classes.form)}
          autoComplete="off"
          onSubmit={this.handleSubmit}
          noValidate={noNativeValidate}
        >
          {children}
        </form>
      </FormContext.Provider>
    );
  }

  componentWillUnmount() {
    this._fields = null;
  }
}

Form.propTypes = {
  children: PropTypes.array.isRequired,
  classes: PropTypes.object,
  className: PropTypes.string,
  values: PropTypes.object,
  errors: PropTypes.object,
  onSubmit: PropTypes.func,
  onChange: PropTypes.func,
  noNativeValidate: PropTypes.bool
};

export default Form;
