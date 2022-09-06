import React, { useState, useContext } from "react";
import PageHeader from "../../components/Layout/PageHeader";
import {
  Person as PersonIcon,
  ExpandMore as ExpandMoreIcon,
} from "@material-ui/icons";
import {
  TextField,
  makeStyles,
  Grid,
  Button,
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  CircularProgress,
} from "@material-ui/core";
import { Context as UserContext } from "../../context/UserContext";
import Backdrop from "@material-ui/core/Backdrop";
import { Alert } from "@material-ui/lab";

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

const NewUser = () => {
  const classes = useStyles();
  const { state, userSignUp } = useContext(UserContext);
  const [panel1Expand, setPanel1Expand] = useState(true);
  const [panel2Expand, setPanel2Expand] = useState(true);
  const [open, setLoading] = useState(false);
  const [errors, setError] = useState({});
  const [inputField, setInputField] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
    phone: "",
  });

  const formValidation = () => {
    const { first_name, last_name, email, phone, password, confirm_password } =
      inputField;
    let errors = {};
    let formValid = true;

    if (!first_name) {
      formValid = false;
      errors["first_name"] = true;
    }
    if (!last_name) {
      formValid = false;
      errors["last_name"] = true;
    }
    if (!email) {
      formValid = false;
      errors["email"] = true;
    }
    if (!phone) {
      formValid = false;
      errors["phone"] = true;
    }
    if (!password) {
      formValid = false;
      errors["password"] = true;
    }
    if (!confirm_password) {
      formValid = false;
      errors["confirm_password"] = true;
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

  const handleChange = (panel) => (event, newExpanded) => {
    if (panel === "panel1") {
      setPanel1Expand(newExpanded ? panel : false);
    } else if (panel === "panel2") {
      setPanel2Expand(newExpanded ? panel : false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formValidation()) {
      const $data = await userSignUp(inputField, setLoading);
      console.log($data);
    }
  };

  return (
    <>
      <Backdrop className={classes.backdrop} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <PageHeader
        icon={<PersonIcon fontSize="large" />}
        pageTitle="Users"
        subTitle="New User"
      />

      <div className={classes.root}>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Accordion expanded={panel1Expand} onChange={handleChange("panel1")}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>
                Personal Details
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={0} spacing={3}>
                <Grid item md={6} xs={12} sm={12}>
                  <TextField
                    label="First Name *"
                    variant="outlined"
                    fullWidth
                    name="first_name"
                    onChange={handleInputChange}
                    error={errors["first_name"]}
                  />
                </Grid>
                <Grid item md={6} xs={12} sm={12}>
                  <TextField
                    label="Last Name *"
                    variant="outlined"
                    fullWidth
                    name="last_name"
                    onChange={handleInputChange}
                    error={errors["last_name"]}
                  />
                </Grid>
                <Grid item md={6} xs={12} sm={12}>
                  <TextField
                    label="Email Address *"
                    variant="outlined"
                    fullWidth
                    name="email"
                    onChange={handleInputChange}
                    error={errors["email"]}
                  />
                </Grid>
                <Grid item md={6} xs={12} sm={12}>
                  <TextField
                    label="Phone *"
                    variant="outlined"
                    fullWidth
                    name="phone"
                    onChange={handleInputChange}
                    error={errors["phone"]}
                  />
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
          <Accordion expanded={panel2Expand} onChange={handleChange("panel2")}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>
                Password Management
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={0} spacing={3}>
                <Grid item md={6} xs={12} sm={12}>
                  <TextField
                    label="Password *"
                    variant="outlined"
                    fullWidth
                    name="password"
                    onChange={handleInputChange}
                    error={errors["password"]}
                  />
                </Grid>
                <Grid item md={6} xs={12} sm={12}>
                  <TextField
                    label="Confirm Password *"
                    variant="outlined"
                    fullWidth
                    name="confirm_password"
                    onChange={handleInputChange}
                    error={errors["confirm_password"]}
                  />
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
          <div className={classes.button}>
            <Button type="submit" variant="contained" color="primary">
              Save
            </Button>
            <Button variant="contained" color="secondary">
              Cancel
            </Button>
          </div>
        </form>
        <Alert variant="standard" severity="error">
          Password missmatch
        </Alert>
      </div>
    </>
  );
};

export default NewUser;
