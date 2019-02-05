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
    return (
      <Form
        values={this.state.user}
        onSubmit={value => {
          console.log("submit user", value);
          this.setState({ user: value });
        }}
      >
        <InputField type="text" name="name" label="Nom" />
        <InputField type="email" name="email" label="Email" />
        <Button variant="contained" size="small" color="primary" type="submit">
          Submit
        </Button>
      </Form>
    );
  }
}
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
