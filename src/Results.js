import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import SendIcon from "@material-ui/icons/Send";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 700,
    backgroundColor: "transparent",
    color: "#284d19"
  },
  nested: {
    paddingLeft: theme.spacing(4),
    color: "#284d19"
  },
  bigAvatar: {
    margin: 10,
    width: 60,
    height: 60
  }
}));

export default function ResultsList({
  fullName,
  directionsInfo,
  description,
  states,
  url
}) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  function handleClick() {
    setOpen(!open);
  }

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      className={classes.root}
    >
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <SendIcon />
        </ListItemIcon>
        <ListItemText primary={fullName} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
            <details>
              <summary>directions</summary>
              <p>{directionsInfo}</p>
            </details>
          </ListItem>
          <ListItem button className={classes.nested}>
            <details>
              <summary>description</summary>
              <p>{description}</p>
            </details>
          </ListItem>
          <ListItem button className={classes.nested}>
            <details>
              <summary>states codes</summary>
              <p>{states}</p>
            </details>
          </ListItem>
          <ListItem button className={classes.nested}>
            <a href={url}>park page</a>
          </ListItem>
        </List>
      </Collapse>
    </List>
  );
}
