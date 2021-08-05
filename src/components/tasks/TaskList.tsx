import React from "react"
import { useContext } from "react"
import styled from "styled-components"
import TaskContext from "../../contexts/TaskProvider"
import { Task } from "../../services/api/types/Task"
import { TaskItem } from "./TaskItem"

export type TaskListProps = {
  list: Task[]
}
export const TaskList = (props: TaskListProps) => {
  return (
    <Root>
      {props.list.map((task, id) => (
        <TaskItem task={task} key={id} ></TaskItem>
      ))}
    </Root>
  )
}
const Root = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
  padding: 1rem;
  grid-gap: 36px;
`
