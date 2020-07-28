import React from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar } from "react-bootstrap";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import HomeIcon from "@material-ui/icons/Home";
import ListIcon from "@material-ui/icons/List";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Link variant="h6" as={Link} to="/" style={{ marginRight: 30 }}>
            <Typography
              variant="h6"
              style={{
                color: "white",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
              as={Link}
              to="/"
            >
              <HomeIcon style={{ marginRight: 5 }} />
              Home
            </Typography>
          </Link>
          <Link variant="h6" as={Link} to="/listcourier">
            <Typography
              variant="h6"
              style={{
                color: "white",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
              as={Link}
              to="/listcourier"
            >
              <ListIcon style={{ marginRight: 5 }} />
              List Courier
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
    // <Navbar bg="dark" variant="dark" expand="lg">
    //   <Navbar.Brand as={Link} to="/">
    //     RouteMaster
    //   </Navbar.Brand>
    //   <Navbar.Toggle aria-controls="basic-navbar-nav" />
    //   <Navbar.Collapse id="basic-navbar-nav">
    //     <Nav className="mr-auto">
    //       <Nav.Link as={Link} to="/">
    //         Home
    //       </Nav.Link>
    //       <Nav.Link as={Link} to="/listcourier">
    //         Daftar Kurir
    //       </Nav.Link>
    //     </Nav>
    //   </Navbar.Collapse>
    // </Navbar>
  );
};
