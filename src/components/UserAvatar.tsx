import React from "react"
import styled from "styled-components"
import AvatarDefault from "../assets/avatarDefault.jpg"

export const UserAvatar = styled.img.attrs((props) => ({
  ...props,
  src: props.src || AvatarDefault,
}))`
  object-fit: cover;
  border-radius: 50%;
  width: 30px;
  height: 30px;
`
