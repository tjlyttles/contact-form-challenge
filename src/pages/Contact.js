import React, { useState, Fragment } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import ContactMailIcon from "@material-ui/icons/ContactMail";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import axios from "axios";
import M from "materialize-css/dist/js/materialize.min.js";

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
    marginTop: theme.spacing(1)
  },
  formError: {
    color: "red"
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

const Contact = props => {
  const classes = useStyles();
  const [state, setState] = useState({
    name: "",
    email: "",
    content: ""
  });
  const [errors, setErrors] = useState({
    nameError: false,
    emailError: false,
    contentError: false,
    alert: ""
  });
  const { name, email, content } = state;
  const { nameError, emailError, contentError, alert } = errors;

  // Updates state change
  const handleChange = e => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    // Endpoint to lambda function
    const URL =
      "https://3ydusjobp4.execute-api.us-east-1.amazonaws.com/stage-submission/submit";

    // Error/validation checks
    let Namere = /[A-Za-z]{1}[A-Za-z]/;
    if (!Namere.test(name)) {
      setErrors({
        ...errors,
        nameError: true,
        contentError: false,
        emailError: false,
        alert: "Name can not be less than 2 characters"
      });
      return;
    }

    if (email === "") {
      setErrors({
        ...errors,
        emailError: true,
        nameError: false,
        contentError: false,
        alert: "Please add your email"
      });

      return;
    }

    if (content === "") {
      setErrors({
        ...errors,
        contentError: true,
        emailError: false,
        nameError: false,
        alert: "Please leave a message with us"
      });
      return;
    }

    var reeamil = /^([\w-]+@([\w-]+\.)+[\w-]{2,6})?$/;
    if (!reeamil.test(email)) {
      setErrors({
        ...errors,
        emailError: true,
        nameError: false,
        contentError: false,
        alert: "Please enter valid email address"
      });
      return;
    }
    // Store user info in data object
    var data = {
      name: name,
      email: email,
      content: content
    };
    // Post data to SES and saving message to dynamoDB
    axios
      .post(URL, JSON.stringify(data), {
        headers: {
          "content-type": "application/json; charset=UTF-8"
        }
      })
      .then(res => {
        setErrors({
          ...errors,
          alert: ""
        });
        document.getElementById("contact-form").reset();
        M.toast({ html: "Email was sent!" });
      })
      .catch(err => {
        console.log("Error: ", err);
        M.toast({ html: "Hmm.. an error occured" });
      });
  };
  if (!props.auth.isAuthenticated && !props.auth.user) {
    return (
      <div className={classes.paper}>
        <Typography component="h1" variant="h3" mt={3}>
          {"Send Me A Message"}
        </Typography>
        <Typography component="h3" variant="h5">
          {"Sign up to use our contact form."}
        </Typography>

        <Button
          href="/register"
          type="button"
          color="primary"
          variant="contained"
        >
          Register
        </Button>

        <Typography component="h3" variant="h5">
          {"Already have an account?"}
        </Typography>

        <Button href="/signin" color="primary" variant="contained">
          Sign In
        </Button>
        <Box mt={8}>
        <Copyright />
      </Box>
      </div>
    );
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />

      <Fragment>
        <Typography component="h1" variant="h5">
          Welcome {props.auth.user.username}
        </Typography>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <ContactMailIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Contact Us
          </Typography>
          <form
            className={`${classes.form} contact-form`}
            id="contact-form"
            noValidate
            onSubmit={handleSubmit}
          >
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="name"
              label="Name"
              type="name"
              id="name"
              onChange={handleChange}
            />
            {nameError && (
              <small className={classes.formError}> {alert} </small>
            )}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={handleChange}
            />
            {emailError && (
              <small className={classes.formError}> {alert}</small>
            )}
            <TextField
              variant="outlined"
              margin="normal"
              id="content"
              label="How can we help you?"
              name="content"
              multiline
              fullWidth
              required
              rows="4"
              onChange={handleChange}
            />
            {contentError && (
              <small margin="normal" className={classes.formError}>
                {" "}
                {alert}
              </small>
            )}
            <br />
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              className={classes.submit}
            >
              Submit
            </Button>
          </form>
        </div>
      </Fragment>

      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default Contact;
