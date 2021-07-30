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
        <TaskItem task={task} key={id} id={id}></TaskItem>
      ))}
    </Root>
  )
}
const Root = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  padding: 1rem;
  margin-left: -10px;
`
