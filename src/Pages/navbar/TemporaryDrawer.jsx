import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import { IconButton, Typography } from "@mui/material";
import {
  Search,
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Help,
  Menu,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "../../state/index";
import './styles.css'

export default function TemporaryDrawer() {
  const [state, setState] = React.useState({
    right: false,
  });
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.mode);
  const user = useSelector((state) => state.user);
  const fullName = user ? `${user.firstName} ${user.lastName}` : "jhon wick";
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List
      sx={{marginTop:"1rem"}}>
        <ListItem value={fullName}>
          <Typography textTransform={"capitalize"} fontSize={"large"}>{fullName}</Typography>
        </ListItem>
        <ListItem
         disablePadding
        >
        <ListItemButton
          onClick={() => {
            dispatch(setLogout());
          }}
        >
          <Typography fontSize={"large"}>Logout</Typography>
        </ListItemButton>
        </ListItem>
      </List >
      <Divider />
      <List>
        <ListItem disablePadding >
          <ListItemButton onClick={() => dispatch(setMode())}
           className="mobile-navbar-links"
          >
            {mode === "dark" ? <LightMode fontSize="large" /> : <DarkMode fontSize="large" />}
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding >
          <ListItemButton  className="mobile-navbar-links">
            <Message fontSize="large"  />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding >
          <ListItemButton className="mobile-navbar-links">
            <Notifications fontSize="large" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding >
          <ListItemButton className="mobile-navbar-links">
            <Help fontSize="large" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>
            <Menu fontSize="large"/>
            </Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
