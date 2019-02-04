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

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        name: "Dupond",
        email: "dupond@dupond",
        birthday: "1990-10-09",
        lunchTime: "14:00"
      },
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
          classes={classes}
          error={error}
          onChange={(value, name) => {
            console.log("change", name, value);
            this.setState({ user: value });
          }}
          onSubmit={(value, error) => {
            console.log("submit", value, error);
            this.setState({
              user: value,
              error
            });
          }}
        >
          <div>
            <InputField type="text" name="name" label="Nom" required />
          </div>
          <div>
            <InputField type="email" name="email" label="E-mail" required />
          </div>
          <div>
            <InputField
              type="date"
              name="birthday"
              label="Date de naissance"
              required
            />
          </div>
          <div>
            <InputField
              type="time"
              name="lunchTime"
              label="L'heure de manger"
              required
              validate={value =>
                !value || value < "14:00" ? "Trop tôt !" : null
              }
            />
          </div>
          <div>
            <InputField
              type="select"
              name="level"
              label="Niveau"
              options={[
                { value: "0", label: "Crook" },
                { value: "100", label: "Boss" }
              ]}
            />
          </div>
          {this.state.user.level === "100" ? (
            <div>
              <div>
                <InputField
                  type="switch"
                  name="hasPower"
                  label="Dispose d'un super pouvoir"
                />
              </div>
              {this.state.user.hasPower ? (
                <div>
                  <InputField
                    type="text"
                    name="power"
                    label="Super pouvoir"
                    required
                  />
                </div>
              ) : null}
            </div>
          ) : null}
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
