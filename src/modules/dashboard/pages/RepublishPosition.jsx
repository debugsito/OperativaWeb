import React, { useEffect, useState } from 'react'
import { Container, Grid, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import { DateTime } from "luxon";

import { Breadcrumbs, Button, SnackbarsSuccess, Snackbars } from "../../shared/components";
import { ShowPositionHistory, EditPositionForm } from "../components";
import { SessionRoutes } from "../../shared/libs/sessionRoutes";
import { convertStringToObject } from "../../shared/utils";
import { savePublication } from "../../../store/actions/dashboard/dashboard.middleware";
import { editIcon } from "../images";

const useStyles = makeStyles(theme => ({
    paper: {
        padding: "3rem"
    }
}))

export default function Republish(props) {
    const classes = useStyles()
    const dispatch = useDispatch()
    const [isEditing, setIsEditing] = useState(false)
    const [data, setData] = useState(false)
    const [openAlert, setOpenAlert] = useState({ open: false, type: null })
    const initRoute = SessionRoutes().initRoute;
    const { publicationSelected, requestState } = useSelector(state => state?.dashboard)
    const routes = [{ name: "HISTORIAL", to: `${initRoute}/historial-de-publicaciones` }, { name: "REPUBLICAR", to: `${initRoute}/republicar-posicion` }];

    useEffect(() => {
        const provinceTemp = publicationSelected.district.province;
        const defaultValues = {
            job_title: publicationSelected.job_title,
            description: convertStringToObject(publicationSelected.description),
            requirements: convertStringToObject(publicationSelected.requirements),
            rubro_id: publicationSelected.rubro_id,//rubro
            address: publicationSelected.address,
            district_id: publicationSelected.district.id,
            period: publicationSelected.period_id,
            salary: publicationSelected.salary,
            from_date: DateTime.fromISO(publicationSelected.from_date).toFormat("yyyy-LL-dd"),
            to_date: DateTime.fromISO(publicationSelected.to_date).toFormat("yyyy-LL-dd"),
            department_id: provinceTemp.department.id,
            province_id: provinceTemp.id,
        };
        setData(defaultValues)
    }, [publicationSelected])

    useEffect(() => {
        if (requestState.success) {
            setOpenAlert({ open: true, type: "success" })
            setIsEditing(false)
        } else if (requestState.success === false) {
            setOpenAlert({ open: true, type: "error" })
            setIsEditing(false)
        }
    }, [requestState.success])

    const handleOpenEditing = () => {
        setIsEditing(true)
    }

    const handleExitForm = () => {
        setIsEditing(false)
    }

    const handleSaveData = (values) => {
        dispatch(savePublication(values))
    }

    const handleCloseAlert = () => {
        setOpenAlert({ open: false, type: null })
    }

    return (
        <Container className="dashboard-container">
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Breadcrumbs routes={routes} />
                </Grid>
                <Grid item xs={12}>
                    <Grid container direction="column" justify="center" alignItems="center">
                        <Grid item xs={10}>
                            <Paper className={classes.paper}>
                                {
                                    isEditing ?
                                        <EditPositionForm
                                            handleExitForm={handleExitForm}
                                            handleSaveData={handleSaveData}
                                            data={data}
                                        />
                                        :
                                        <ShowPositionHistory
                                            button={
                                                <Button color="black" onClick={handleOpenEditing}>
                                                    <img src={editIcon} />
                                                    <span className="dashboard-title">EDITAR</span>
                                                </Button>
                                            }
                                        />
                                }
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
                {
                    openAlert.type === "success" &&
                    <SnackbarsSuccess
                        message="Se ha creado una copia de la publicación original. Ahora sí, puedes editar."
                        open={openAlert}
                        onClose={handleCloseAlert}
                    />
                }
                {
                    openAlert.type === "error" &&
                    <Snackbars
                        message="Ha ocurrido un error, intentalo mas tarde."
                        open={openAlert}
                        onClose={handleCloseAlert}
                    />
                }
            </Grid>
        </Container>
    )
}
