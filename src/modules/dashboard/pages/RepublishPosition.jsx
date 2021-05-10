import React, {useState} from 'react'
import { makeStyles } from "@material-ui/core/styles";
import { Container, Grid, Paper } from "@material-ui/core";

import { Breadcrumbs, Button} from "../../shared/components";
import { ShowPosition, EditPositionForm } from "../components";
import { SessionRoutes } from "../../shared/libs/sessionRoutes";
import { editIcon } from "../images";

const useStyles = makeStyles( theme => ({
    paper:{
        padding: "3rem"
    }
}))

export default function Republish(props) {
    const classes = useStyles()
    const [isEditing, setIsEditing] = useState(false)
    const initRoute = SessionRoutes().initRoute;
    const routes = [{ name: "HISTORIAL", to: `${initRoute}/historial-de-publicaciones` }, { name: "REPUBLICAR", to: `${initRoute}/republicar-posicion` }];

    const handleOpenEditing = () => {
        setIsEditing(true)
    }

    const handleExitForm = () => {
        setIsEditing(false)
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
                                    isEditing?
                                    <EditPositionForm 
                                        handleExitForm={handleExitForm}
                                    />
                                    :
                                    <ShowPosition 
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
            </Grid>
        </Container>
    )
}
