import React, {useState} from 'react'
import { Container, InputAdornment, Grid } from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';

import { Breadcrumbs, Button, TextInput } from "../../shared/components";
import {HistoryTable} from "../components"
import { SessionRoutes } from "../../shared/libs/sessionRoutes";

import "../styles/TermsAndCondition.css"
import { downloadIcon } from "../images";

export default function History() {
    const [selectedRow, setSelectedRow] = useState([]);
    const [searchInput, setSearchInput] = useState(null);
    const initRoute = SessionRoutes().initRoute;
    const routes = [{ name: "HISTORIAL", to: `${initRoute}` }];

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
                                        // InputProps={{startAdornment: (
                                        //     <InputAdornment position="start">
                                        //       buscar
                                        //     </InputAdornment>
                                        // )}}
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
                    {/* <DataGrid 
                        rows={data}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10, 20, 30]}
                        hideFooterSelectedRowCount 
                        autoHeight
                        rowHeight={200}
                    /> */}
                </Grid>
            </Grid>
        </Container>
    )
}
