import { Button } from "@material-ui/core"
import styled from "styled-components"

export const ButtonPrimary = styled(Button).attrs((props) => ({
  color: "primary",
  variant: "contained",
  ...props,
}))`
  margin: 1rem 0;
`
