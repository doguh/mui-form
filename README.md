# mui-form

>

[![NPM](https://img.shields.io/npm/v/mui-form.svg)](https://www.npmjs.com/package/@doguh/mui-form) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

Simplifies (hopefully) the creation of forms with React / Material-UI.

## Install

```bash
npm install --save @doguh/mui-form
```

Make sure to install `material-ui` as it is required as a peer dependency.

```bash
npm install --save @material-ui/core
```

## Usage

```jsx
import React, { Component } from "react";
import { Button } from "@material-ui/core";
import Form, { InputField } from "mui-form";

class Example extends Component {
  state = {
    user: {
      name: "Dupond",
      email: "dupond@dupond",
      active: true
    }
  };

  render() {
    return (
      <Form
        values={this.state.user}
        onSubmit={value => {
          console.log("submit user", value);
          this.setState({ user: value });
        }}
      >
        <InputField type="text" name="name" label="Username" />
        <InputField type="email" name="email" label="Email address" />
        <InputField type="checkbox" name="active" label="Active?" />
        <Button variant="contained" size="small" color="primary" type="submit">
          Submit
        </Button>
      </Form>
    );
  }
}
```

## Documentation

This module exposes 2 components: `Form` and `InputField`.

### Form

```js
<Form
  /**
   * values: object
   * each key of the values object should match with the name property
   * of one InputField contained in this Form
   */
  values={this.state.values}
  /**
   * errors: object
   * each key of the errors object can match with an InputField
   * and display an error message next to that field
   *
   * Example:
   * { name: "At least 3 chars" }
   */
  errors={this.state.errors}
  /**
   * onSubmit: function
   * called when the form is submitted, it accepts 2 arguments, values and errors
   */
  onSubmit={(values, errors) => {
    if (errors) {
      console.log("validation errors", errors);
    }
    this.setState({ values, errors });
  }}
  /**
   * onChange: function
   * called when any InputField's value is changed,
   * it accepts 2 arguments, values and changedPropName
   */
  onChange={(values, changedPropName) => {
    console.log(
      `"${changedPropName}" has changed to "${values[changedPropName]}"`
    );
  }}
  /**
   * classes: object
   */
  classes={{}}
  /**
   * className: string
   * class applied to the underlying <form> element
   */
  className=""
  /**
   * noNativeValidate: boolean
   * if true, prevent the browser from doing validation stuffs like
   * checking if required fields are filled
   */
  noNativeValidate
/>
```

### InputField

```js
<InputType
  /**
   * type: string (required)
   * can be: text|email|number|select|checkbox|date|time
   */
  type="text"
  /**
   * name: string (required)
   * name is unique: two InputFields in the same Form should not share the same name
   *
   * the value of an InputField is determined by its name and the values prop
   * passed to its Form container
   */
  name="username"
  /**
   * label: string
   */
  label="Username"
  /**
   * placeholder: string
   */
  placeholder="Enter your username"
  /**
   * validate: function|array<function>
   * a function, or a list of function, called when the form is submitted,
   * it takes the value of the InputField as it's unique parameter
   * and should return an error message (string) or falsy if the validation passes
   */
  validate={value => {
    if (value && values.length < 3) {
      return "At least 3 chars";
    }
  }}
  /**
   * defaultValue: any
   * default value for this InputField
   */
  defaultValue=""
  /**
   * id: string
   */
  id="input-username"
  /**
   * required: boolean
   */
  required
  /**
   * disabled: boolean
   */
  disabled={false}
  /**
   * className: string
   * class applied to the underlying material-ui element
   */
  className=""
  /**
   * component: Component|function
   * allow usage of custom components
   */
  component={props => <MyCustomComponent {...props} />}
/>
```

## Development

Run the following commands once to install the dependencies:

```sh
npm link # will to an npm install too
cd example
npm link mui-form
npm i
```

Local development is broken into two parts (ideally using two tabs).

First, run rollup to watch your `src/` module and automatically recompile it into `dist/` whenever you make changes.

```bash
npm start # runs rollup with watch flag
```

The second part will be running the `example/` create-react-app that's linked to the local version of your module.

```bash
# (in another tab)
cd example
npm start # runs create-react-app dev server
```

Now, anytime you make a change to your library in `src/` or to the example app's `example/src`, `create-react-app` will live-reload your local dev server so you can iterate on your component in real-time.

## License

MIT © [doguh](https://github.com/doguh)
