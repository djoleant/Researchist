import * as React from "react";
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AppBar from "@mui/material/AppBar";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";
import Switch from "./ThemeSwitch";
import { changeTheme } from "../App";
import { Divider } from "@mui/material";
// import { logout } from "../actions/Auth";
import { useTheme } from "@emotion/react";

const pages = ["Home", "Categories", "About"];
const settings = ["Account", "CV Creator", "CV Export", "Logout", "Admin Dashboard", "Post internship"];

export const Header = (props) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const { Component, ThemeHandler, componentType } = props;

  const location = useLocation();
  const navigate = useNavigate();

  

  const theme = useTheme();

  const reloadHeader = () => {
    
    handleCloseUserMenu();
  }

 
  return (
    <React.Fragment>

      <AppBar position="sticky">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
            >
              Researchist
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={() => { navigate("/" + page) }}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
            >
              Researchist
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={() => { navigate("/" + page) }}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page}
                </Button>
              ))}
            </Box>


            
                <>
                  <MenuItem onClick={() => { navigate("/CreateProfile/student") }}>
                    <Typography textAlign="center">Create Profile</Typography>
                  </MenuItem >
                  <MenuItem onClick={() => { navigate("/Createpaper") }}>
                    <Typography textAlign="center">Create Paper</Typography>
                  </MenuItem >
                  <MenuItem onClick={ThemeHandler}>
                    <Switch checked={localStorage.getItem("mode") === "dark"} />
                  </MenuItem>
                </>
          </Toolbar>
        </Container>
      </AppBar>
      <Component reloadHeader={reloadHeader} type={componentType} />
    </React.Fragment>
  );
};
export default Header;
