import React, { useContext, useState,useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Context } from "../../context/AdvanceFilterContext";

import Chip from "@material-ui/core/Chip";
import { Typography } from "@material-ui/core";
import { buildArrayLabels } from "../../utils/convert";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    // justifyContent: "center",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
}));
const StyleChip = withStyles({
  root: {
    backgroundColor: "#373737",
    borderRadius: 10,
    color: "#F1EFEF !important",
  },
  deleteIcon: {
    color: "#F1EFEF",
  },
})(Chip);

export default function OutlinedChips() {
  const classes = useStyles();
  const {queryParams} = useSelector((state) => state?.dashboard)
  const {resetItem,values} = useContext(Context);
  const [arrayLabel,setArrayLabel] = useState([]);


  useEffect(() => {
    console.log("entro aqui")
    console.log(values);
    let data = buildArrayLabels(values);
    console.log(data)
    setArrayLabel(data)
  }, [values])

  return (
    <>
      <Typography variant="h6">Filtrando por:</Typography>
      <div className={classes.root}>
        {
          arrayLabel.map((item, index) => {
            return (
              <StyleChip
                key={index}
                label={item.label}
                onDelete={() => resetItem(item)}
              />
            );
          })
        }
      </div>
    </>
  );
}
