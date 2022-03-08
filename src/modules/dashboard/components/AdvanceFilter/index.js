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

  // const render = Object.values(values).some((item) => item?.active);
  // if (!render) return null;

  let arrayLabel = [];
  const valueTemp = { ...values };
  Object.keys(valueTemp).map((key) => {
    const options = valueTemp[key]?.answers;
    if (key == "gender" || key == "education" || key == "rubro" || key == "experience" || key == "extra") {
      Object.keys(options).forEach((element) => {
        if (options[element].active) {
          arrayLabel.push({ key, option: element, label: options[element].label })
        }
      })
    }
    else if (key == "labor" || key == "transport" || key == "economy" || key == "personal" || key == "health" || key == "family") {
      Object.keys(options).forEach((element) => {
        if (options[element].value) {
          arrayLabel.push({ key, option: element, label: `${options[element].label}: ${options[element].value}` })
        }
      })
    }
    else if (key == "age" || key == "salaryExpectations") {
      if(options.from != "" && options.to != ""){
        arrayLabel.push({ key, option: key, label: `${valueTemp[key].label}: ${options.from} - ${options.to}` })
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
