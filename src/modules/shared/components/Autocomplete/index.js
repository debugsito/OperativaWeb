// *https://www.registers.service.gov.uk/registers/country/use-the-api*
// import fetch from 'cross-fetch';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useSelector, useDispatch } from "react-redux";
import { actions_Utils } from "../../../../store/actions";
import debounce from 'lodash/debounce'

function sleep(delay = 0) {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
}

export default function Asynchronous({ label, handleChange, name, ...restProps }) {
    const dispatch = useDispatch();
    const { districts } = useSelector(state => state?.utils)
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const loading = open && options.length === 0;

    React.useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);

    React.useEffect(() => {
        dispatch(actions_Utils.getDistrictsByText({ text: "" }))
    }, [])

    const debouncedLog = debounce(text => dispatch(actions_Utils.getDistrictsByText({ text })), 500)

    const handleOnChange = (event, newValue) => {
        event.target.name = name
        if (newValue) {
            event.target.value = newValue.id
        } else {
            event.target.value = ""
        }
        handleChange(event)
    }

    return (
        <>
            <Autocomplete
                id="asynchronous-demo"
                open={open}
                onOpen={() => {
                    setOpen(true);
                }}
                onClose={() => {
                    setOpen(false);
                }}
                getOptionSelected={(option, value) => option.id === value.id}
                getOptionLabel={(option) => option.name}
                options={districts}
                loading={loading}
                onChange={(event, newValue) => handleOnChange(event, newValue)}
                onInputChange={(event, newInputValue) => {
                    debouncedLog(newInputValue)
                }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label={label}
                        variant="outlined"
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <React.Fragment>
                                    {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                    {params.InputProps.endAdornment}
                                </React.Fragment>
                            ),
                        }}
                        {...restProps}
                    />
                )}
            />
        </>

    );
}
