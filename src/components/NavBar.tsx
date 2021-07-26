import React, { useContext, useState } from "react"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import IconButton from "@material-ui/core/IconButton"
import MenuIcon from "@material-ui/icons/Menu"
import AccountCircle from "@material-ui/icons/AccountCircle"
import Switch from "@material-ui/core/Switch"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import FormGroup from "@material-ui/core/FormGroup"
import MenuItem from "@material-ui/core/MenuItem"
import Menu from "@material-ui/core/Menu"
import styled from "styled-components"
import { Grid } from "@material-ui/core"
import AuthContext from "../contexts/AuthProvider"
import { useHistory } from "react-router"
import { useAppApiClient } from "../hooks/useAppApiClient"
import useAsync from "../hooks/useAsync"
import { useLinks } from "../hooks/useLinks"
import { Dropdown } from "./Dropdown"
import { Heading6 } from "./text/Heading6"

export const NavBar: React.FC = (props) => {
  const history = useHistory()
  const api = useAppApiClient()
  const links = useLinks().common

  const authCtx = useContext(AuthContext)
  const handleLogout = useAsync(async () => {
    const result = await api.logout()
    if (result) {
      authCtx.setUser(null)
      localStorage.removeItem("token")
      history.push(links.login())
    }
  })

  const logoutHandler = () => {
    handleLogout.run()
  }
  const profileHandler = () => {
    history.push("/profile")
  }
  const MenuActions = [
    {
      name: "Profile",
      handle: profileHandler,
    },
    {
      name: "Logout",
      handle: logoutHandler,
    },
  ]
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Grid container alignItems="center">
            <IconButton edge="start" color="inherit" >
              <MenuIcon />
            </IconButton>
            <Heading6>Todos</Heading6>
          </Grid>

          <div>
            <Dropdown
              label={
                <IconButton
                  
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
              }
              actions={MenuActions}
            ></Dropdown>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  )
}
