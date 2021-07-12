import styled from "styled-components"

// Layout for private pages
export const MainLayout = (props) => {
  // Render:
  // Navbar, sidebars, ...
  return <Layout>{props.children}</Layout>
}

const Layout = styled.div``
