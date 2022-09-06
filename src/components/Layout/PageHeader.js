import React from "react";
import {
  Paper,
  Card,
  Typography,
  makeStyles,
  CardContent,
} from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#fdfdff",
  },
  pageHeader: {
    padding: theme.spacing(1),
    display: "flex",
    marginBottom: theme.spacing(1),
  },
  pageIcon: {
    display: "inline-block",
    padding: theme.spacing(1),
    color: "#3c44b1",
  },
  pageTitle: {
    paddingLeft: theme.spacing(4),
    "& .MuiTypography-subtitle2": {
      opacity: "0.6",
    },
  },
}));

const PageHeader = ({ icon, pageTitle, subTitle }) => {
  const classes = useStyles();
  return (
    <>
      <Paper elevation={0} square className={classes.root}>
        <div className={classes.pageHeader}>
          <CardContent className={classes.pageIcon}>{icon}</CardContent>
          <div className={classes.pageTitle}>
            <Typography variant="h5" component="div">
              {pageTitle}
            </Typography>
            <Typography variant="subtitle2" component="div">
              {subTitle}
            </Typography>
          </div>
        </div>
      </Paper>
    </>
  );
};

export default PageHeader;
