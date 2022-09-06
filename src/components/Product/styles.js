import { makeStyles } from "@material-ui/core/styles";

const usesStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "left",
    color: theme.palette.text.secondary,
    marginBottom: "1vh",
  },
}));

export { usesStyles };
