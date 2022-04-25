
import styles from "../styleshome/components_styles/NavBarProgress.module.scss";
import {
    Grid,
    Typography,
    LinearProgress
} from '@material-ui/core';


import { withStyles } from '@material-ui/core/styles';

import ButtonGoBackWhite from "../components2/ButtonGoBackWhite";


const BorderLinearProgress = withStyles((theme) => ({
    root: {
        height: 4,
        borderRadius: 5,
        flexGrow: 1
    },
    colorPrimary: {
        backgroundColor: 'white',
    },
    bar: {
        borderRadius: 5,
        backgroundColor: 'white'
    }
}))(LinearProgress);

export default function NavProgress({ progress,title }) {

    return (
        <>
            <div className={styles.container}>
                <header className={styles.header}>
                    <Grid container spacing={3} justify="center">
                        <Grid item xs={11}>
                            <Grid container direction="row" justify="space-between" alignItems="center">
                                <Typography variant="h7" component="h7"><strong>{progress}%</strong></Typography>
                                <ButtonGoBackWhite />
                            </Grid >
                          

                            <Grid item xs={6}>
                                <Typography variant="h7" component="h7">
                                    <strong>{title}</strong>
                                </Typography>
                            </Grid>

                            <Grid item xs={12} md={12} lg={12}>
                                <BorderLinearProgress color="secondary"
                                    variant="determinate" value={progress} />
                            </Grid>
                            <br />

                        </Grid>

                    </Grid>

                </header>
            </div>

        </>

    )


}