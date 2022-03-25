import React from 'react'
import { Controller } from "react-hook-form";
import CheckRadio from './Boostrap/CheckRadio';

export default function ControllerCheckRadio({ radioArr, name, control }) {


    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange, name }, fieldState: { error, invalid } }) => (
                <>
                    {
                        radioArr.map((radio, index) => (
                            <div key={index}>
                                <CheckRadio
                                    name={name}
                                    label={radio.label}
                                    id={`${name}-${index + 1}`}
                                    onChange={onChange}
                                    value={radio.value}
                                    isInvalid={!!invalid}
                                />
                            </div>
                        ))
                    }
                    {/* {
                        invalid &&
                        <div className="text-error" >
                            {error?.message}
                        </div>
                    } */}
                </>
            )}
        />
    )
}
