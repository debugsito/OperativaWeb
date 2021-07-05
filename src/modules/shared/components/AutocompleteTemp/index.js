import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useSelector, useDispatch } from "react-redux";
import { actions_Utils } from "../../../../store/actions";
import debounce from 'lodash/debounce'

//value = {id:12354, name: "Leoncio prado"}
export default function Asynchronous({ value, label, handleChange, name, ...restProps }) {
    const dispatch = useDispatch();
    const { districts } = useSelector(state => state?.utils)
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false)
    // const [val, setVal] = React.useState(null)
    const [inputValue, setInputValue] = React.useState("");

    React.useEffect(() => {
        dispatch(actions_Utils.getDistrictsByText({ text: value?.name ? value.name : "" }));
        setLoading(false)
    }, [])

    // React.useEffect(() => {
    //     if (value) {
    //         console.log("autocomplete", value)
    //         //Si existe mas de 2 distritos con el mismo nombre, pero tienen diferente ID. Selecciono el que tenga el mismo ID
    //         const district_temp = districts?.find((element) => element.id === value.id)
    //         setVal(district_temp)
    //     }
    // }, [value])

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
        event.target.type = "autocomplete"
        if (newValue) {
            event.target.valueTemp = { ...newValue }
        } else {
            event.target.valueTemp = ""
        }
        handleChange(event)
        setLoading(false)
    }

    return (
        <>
            <Autocomplete
                id="asynchronous-demo"
                loadingText="Cargando..."
                noOptionsText="Sin opciones"
                open={open}
                value={value}
                inputValue={inputValue}
                loading={loading}
                options={districts}
                onOpen={() => { setOpen(true) }}
                onClose={() => {
                    setOpen(false);
                    setLoading(false)
                }}
                getOptionSelected={(option, value) => option?.id === value?.id}
                getOptionLabel={(option) => option.name}
                onChange={(event, newValue) => handleOnChange(event, newValue)}
                onInputChange={(event, newInputValue) => {
                    console.log("input", newInputValue);
                    setLoading(true)
                    setInputValue(newInputValue)
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
