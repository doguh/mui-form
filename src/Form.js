import React from "react";
import PropTypes from "prop-types";
import FormContext from "./FormContext";
import findValue from "./helpers/findValue";

class Form extends React.Component {
  state = {
    values: {},
    errors: null
  };

  _fields = {};

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.values !== prevState.propsValues ||
      nextProps.errors !== prevState.propsErrors
    ) {
      const state = {};
      if (nextProps.values !== prevState.propsValues) {
        state.values = { ...nextProps.values };
        state.propsValues = nextProps.values;
      }
      if (nextProps.errors !== prevState.propsErrors) {
        state.errors = { ...nextProps.errors };
        state.propsErrors = nextProps.errors;
      }
      return state;
    }
    return null;
  }

  componentWillUnmount() {
    this._fields = null;
  }

  getValues() {
    const values = {};
    Object.keys(this._fields).forEach(key => {
      const field = this._fields[key].props;
      values[field.name] =
        this.state.values[field.name] !== undefined
          ? this.state.values[field.name]
          : field.defaultValue;
    });
    return values;
  }

  handleSubmit = event => {
    event.preventDefault();
    const errors = {};
    const values = {};
    Object.keys(this._fields).forEach(key => {
      const field = this._fields[key].props;
      values[field.name] =
        this.state.values[field.name] !== undefined
          ? this.state.values[field.name]
          : field.defaultValue;
      // TODO maybe add some validations here if noNativeValidate is true
      if (
        !field.disabled &&
        field.validate &&
        (values[field.name] || field.required)
      ) {
        const errmsg = Array.isArray(field.validate)
          ? findValue(field.validate, fn => fn(values[field.name]))
          : field.validate(values[field.name]);
        if (errmsg) {
          errors[field.name] = errmsg;
        }
      }
    });
    this.setState({ errors });
    if (this.props.onSubmit) {
      this.props.onSubmit(
        values,
        Object.keys(errors).length > 0 ? errors : null
      );
    }
  };

  handleChange = name => newValue => {
    const values = { ...this.state.values, [name]: newValue };
    this.setState({ values });
    if (this.props.onChange) {
      const allValues = this.getValues();
      allValues[name] = newValue;
      this.props.onChange(allValues, name);
    }
  };

  render() {
    const { classes, children, className, noNativeValidate } = this.props;
    return (
      <FormContext.Provider
        value={{
          values: this.state.values,
          errors: this.state.errors,
          classes,
          handleChange: this.handleChange,
          fields: this._fields
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
