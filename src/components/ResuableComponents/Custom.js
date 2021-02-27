import React from "react";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  Select,
  InputLabel,
  MenuItem,
} from "@material-ui/core";

export function CustomRadio(props) {
  const { name, label, value, items, onchange } = props;
  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <RadioGroup row name={name} value={value} onChange={onchange}>
        {items.map((item) => (
          <FormControlLabel
            key={item.id}
            value={item.id}
            control={<Radio />}
            label={item.title}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}

export function CustomSelect(props) {
  const { name, label, value, items, onchange } = props;
  return (
    <>
      <InputLabel>{label}</InputLabel>
      <FormControl style={{ width: "200px" }}>
        <Select name={name} value={value} onChange={onchange} label={label}>
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {items.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              {item.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
}
