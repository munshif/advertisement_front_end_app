import React, { useState, useContext } from "react";
import { withRouter, Route, Switch } from "react-router-dom";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import { CssBaseline } from "@material-ui/core";
import { useStyles } from "./styles";
import { Context as UserContext } from "../../context/UserContext";
import NewUser from "../../pages/users/NewUser";
import ProductAdvertisement from "../../pages/products/ProductAdvertisement";
import Products from "../../pages/products/Products";

const drawerWidth = 240;

const Layout = (props) => {
  const { state } = useContext(UserContext);
  // console.log(state);
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header
        open={open}
        handleDrawerOpen={handleDrawerOpen}
        drawerWidth={drawerWidth}
      />
      <Sidebar
        open={open}
        handleDrawerClose={handleDrawerClose}
        drawerWidth={drawerWidth}
      />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Switch>
          <Route path="/app/users/new" component={NewUser} />
          <Route exact path="/app/products" component={Products} />
          <Route
            path="/app/products/advertisements"
            component={ProductAdvertisement}
          />
        </Switch>
      </main>
    </div>
  );
};

export default withRouter(Layout);
