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
  confirmpassword: "",
  refferalcode: "",
};
const initialErrors = {
  emailError: "",
  passwordError: "",
  confirmpasswordError: "",
  refferalcodeError: "",
};

export default function Signup(props) {
  const [values, setValues] = useState(initialValues);
  const [error, setErrors] = useState(initialErrors);
  const [signinerror, setSigninerror] = useState();
  const [loading, setLoading] = useState(false);
  const { signupwithemail, googlesignup } = useAuth();
  const refferedby = props.history.location.search.slice(9);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  function signupWithEmail() {
    setLoading(true);
    const isValid = validate();
    if (isValid) {
      try {
        signupwithemail(
          values.email,
          values.password,
          refferedby ? refferedby : values.refferalcode
        ).then((_) => {
          setLoading(false);
        });
      } catch (e) {
        setSigninerror(e);
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }

  const validate = () => {
    let isEmailValid = true;
    let isPasswordValid = true;
    let isConfirmPasswordValid = true;
    let isrefferedisValid = true;
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
    if (values.password === values.confirmpassword && values.password !== "") {
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
      if (values.confirmpassword === "") {
        err.confirmpasswordError = "Confirm Password is Required";
        isConfirmPasswordValid = false;
      } else if (values.confirmpassword < 5) {
        err.confirmpasswordError = "Confirm Password Must be 6 or more";
        isConfirmPasswordValid = false;
      } else if (
        !(
          letter.test(values.confirmpassword) &&
          number.test(values.confirmpassword)
        )
      ) {
        err.confirmpasswordError = "Confirm Password must Alphanumeric";
        isConfirmPasswordValid = false;
      } else {
        err.passwordError = "";
        isConfirmPasswordValid = true;
      }
    } else {
      err.passwordError = "Password is did't Macth";
      err.confirmpasswordError = "Password is did't Macth";
    }
    if (values.refferalcode.length === 0) {
      err.refferalcodeError = "";
      isrefferedisValid = true;
    } else if (values.refferalcode.length !== 6) {
      err.refferalcodeError = "Refferal Code must be 6 characters";
      isrefferedisValid = false;
    }
    setErrors({ ...err });
    return (
      isEmailValid &&
      isPasswordValid &&
      isConfirmPasswordValid &&
      isrefferedisValid
    );
  };

  return (
    <Container style={{ display: "flex", justifyContent: "center" }}>
      <Card
        style={{
          border: "1px solid #eeee",
          width: "85%",
          maxWidth: "500px",
          margin: "10px auto",
          padding: "10px",
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h2 style={{ textAlign: "center" }}>SIGNUP</h2>
        {signinerror && (
          <p
            style={{
              color: "red",
              backgroundColor: " rgb(236, 103, 103)",
              padding: "5px",
            }}
          >
            {signinerror.message}
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
        <TextField
          error={error.confirmpasswordError.length !== 0}
          helperText={error.confirmpasswordError}
          style={{ width: "100%", margin: "10px auto" }}
          value={values.confirmpassword}
          onChange={onChangeHandler}
          variant="outlined"
          label="Confirm Password"
          name="confirmpassword"
          type="password"
        />
        {refferedby ? (
          <strong style={{ textAlign: "center" }}>{refferedby}</strong>
        ) : (
          <TextField
            error={error.refferalcodeError.length !== 0}
            helperText={error.refferalcodeError}
            style={{ width: "100%", margin: "10px auto" }}
            value={values.refferalcode}
            onChange={onChangeHandler}
            variant="outlined"
            label="Refferal Code"
            name="refferalcode"
            type="text"
          />
        )}
        {loading ? (
          <div style={{ margin: "15px auto 0 auto" }}>
            <CircularProgress />
          </div>
        ) : (
          <Button
            onClick={signupWithEmail}
            variant="contained"
            color="primary"
            style={{ width: "200px", margin: "15px auto 0 auto" }}
          >
            SIGNUP
          </Button>
        )}

        <p style={{ textAlign: "center" }}>
          Already have Account?
          <Link to="/login" style={{ textDecoration: "none" }}>
            LOGIN
          </Link>
        </p>
        <p style={{ textAlign: "center" }}>Sign in With</p>
        <IconButton
          onClick={() => {
            googlesignup(refferedby ? refferedby : values.refferalcode);
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
