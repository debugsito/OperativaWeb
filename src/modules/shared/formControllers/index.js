import React from "react";
import TextInput from "./TextInput";
import Select from "./Select";
import RadioButtonsGroup from "./RadioButtons";
import Radio from "./Radio";
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
  }
};

export default FormController;
