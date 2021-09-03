import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";

//Components
import Chips from "./Chips";
import ButtonGroup from "./ButtonGroup";
import SearchIcon from '@material-ui/icons/Search';
import { IconButton, Grid, makeStyles } from "@material-ui/core";
import { TextInput } from "../../../shared/components";

//REDUX
import { setQuery } from "../../../../store/actions/admin/admin.action";
import { getUsers } from "../../../../store/actions/admin/admin.midleware";

const options = [{ key: "last_name", value: 'Apellido' }, { key: "first_name", value: 'Nombre' }, { key: "role", value: 'Rol' }, { key: "document_number", value: 'Dni' }];
const MESSAGE = ["Ingrese apellido", "Ingrese nombre", "Municipalidad, Empresa o Administrador", "Ingrese DNI"]

const useStyles = makeStyles((theme) => ({
    rootIconButton: {
        borderRadius: "5px !important",
        border: "1px solid rgba(0, 0, 0, 0.24)",
        padding: "10px",
    },
}));

export default function SearchForm() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { usersTable } = useSelector(state => state?.admin)
    const [selectedIndex, setSelectedIndex] = React.useState(0); //ButtonGroup
    const [text, setText] = useState("")
    const [chipData, setChipData] = React.useState([])

    useEffect(() => {
        if (chipData.length > 0) {
            const query = getUrl()
            dispatch(getUsers(query))

        }
    }, [chipData])

    const handleChange = (e) => {
        setText(e.target.value)
    }

    const handleDelete = (chipToDelete) => () => {
        setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
    };

    const onKeyPress = (event) => {
        if (event.charCode === 13 && text !== "") {
            saveChipData()
        }
    }

    const handleClickIconSearch = () => {
        if (text !== "") {
            saveChipData()
        }
    }
    function saveChipData() {
        let index = chipData.length + 1
        setChipData([...chipData, { key: index, query: options[selectedIndex].key, label: text }])
        setText("")
    }

    const getUrl = () => {
        let queryUrl = ""
        let role = ""
        let first_name = ""
        let last_name = ""
        let document_number = ""
        const pagination = `page=${usersTable.page}&size=${usersTable.rowsPerPage}`
        chipData.forEach(element => {
            if (element.query === "role") {
                role += `${element.label},`
            }
            else if (element.query === "first_name") {
                first_name += `${element.label},`
            }
            else if (element.query === "last_name") {
                last_name += `${element.label},`
            }
            else if (element.query === "document_number") {
                document_number += `${element.label},`
            }
        })
        role = role.substring(0, role.length - 1)
        first_name = first_name.substring(0, first_name.length - 1)
        last_name = last_name.substring(0, last_name.length - 1)
        document_number = document_number.substring(0, document_number.length - 1)

        queryUrl += role ? `role=${role}` : "";
        queryUrl += (last_name ? `${queryUrl ? "&" : ""}last_name=${last_name}` : "")
        queryUrl += (first_name ? `${queryUrl ? "&" : ""}first_name=${first_name}` : "")
        queryUrl += (document_number ? `${queryUrl ? "&" : ""}document_id=1&document_number=${document_number}` : "")

        dispatch(setQuery(queryUrl))

        return queryUrl + (queryUrl ? `&${pagination}` : pagination)
    }

    return (
        <Grid container spacing={0}>
            <Grid item xs={12} className="justify-start align-items-start">
                <ButtonGroup options={options} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} />
                <TextInput
                    size="small"
                    label="Buscar"
                    type="search"
                    value={text}
                    onChange={handleChange}
                    onKeyPress={onKeyPress}
                    helperText={MESSAGE[selectedIndex]}
                />
                <IconButton aria-label="search" onClick={handleClickIconSearch} classes={{ root: classes.rootIconButton }}>
                    <SearchIcon fontSize="small" />
                </IconButton>
            </Grid>
            <Grid item xs={12} className="justify-start">
                <Chips chipData={chipData} handleDelete={handleDelete} />
            </Grid>
        </Grid>
    )
}
