import React from "react";
import { useController } from "react-hook-form";
import { Radio } from "@material-ui/core";
const RadioComponent = ({ name, control, customOnChange = () => {} }) => {
  const {
    field: { value, onChange },
  } = useController({ name, control });
  return (
    <Radio
      onClick={(e) => {
        customOnChange(value);
        onChange(!value);
      }}
      checked={value}
    />
  );
};

export default RadioComponent;
