import React from "react";
import clsx from "clsx";
import {
  useTheme,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
} from "@material-ui/core";
import {
  ChevronLeft,
  ChevronRight,
  Mail,
  Inbox,
  Group as GroupIcon,
  PlaylistAddCheck as PlaylistAddCheckIcon,
  Assessment as AssessmentIcon,
  Settings as SettingsIcon,
} from "@material-ui/icons";
import { useStyles } from "./styles";
import { Link } from "react-router-dom";

const Sidebar = ({ open, handleDrawerClose }) => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Drawer
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: open,
        [classes.drawerClose]: !open,
      })}
      classes={{
        paper: clsx(
          {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          },
          classes.sidebarbg
        ),
      }}
    >
      <div className={classes.toolbar}>
        {open ? (
          <IconButton onClick={handleDrawerClose} color="primary">
            {theme.direction === "rtl" ? <ChevronRight /> : <ChevronLeft />}
          </IconButton>
        ) : (
          <IconButton onClick={handleDrawerClose} color="primary">
            {theme.direction === "rtl" ? <ChevronRight /> : <ChevronLeft />}
          </IconButton>
        )}
      </div>

      <List color="default">
        <Link to="/app/products">
          <ListItem button className={classes.listTextColor}>
            <ListItemIcon className={classes.listTextColor}>
              <AssessmentIcon />
            </ListItemIcon>
            <ListItemText primary="Products" />
          </ListItem>
        </Link>

        <ListItem button className={classes.listTextColor}>
          <ListItemIcon className={classes.listTextColor}>
            <PlaylistAddCheckIcon />
          </ListItemIcon>
          <ListItemText primary="Advertisements" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
