import React, { useState } from "react";
import { withRouter } from "react-router";
import FormErrors from "../FormErrors";
import Validate from "../utility/FormValidation";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Auth } from "aws-amplify";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        ContactForm
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

const Register = () => {
  const classes = useStyles();
  const [state, setState] = useState({
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
    errors: {
      cognito: null,
      blankfield: false,
      passwordmatch: false
    }
  });

  const clearErrorState = () => {
    setState({
      ...state,
      errors: {
        cognito: null,
        blankfield: false,
        passwordmatch: false
      }
    });
  };

  const handleSubmit = async event => {
    event.preventDefault();

    // Form validation
    clearErrorState();
    const error = Validate(event, state);
    if (error) {
      setState({ ...state, errors: error });
    }

    // AWS Cognito integration here
    const { username, email, password } = state;
    try {
      const signUpResponse = await Auth.signUp({
        username,
        password,
        attributes: { email: email }
      });
      console.log(signUpResponse);
      this.props.history.push("/");
    } catch (error) {
      let err = null;
      !error.message ? (err = { message: error }) : (err = error);
      setState({
        ...state,
        errors: {
          cognito: err
        }
      });
    }
  };

  const onInputChange = event => {
    setState({ ...state, [event.target.id]: event.target.value });
    document.getElementById(event.target.id).classList.remove("is-danger");
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <FormErrors formerrors={state.errors} />
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                type="text"
                id="username"
                aria-describedby="userNameHelp"
                placeholder="Enter username"
                value={state.username}
                onChange={onInputChange}
                variant="outlined"
                required
                fullWidth
                label="Enter a Username"
                autoFocus
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                aria-describedby="emailHelp"
                value={state.email}
                onChange={onInputChange}
                variant="outlined"
                required
                fullWidth
                id="email"
                type="email"
                label="Email Address"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="password"
                value={state.password}
                onChange={onInputChange}
                variant="outlined"
                required
                fullWidth
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="confirmpassword"
                placeholder="Confirm password"
                value={state.confirmpassword}
                onChange={onInputChange}
                variant="outlined"
                required
                fullWidth
                label="Confirm password"
                type="password"
                autoComplete="current-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/signin" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default withRouter(Register);
