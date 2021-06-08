import React from 'react'
import { makeStyles, Menu, MenuItem, Typography } from '@material-ui/core';
import { Checkbox } from "../../../shared/components";

const useStyles = makeStyles(theme => ({
  paper: {
    width: "84%",
    left: "8% !important",
  }
}))

export default function FilterMenu({ anchorEl, handleClose, list = [], onRequestSort }) {
  const classes = useStyles()

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <Menu
      id="filter-menu"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}
      classes={{ paper: classes.paper }}
    >
      {
        list.map((item, index) => (
          <MenuItem onClick={handleClose} key={index}>
            <Checkbox
              onChange={createSortHandler(item.id)}
              label={
                <Typography variant="body2" component="p">
                  {item.label}
                </Typography>
              }
              name={item.name}
            />
          </MenuItem>
        ))
      }
    </Menu>
  )
}
