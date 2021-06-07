import React from 'react'
import { Menu, MenuItem, Typography } from '@material-ui/core';
import { Checkbox } from "../../../shared/components";

export default function FilterMenu({ anchorEl, handleClose }) {

  return (
    <Menu
      id="filter-menu"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      <MenuItem onClick={handleClose}>
        <Checkbox
          label={
            <Typography variant="body2" component="p">
              Titulo de publicación
                </Typography>
          }
          name="title"
        />
      </MenuItem>
      <MenuItem onClick={handleClose}>
        <Checkbox
          label={
            <Typography variant="body2" component="p">
              Fecha de publicación
            </Typography>
          }
          name="fecha"
        />
      </MenuItem>
    </Menu>
  )
}
