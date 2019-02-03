import React, { Component } from "react";
import { Button } from "@material-ui/core";
import Form, { InputField } from "mui-form";

const fields = [
  {
    name: "name",
    type: "text",
    label: "Nom",
    placeholder: "Saisissez un nom",
    required: true,
    validate: value => {},
    defaultValue: ""
  },
  {
    name: "email",
    type: "email",
    label: "Email",
    placeholder: "Adresse mail",
    required: true,
    validate: value => {},
    defaultValue: "test@test"
  },
  {
    name: "lol",
    type: "text",
    label: "Lol",
    placeholder: "Placeholder",
    validate: value => {},
    defaultValue: "Mort de rire"
  },
  {
    name: "hehe",
    type: "text",
    label: "Hehehe",
    validate: value => {
      return "Pas bon";
    }
  }
];

export default class App extends Component {
  render() {
    return (
      <div>
        <Form
          value={{ name: "Dupond" }}
          onSubmit={value => {
            console.log("submit", value);
          }}
        >
          {fields.map(field => (
            <div key={field.name}>
              <InputField {...field} />
            </div>
          ))}
          <Button
            variant="contained"
            size="small"
            color="primary"
            type="submit"
          >
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}
