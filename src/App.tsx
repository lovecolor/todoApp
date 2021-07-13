import { SnackbarProvider } from "notistack"
import { StylesProvider, CssBaseline } from "@material-ui/core"
import { Switch, Route, Redirect } from "react-router"
import { useLinks } from "./hooks/useLinks"
import { Login } from "./pages/Login"
import { getAppLinks } from "./links"
import { HomePage } from "./pages/HomePage"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useAppApiClient } from "./hooks/useAppApiClient"
import useAsync from "./hooks/use-async"
import { useContext } from "react"
import AuthContext from "./contexts/auth-context"
import { link } from "fs"


export const App = () => {
  const links = useLinks.common
  const useCtx = useContext(AuthContext)


  return (
    <>
      <SnackbarProvider maxSnack={3}>
        <StylesProvider injectFirst>
          <CssBaseline>
            {useCtx.isLoggedIn ? <Redirect to={links.home()}></Redirect> : <Redirect to={links.login()}></Redirect>}
            <Switch>
              <Route path={links.home()} exact>
                <HomePage></HomePage>
              </Route>
              <Route path={links.login()}>
                <Login></Login>
              </Route>
            </Switch>

          </CssBaseline>
        </StylesProvider>
      </SnackbarProvider>
    </>
  )
}
