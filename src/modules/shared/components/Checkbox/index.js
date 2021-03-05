import React from 'react';

import './index.css'
import { Checkbox, FormControlLabel } from '@material-ui/core';

export default function CustomCheckbox({ label, ...props }) {
    return (
        <FormControlLabel
            control={
                <Checkbox
                    {...props}
                />
            }
            label={label}
        />
    );
};


