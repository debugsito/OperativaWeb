import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useSelector, useDispatch } from "react-redux";
import { actions_Utils } from "../../../../store/actions";
import debounce from 'lodash/debounce'

export default function Asynchronous({ label, handleChange, name, ...restProps }) {
    const dispatch = useDispatch();
    const { districts } = useSelector(state => state?.utils)
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const [loading, setLoading] = React.useState(false)

    React.useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);

    React.useEffect(() => {
        dispatch(actions_Utils.getDistrictsByText({ text: "" }))
    }, [])

    React.useEffect(() => {
        if (districts.length > 1) {
            setLoading(false)
        }
    }, [districts])

    const debouncedLog = debounce(text => {
        dispatch(actions_Utils.getDistrictsByText({ text }))
    }, 500)

    const handleOnChange = (event, newValue) => {
        event.target.name = name
        if (newValue) {
            event.target.value = newValue.id
        } else {
            event.target.value = ""
        }
        handleChange(event)
        setLoading(false)
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
                    setLoading(false)
                }}
                getOptionSelected={(option, value) => option.id === value.id}
                getOptionLabel={(option) => option.name}
                options={districts}
                loading={loading}
                loadingText="Cargando..."
                noOptionsText="Sin opciones"
                onChange={(event, newValue) => handleOnChange(event, newValue)}
                onInputChange={(event, newInputValue) => {
                    setLoading(true)
                    debouncedLog(newInputValue)
                }}
                renderInput={(params) =>
                (
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
                )
                }
            />
        </>

    );
}
