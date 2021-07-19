import { ClickAwayListener } from "@material-ui/core"
import { type } from "os"
import React, { ReactElement } from "react"
import { useState } from "react"
import styled from "styled-components"

type Dropdown = {
  label: ReactElement
  actions: { name: string; handle: (...data: any) => any }[]
}
export const Dropdown: React.FC<Dropdown> = (props) => {
  const [open, setOpen] = useState(false)
  const onClickLabel = () => {
    setOpen(!open)
  }
  const handleClose = () => {
    setOpen(false)
  }
  return (
    <ClickAwayListener onClickAway={handleClose}>
      <Root>
        <div onClick={onClickLabel}>{props.label}</div>
        {open && (
          <Actions>
            {props.actions.map((action) => (
              <Action key={action.name} onClick={action.handle}>
                {action.name}
              </Action>
            ))}
          </Actions>
        )}
      </Root>
    </ClickAwayListener>
  )
}
const Root = styled.div`
  position: relative;
`
const Actions = styled.div`
  border-radius: 5px;
  box-shadow: 0px 5px 5px -3px rgb(0 0 0 / 20%), 0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%);
  background-color: white;
  color: black;
  position: absolute;
  right: 0;
  padding: 0.5rem 0;
  animation: smooth 0.3s ease-out;
  @keyframes smooth {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`
const Action = styled.div`
  cursor: pointer;
  padding: 0.5rem 1rem;
  font-size: 1.2rem;
  transition: 0.25s ease;
  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }
`
