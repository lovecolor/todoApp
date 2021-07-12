import { SnackbarProvider } from "notistack"
import { StylesProvider, CssBaseline } from "@material-ui/core"

export const App = () => {
  return (
    <>
      <SnackbarProvider maxSnack={3}>
        <StylesProvider injectFirst>
          <CssBaseline>{/* Route setup here */}</CssBaseline>
        </StylesProvider>
      </SnackbarProvider>
    </>
  )
}
