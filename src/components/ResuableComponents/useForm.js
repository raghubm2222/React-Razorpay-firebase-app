import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      width: "90%",
      margin: "10px auto",
      display: "flex",
      justifyContent: "center",
    },
  },
}));

export function useForm(initialFieldValues) {
  const [values, setValues] = useState(initialFieldValues);

  const handelInptChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  return {
    values,
    setValues,
    handelInptChange,
  };
}

export function Form(props) {
  const classes = useStyle();
  return (
    <form className={classes.root} autoComplete="off">
      {props.children}
    </form>
  );
}
