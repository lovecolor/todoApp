import { SnackbarProvider } from "notistack"
import { StylesProvider, CssBaseline } from "@material-ui/core"
import { Switch, Route, Redirect } from "react-router"
import { useLinks } from "./hooks/useLinks"
import { Login } from "./pages/Login"
import { HomePage } from "./pages/HomePage"
import { useContext } from "react"
import AuthContext from "./contexts/AuthProvider"
import Register from "./pages/Register"

export const App = () => {
  const links = useLinks.common
  const authCtx = useContext(AuthContext)
  const isLoggedIn = authCtx.user != null

  return (
    <>
      <SnackbarProvider maxSnack={3}>
        <StylesProvider injectFirst>
          <CssBaseline>
            <Switch>
              <Route path={links.home()} exact>
                {!isLoggedIn && <Redirect to={links.register()}></Redirect>}
                <HomePage></HomePage>
              </Route>
              {!isLoggedIn && (
                <>
                  <Route path={links.login()}>
                    <Login></Login>
                  </Route>
                  <Route path={links.register()}>
                    <Register></Register>
                  </Route>
                </>
              )}

              <Route path="*">
                <Redirect to={links.home()}></Redirect>
              </Route>
            </Switch>
          </CssBaseline>
        </StylesProvider>
      </SnackbarProvider>
    </>
  )
}
