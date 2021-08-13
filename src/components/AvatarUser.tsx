import React from "react"
import styled from "styled-components"
import AvatarDefault from "../assets/avatarDefault.jpg"

export type AvatarUserProps = {
  width: string
  url: string | null
}
export default function AvatarUser(props: AvatarUserProps) {
  return <Avatar width={props.width} src={props.url || AvatarDefault}></Avatar>
}
const Avatar = styled.img`
  object-fit: cover;
  border-radius: 50rem;
  width: ${(props) => props.width};
  height: ${(props) => props.width};
`
