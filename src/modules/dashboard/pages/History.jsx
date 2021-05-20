import React, {useState, useEffect} from 'react'
import SearchIcon from '@material-ui/icons/Search';
import { Container, Grid } from "@material-ui/core";
import { useDispatch } from "react-redux";

import { Breadcrumbs, Button, TextInput } from "../../shared/components";
import { setReportByPostulantId, setRequestState } from "../../../store/actions/dashboard/dashboard.action";
import { SessionRoutes } from "../../shared/libs/sessionRoutes";
import {HistoryTable} from "../components"

import "../styles/TermsAndCondition.css"
import { downloadIcon } from "../images";

export default function History() {
    const dispatch = useDispatch()
    const [selectedRow, setSelectedRow] = useState([]);
    const [searchInput, setSearchInput] = useState(null);
    const initRoute = SessionRoutes().initRoute;
    const routes = [{ name: "HISTORIAL", to: `${initRoute}` }];

    useEffect(() => {
        dispatch(setReportByPostulantId([]))
        dispatch(setRequestState({success:null}))
    },[])

    const handleEnableButton = (rowsSelected) => {
        setSelectedRow(rowsSelected)
    }

    return (
        <Container className="dashboard-container">
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Breadcrumbs routes={routes} />
                </Grid>
                <Grid item xs={12}>
                    <Grid container direction="row" justify="space-between">
                        <Grid item xs={6}>
                        <Button 
                            startIcon={<img src={downloadIcon} alt="descargar" />} 
                            variant="contained" 
                            color="secondary" 
                            size="large" 
                            disabled={!(selectedRow.length > 0)}
                            >
                                DESCARGA
                        </Button>
                        </Grid>
                        <Grid item xs={4}>
                            <Grid container alignItems="flex-end">
                                <Grid item xs={1}>
                                    <SearchIcon />
                                </Grid>
                                <Grid item xs={11}>
                                    <TextInput
                                        name="search"
                                        label="Buscar por titulo de publicación"
                                        value={searchInput}
                                        onChange={(e) => setSearchInput(e.target.value)}
                                        size="small"
                                        fullWidth
                                    />
                                </Grid>
                            </Grid>
                            
                        </Grid>
                    </Grid>

                </Grid>
                <Grid item xs={12}>
                    <HistoryTable handleEnableButtonDownload={handleEnableButton} searchInput={searchInput}/>
                </Grid>
            </Grid>
        </Container>
    )
}
