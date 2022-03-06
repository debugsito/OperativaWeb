import React, { useContext } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Context } from "../../context/AdvanceFilterContext";

import Chip from "@material-ui/core/Chip";
import { Typography } from "@material-ui/core";

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
  const { values, resetItem } = useContext(Context);

  const handleDelete = (index) => {
    console.info("You clicked the delete icon.");
  };

  const handleClick = () => {
    console.info("You clicked the Chip.");
  };

  const render = Object.values(values).some((item) => item?.active);
  if (!render) return null;

  let arrayLabel = [];
  Object.keys(values).map((item) => {
    if (item !== "residence" && item !== "transport") {
      const options = values[item].answers;
      console.log("options",options)
      Object.keys(options).map((element) => {
        if (options[element].active) {
          arrayLabel.push({filter: item, label: options[element].label})
        }
      })
    } else {
      if (values[item].active) {
        arrayLabel.push({filter: item, label:values[item].label})
      }
    }
  })


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
        {/* {Object.keys(values).map((item, index) => {
          if (!values[item].active) {
            return null;
          }
          return (
            <StyleChip
              key={index}
              label={values[item].label}
              onDelete={() => resetItem(item)}
            />
          );
        })} */}
      </div>
    </>
  );
}
