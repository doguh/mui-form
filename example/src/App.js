import React, { Component } from "react";
import {
  Button,
  withStyles,
  FormControl,
  InputLabel,
  NativeSelect,
  FormHelperText,
  Input
} from "@material-ui/core";
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
      value && value.length >= 3 ? null : "Doit contenir au moins 3 caractères",
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
    name: "active",
    type: "switch",
    label: "Activer le super power"
  },
  {
    name: "active2",
    type: "switch",
    label: "Activer le super mega power"
  },
  {
    name: "date",
    type: "date",
    label: "Date de naissance",
    required: true,
    validate: value => (value > "2020-01-01" ? "Trop tard" : null)
  },
  {
    name: "time",
    type: "time",
    label: "Quelle heure est-il ?"
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
  constructor(props) {
    super(props);
    this.state = {
      user: { name: "Dupond", custom: "456" },
      error: { password: "Saisissez un mdp wesh" }
    };
  }

  render() {
    const { classes } = this.props;
    const { user, error } = this.state;
    return (
      <div>
        <Form
          value={user}
          onSubmit={(value, error) => {
            console.log("submit", value, error);
            this.setState({
              user: value,
              error
            });
          }}
          classes={classes}
          error={error}
          onChange={(value, name) => {
            console.log("change", name, value);
            if (name === "active2" && value.active2) {
              value.active = false;
            } else if (name === "active" && value.active) {
              value.active2 = false;
            }
            this.setState({ user: value });
          }}
        >
          {fields.map(field => (
            <div key={field.name}>
              <InputField {...field} />
            </div>
          ))}
          <div>
            {this.state.user.active2 ? (
              <div>
                <InputField type="text" name="superpower" />
              </div>
            ) : null}
            <InputField
              type="date"
              name="date2"
              className={classes.date}
              disabled={this.state.user.active}
            />
            <InputField
              type="time"
              name="time2"
              className={classes.date}
              disabled={this.state.user.active}
            />
            <div>
              <InputField
                type="custom"
                name="custom"
                options={[
                  {
                    label: "",
                    value: ""
                  },
                  {
                    label: "123",
                    value: "123"
                  },
                  {
                    label: "456",
                    value: "456"
                  }
                ]}
                component={props => {
                  const {
                    value,
                    handleChange,
                    validationError,
                    options
                  } = props;
                  return (
                    <FormControl
                      className={classes.formControl}
                      error={!!validationError}
                    >
                      <InputLabel htmlFor="uncontrolled-native">
                        Name
                      </InputLabel>
                      <NativeSelect
                        value={value}
                        onChange={event => handleChange(event.target.value)}
                        input={<Input name="name" id="uncontrolled-native" />}
                      >
                        {options.map(({ label, value }) => (
                          <option key={value} value={value}>
                            {label}
                          </option>
                        ))}
                      </NativeSelect>
                      {validationError ? (
                        <FormHelperText>{validationError}</FormHelperText>
                      ) : null}
                    </FormControl>
                  );
                }}
                validate={value => (!value ? "Selectionne un truc" : null)}
                required={true}
              />
            </div>
          </div>
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
