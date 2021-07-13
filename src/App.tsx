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
import { authActions } from "./store/authSlice"
import { RootState } from "./store/store"

export const App = () => {
  const links = useLinks.common
  const dispatch = useDispatch()
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn)
  const { run, error, result } = useAsync(useAppApiClient().getLoggedInUserviaToken)
  const token = localStorage.getItem("token")
  useEffect(() => {
    if (token) {
      run()
    }
  }, [])
  useEffect(() => {
    if (result) {
      dispatch(authActions.login({
        user: result,
        token
      }))
    }
  }, [result])
  useEffect(() => {
    if (error) localStorage.clear()
  }, [error])
  return (
    <>
      <SnackbarProvider maxSnack={3}>
        <StylesProvider injectFirst>
          <CssBaseline>
            {isLoggedIn ? <Redirect to={links.home()}></Redirect> : <Redirect to={links.login()}></Redirect>}
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
