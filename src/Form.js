import React from "react";
import PropTypes from "prop-types";
import FormContext from "./FormContext";

const _propsValue = Symbol("value");

class Form extends React.Component {
  state = {
    values: null,
    errors: null
  };

  _fields = {};

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.value !== prevState[_propsValue]) {
      return { values: { ...nextProps.value }, [_propsValue]: nextProps.value };
    } else return null;
  }

  handleSubmit = event => {
    event.preventDefault();
    const errors = {};
    const values = {};
    Object.keys(this._fields).forEach(key => {
      const field = this._fields[key];
      values[field.name] =
        this.state.values[field.name] !== undefined
          ? this.state.values[field.name]
          : field.defaultValue;
      if (field.validate && (values[field.name] || field.required)) {
        const errmsg = field.validate(values[field.name]);
        if (errmsg) {
          errors[field.name] = errmsg;
        }
      }
    });
    this.setState({ errors });
    if (Object.keys(errors).length === 0 && this.props.onSubmit) {
      this.props.onSubmit(values);
    }
  };

  handleChange = name => event => {
    const values = { ...this.state.values, [name]: event.target.value };
    this.setState({ values });
  };

  render() {
    const { classes, children } = this.props;
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
          className={classes.form}
          autoComplete="off"
          onSubmit={this.handleSubmit}
        >
          {children}
        </form>
      </FormContext.Provider>
    );
  }
}

Form.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.array.isRequired,
  value: PropTypes.object,
  onSubmit: PropTypes.func
};

export default Form;
