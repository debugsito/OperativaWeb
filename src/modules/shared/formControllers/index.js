import React from "react";
import TextInput from "./TextInput";
import Select from "./Select";
import RadioButtonsGroup from "./RadioButtons";
import Radio from "./Radio";
import Checkbox from "./Checkbox";
const FormController = ({ type, ...rest }) => {
  switch (type) {
    case "input":
      return <TextInput {...rest} />;
    case "select":
      return <Select {...rest} />;
    case "radio":
      return <Radio {...rest} />;
    case "radioButtons":
      return <RadioButtonsGroup {...rest} />;
    case "checkbox":
      return <Checkbox {...rest} />;
    default:
      return null;
  }
};

export default FormController;
