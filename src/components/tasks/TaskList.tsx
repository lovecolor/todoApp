import React from "react"
import { useContext } from "react"
import styled from "styled-components"
import { Task } from "../../services/api/types/Task"
import { TaskItem } from "./TaskItem"

export type TaskListProps = {
  list: Task[]
  handleEditTask: (editedTask: Task) => void
  handleRemoveTask: () => void
}
export const TaskList = (props: TaskListProps) => {
  return (
    <Root>
      {props.list.map((task, id) => (
        <TaskItem onEdit={props.handleEditTask} onRemove={props.handleRemoveTask} task={task} key={id}></TaskItem>
      ))}
    </Root>
  )
}
const Root = styled.div`
  margin: auto;
  width: 80%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
  padding: 1rem;
  grid-gap: 20px;
`
