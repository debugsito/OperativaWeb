import React from "react";

// import './index.css'
import { withStyles } from "@material-ui/styles";
import { Checkbox, FormControlLabel } from "@material-ui/core";
import { useController, useFormContext } from "react-hook-form";

const StyleCheckbox = withStyles({
  root: {
    color: "#fff",
  },
})(Checkbox);

export default function CustomCheckbox({ label, name, ...props }) {
  const { control } = useFormContext();
  const {
    field: { value, onChange },
  } = useController({ name, control });
  return (
    <FormControlLabel
      control={<StyleCheckbox {...props} />}
      label={label}
      value={value}
      onClick={(e) => onChange(e.target.checked)}
    />
  );
}
