import React, { useState } from "react";
import GTranslateIcon from "@material-ui/icons/GTranslate";

import {
  Button,
  Card,
  CircularProgress,
  Container,
  IconButton,
  TextField,
} from "@material-ui/core";
import { useAuth } from "../../Context/AuthContext";
import { Link } from "react-router-dom";

const initialValues = {
  email: "",
  password: "",
};
const initialErrors = {
  emailError: "",
  passwordError: "",
};

export default function Login() {
  const [values, setValues] = useState(initialValues);
  const [error, setErrors] = useState(initialErrors);
  const [loginerror, setloginError] = useState();
  const [loading, setLoading] = useState(false);
  const { loginwithemail, googlesignup } = useAuth();

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  function loginWithEmail() {
    setLoading(true);
    const isValid = validate();
    if (isValid) {
      try {
        loginwithemail(values.email, values.password).then((_) => {
          setLoading(false);
        });
      } catch (e) {
        setloginError(e);
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }

  const validate = () => {
    let isEmailValid = true;
    let isPasswordValid = true;
    let err = { ...error };
    var letter = /[a-zA-Z]/;
    var number = /[0-9]/;
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (values.email === "") {
      err.emailError = "Email is Required";
      isEmailValid = false;
    } else if (!re.test(values.email)) {
      err.emailError = "Email is Not valid";
      isEmailValid = false;
    } else {
      err.emailError = "";
      isEmailValid = true;
    }
    if (values.password === "") {
      err.passwordError = "Password is Required";
      isPasswordValid = false;
    } else if (values.password < 5) {
      err.passwordError = "Password Must be 6 or more";
      isPasswordValid = false;
    } else if (
      !(letter.test(values.password) && number.test(values.password))
    ) {
      err.passwordError = "Password must Alphanumeric";
      isPasswordValid = false;
    } else {
      err.passwordError = "";
      isPasswordValid = true;
    }
    setErrors({ ...err });
    return isEmailValid && isPasswordValid;
  };

  return (
    <Container style={{ display: "flex", justifyContent: "center" }}>
      <Card
        style={{
          border: "1px solid #eeee",
          width: "85%",
          maxWidth: "500px",
          margin: "5% auto",
          padding: "10px",
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h2 style={{ textAlign: "center" }}>LOGIN</h2>
        {loginerror && (
          <p
            style={{
              color: "red",
              backgroundColor: " rgb(236, 103, 103)",
              padding: "5px",
            }}
          >
            {loginerror.message}
          </p>
        )}
        <TextField
          error={error.emailError.length !== 0}
          helperText={error.emailError}
          style={{ width: "100%", margin: "10px auto" }}
          value={values.email}
          onChange={onChangeHandler}
          variant="outlined"
          label="Email"
          name="email"
          type="email"
          placeholder="something@gmail.com"
        />
        <TextField
          error={error.passwordError.length !== 0}
          helperText={error.passwordError}
          style={{ width: "100%", margin: "10px auto" }}
          value={values.password}
          onChange={onChangeHandler}
          variant="outlined"
          label="Password"
          name="password"
          type="password"
        />
        {loading ? (
          <div style={{ margin: "15px auto 0 auto" }}>
            <CircularProgress />
          </div>
        ) : (
          <Button
            onClick={loginWithEmail}
            variant="contained"
            color="primary"
            style={{ width: "200px", margin: "15px auto 0 auto" }}
          >
            LOGIN
          </Button>
        )}

        <p style={{ textAlign: "center" }}>
          Need Account?
          <Link to="/signup" style={{ textDecoration: "none" }}>
            SIGNUP
          </Link>
        </p>
        <p style={{ textAlign: "center" }}>Sign in With</p>
        <IconButton
          onClick={() => {
            googlesignup();
          }}
          style={{
            margin: "0 auto",
            border: "1px solid #cccc",
            borderRadius: "100%",
          }}
        >
          <GTranslateIcon />
        </IconButton>
      </Card>
    </Container>
  );
}
