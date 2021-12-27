import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@material-ui/core';
import * as React from 'react';
import { useController } from 'react-hook-form';

export default function RadioButtonsGroup({name,control, title, items}) {
    const {
        field,
        fieldState: {error}
      } = useController({name, control});
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">{title}</FormLabel>
      <RadioGroup
        aria-label=""
        defaultValue=""
        {...field}
      >
          {
                items.map((item,index) => (
                    <FormControlLabel key={index} value={item.value} control={<Radio />} label={item.label} />
                ))
          }
        
        <FormControlLabel value="male" control={<Radio />} label="Male" />
        <FormControlLabel value="other" control={<Radio />} label="Other" />
      </RadioGroup>
    </FormControl>
  );
}
