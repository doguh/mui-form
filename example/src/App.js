import React, { Component } from "react";
import { Button, withStyles } from "@material-ui/core";
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
      }
    };
  }

  render() {
    const { classes } = this.props;
    const { user, errors } = this.state;
    return (
      <div>
        <Form
          values={user}
          classes={classes}
          errors={errors}
          onChange={(values, propName) => {
            console.log("change", propName, values);
            this.setState({ user: values });
          }}
          onSubmit={(values, errors) => {
            console.log("submit", values, errors);
            this.setState({
              user: values,
              errors
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
              type="number"
              name="age"
              label="Age"
              placeholder="N'ai pas honte"
            />
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
