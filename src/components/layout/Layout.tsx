import React from "react"
import { MainNavigation } from "./MainNavigation"

export const Layout: React.FC = (props) => {
  return (
    <>
      <MainNavigation></MainNavigation>
      <main>{props.children}</main>
    </>
  )
}
