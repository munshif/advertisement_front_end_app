import React, { useState, useContext, useEffect, useRef } from "react";
import {
  TextField,
  makeStyles,
  Grid,
  Button,
  Typography,
  CircularProgress,
  Paper,
  IconButton,
  Backdrop,
  Collapse,
} from "@material-ui/core";
import { Context as AdvertisementContext } from "../../context/AdvertisementContext";
import Alert from "@material-ui/lab/Alert";
import CloseIcon from "@material-ui/icons/Close";

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

//Function component for advertise form
const AdvertimentForm = ({ product_id, setRefresh, editData }) => {
  const classes = useStyles();

  const { createAdvertisement } = useContext(AdvertisementContext);
  const [open, setLoading] = useState(false);
  const [errors, setError] = useState({});
  const [response, setMessage] = useState([]);
  const [alertOpen, setOpen] = useState(false);
  const [formTitle, setFormTitle] = useState("Create");
  const [inputField, setInputField] = useState({
    title: editData.title ? editData.title : "",
    valid_until: editData.valid_until ? editData.valid_until : "",
    discount_percentage: editData.discount_percentage
      ? editData.discount_percentage
      : "",
  });
  const titleRef = useRef();
  const percentageRef = useRef();
  const validUntilRef = useRef();

  let alertResponse = {};

  useEffect(() => {
    if (Object.keys(editData).length > 0) {
      setFormTitle("Update");
      titleRef.current.value = editData.title ? editData.title : "";
      validUntilRef.current.value = editData.valid_until
        ? editData.valid_until
        : "";
      percentageRef.current.value = editData.discount_percentage
        ? editData.discount_percentage
        : "";
    }
  });

  const newForm = () => {
    setFormTitle("Create");
  };
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
    try {
      e.preventDefault();
      if (formValidation()) {
        inputField["product_id"] = product_id;
        setInputField(inputField);

        setRefresh(false);

        const data = await createAdvertisement(inputField, setLoading);

        alertResponse["error"] = data.error;
        alertResponse["message"] = data.message;

        setMessage(alertResponse);
        setOpen(true);
        setRefresh(true);
      }
    } catch (e) {
      alertResponse["error"] = true;
      alertResponse["message"] = "Something went wrong!";
      setOpen(true);
      setMessage(alertResponse);
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
            <Typography className={classes.heading} spacing={3}>
              {formTitle} Advertisement
            </Typography>
            <Grid container spacing={3}>
              <Grid item md={6} xs={12} sm={12}>
                <TextField
                  label="Title *"
                  variant="outlined"
                  fullWidth
                  name="title"
                  onChange={handleInputChange}
                  error={errors["title"]}
                  inputRef={titleRef}
                />
              </Grid>
              <Grid item md={6} xs={12} sm={12}>
                <TextField
                  id="valid_until"
                  name="valid_until"
                  label="Valid Until"
                  type="date"
                  onChange={handleInputChange}
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  error={errors["valid_until"]}
                  inputRef={validUntilRef}
                />
              </Grid>
              <Grid item md={6} xs={12} sm={12}>
                <TextField
                  label="Discount Percentage *"
                  variant="outlined"
                  fullWidth
                  name="discount_percentage"
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={handleInputChange}
                  error={errors["discount_percentage"]}
                  inputRef={percentageRef}
                />
              </Grid>
            </Grid>

            <Grid container justify="flex-end">
              <div className={classes.button}>
                <Button onClick={newForm} variant="contained" color="primary">
                  New
                </Button>
                <Button type="submit" variant="contained" color="primary">
                  {formTitle}
                </Button>
                <Button variant="contained" color="secondary">
                  Cancel
                </Button>
              </div>
            </Grid>
          </form>
          <Collapse in={alertOpen}>
            <Alert
              severity={response.error ? "error" : "success"}
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
            >
              {response.message}
            </Alert>
          </Collapse>
        </Paper>
      </div>
    </>
  );
};

export default AdvertimentForm;
