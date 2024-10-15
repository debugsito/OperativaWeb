import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Chip } from '../../../shared/components'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        listStyle: 'none',
        padding: theme.spacing(0.5),
        margin: 0,
    },
    chip: {
        margin: theme.spacing(0.5),
    },
}));

export default function Index({ chipData, handleDelete }) {
    const classes = useStyles();

    return (
        <ul className={classes.root}>
            {
                chipData.map((data) => {
                    return (
                        <li key={data.id}>
                            <Chip
                                label={data.name}
                                onDelete={handleDelete(data)}
                                className={classes.chip}
                            />
                        </li>
                    );
                })
            }
        </ul>
    )
}
