import React from "react";
import { usesStyles } from "./styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

const ProductDetail = ({ data }) => {
  const classes = usesStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>Product Name: {data.name}</Paper>

      <Paper className={classes.paper}>Price: {data.price}</Paper>

      <Paper className={classes.paper}>Description: {data.description}</Paper>
    </div>
  );
};

export default ProductDetail;
