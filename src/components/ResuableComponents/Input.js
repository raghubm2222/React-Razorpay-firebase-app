import React from "react";
import { TextField } from "@material-ui/core";

export default function Input(props) {
  const { name, label, value, onchange, ...prop } = props;
  return (
    <TextField
      autoComplete="off"
      variant="outlined"
      label={label}
      name={name}
      onChange={onchange}
      value={value}
      {...prop}
    />
  );
}
