import React, { Component } from "react";
import { Button, withStyles } from "@material-ui/core";
import Form, { InputField } from "mui-form";
import styles from "./styles";

const fields = [
  {
    name: "name",
    type: "text",
    label: "Nom",
    placeholder: "Saisissez un nom",
    required: true,
    validate: value =>
      value && value.length > 3 ? null : "Doit contenir au moins 3 caractères",
    defaultValue: ""
  },
  {
    name: "email",
    type: "email",
    label: "Email",
    placeholder: "Adresse mail",
    required: true,
    defaultValue: "test@test"
  },
  {
    name: "fruit",
    type: "select",
    label: "Fruit préféré",
    placeholder: "C'est quoi ??",
    options: [
      {
        label: <em>Aucun</em>,
        value: ""
      },
      {
        label: "Banane",
        value: "banana"
      },
      {
        label: "Pomme",
        value: "apple"
      }
    ],
    validate: value => (value !== "banana" ? "Non, banane ou rien" : null)
  },
  {
    name: "password",
    type: "password",
    label: "Mot de passe",
    placeholder: "Adresse mail",
    required: true,
    validate: value =>
      value && value.length >= 6 ? null : "Doit contenir au moins 6 caractères"
  },
  {
    name: "infos",
    type: "text",
    label: "Infos",
    disabled: true
  },
  {
    name: "accept",
    type: "checkbox",
    label: "J'accepte de me faire spamer",
    required: true,
    validate: value => (value ? "Faut pas accepter" : null),
    defaultValue: true
  }
];

class App extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Form
          value={{ name: "Dupond" }}
          onSubmit={value => {
            console.log("submit", value);
          }}
          classes={classes}
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
            className={classes.button}
          >
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}

export default withStyles(styles)(App);
