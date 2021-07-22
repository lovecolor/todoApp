import styled from "styled-components"

export const GridContainer = styled.div<{ spacing: number }>`
  display: grid;

  grid-gap: ${(props) => `${props.spacing * 8}px`};
`
