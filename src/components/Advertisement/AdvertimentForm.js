import React, { useState, useContext } from "react";
import {
  TextField,
  makeStyles,
  Grid,
  Button,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import { Context as AdvertisementContext } from "../../context/AdvertisementContext";
import Backdrop from "@material-ui/core/Backdrop";
import { Alert } from "@material-ui/lab";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  button: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

const AdvertimentForm = ({ product_id }) => {
  const classes = useStyles();
  const { state, createAdvertisement } = useContext(AdvertisementContext);
  const [open, setLoading] = useState(false);
  const [errors, setError] = useState({});
  const [message, setMessage] = useState("");

  const [inputField, setInputField] = useState({
    title: "",
    valid_until: "",
    discount_percentage: "",
  });

  const formValidation = () => {
    const { title, valid_until, discount_percentage } = inputField;
    let errors = {};
    let formValid = true;

    if (!title) {
      formValid = false;
      errors["title"] = true;
    }
    if (!valid_until) {
      formValid = false;
      errors["valid_until"] = true;
    }
    if (!discount_percentage) {
      formValid = false;
      errors["discount_percentage"] = true;
    }

    setError(errors);
    return formValid;
  };

  let handleInputChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    inputField[name] = value;
    setInputField(inputField);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formValidation()) {
      inputField["product_id"] = product_id;
      setInputField(inputField);
      const data = await createAdvertisement(inputField, setLoading);
    }
  };

  return (
    <>
      <Backdrop className={classes.backdrop} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <div className={classes.root}>
        <Paper className={classes.paper}>
          <form className={classes.form} onSubmit={handleSubmit}>
            <Typography className={classes.heading}>
              Create Advertisement
            </Typography>
            <Grid container spacing={0} spacing={3}>
              <Grid item md={6} xs={12} sm={12}>
                <TextField
                  label="Title *"
                  variant="outlined"
                  fullWidth
                  name="title"
                  onChange={handleInputChange}
                  error={errors["title"]}
                />
              </Grid>
              <Grid item md={6} xs={12} sm={12}>
                <TextField
                  id="valid_until"
                  name="valid_until"
                  label="Valid Until"
                  type="date"
                  onChange={handleInputChange}
                  defaultValue="2022-09-06"
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item md={6} xs={12} sm={12}>
                <TextField
                  label="Discount Percentage *"
                  variant="outlined"
                  fullWidth
                  name="discount_percentage"
                  onChange={handleInputChange}
                  error={errors["discount_percentage"]}
                />
              </Grid>
            </Grid>

            <div className={classes.button}>
              <Button type="submit" variant="contained" color="primary">
                Save
              </Button>
              <Button variant="contained" color="secondary">
                Cancel
              </Button>
            </div>
          </form>
        </Paper>
      </div>
    </>
  );
};

export default AdvertimentForm;
