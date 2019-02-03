# mui-form

>

[![NPM](https://img.shields.io/npm/v/mui-form.svg)](https://www.npmjs.com/package/mui-form) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save mui-form
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
      email: "dupond@dupond"
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <Form
        value={this.state.user}
        onSubmit={value => {
          console.log("submit user", value);
          this.setState({ user: value });
        }}
        classes={classes}
      >
        <InputField type="text" name="name" label="Nom" />
        <InputField type="email" name="email" label="Email" />
        <Button
          variant="contained"
          size="small"
          color="primary"
          type="submit"
          className={classes.button}
        >
          Submit
        </Button>
      </Form>
    );
  }
}
```

## License

MIT © [doguh](https://github.com/doguh)
