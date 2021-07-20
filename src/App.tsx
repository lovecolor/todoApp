import { SnackbarProvider } from "notistack"
import { StylesProvider, CssBaseline } from "@material-ui/core"
import { Switch, Route, Redirect } from "react-router"
import { useLinks } from "./hooks/useLinks"
import { Login } from "./pages/Login"
import { HomePage } from "./pages/HomePage"
import { useContext } from "react"
import AuthContext from "./contexts/AuthProvider"
import Register, { Loading } from "./pages/Register"
import UserProfile from "./pages/UserProfile"

export const App = () => {
  const links = useLinks().common
  const authCtx = useContext(AuthContext)
  const isLoggedIn = !!authCtx.user
  const token = localStorage.getItem("token")

  return (
    <>
      <SnackbarProvider maxSnack={3}>
        <StylesProvider injectFirst>
          <CssBaseline>
            <Switch>
              <Route path={links.home()} exact>
                {token && !isLoggedIn ? (
                  <Loading>Loading...</Loading>
                ) : (
                  <>
                    {!isLoggedIn && <Redirect to={links.login()}></Redirect>}
                    <HomePage></HomePage>
                  </>
                )}
              </Route>

              {isLoggedIn && (
                <>
                  <Route path={links.profile()}>
                    <UserProfile></UserProfile>
                  </Route>
                </>
              )}

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
