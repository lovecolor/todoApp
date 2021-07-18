import React from "react"
import { useContext } from "react"
import styled from "styled-components"
import TaskContext from "../../contexts/TaskProvider"
import { TaskItem } from "./TaskItem"

export const TaskList: React.FC = (props) => {
  const taskCtx = useContext(TaskContext)
  const { tasks } = taskCtx
  return (
    <Root>
      {tasks.map((task) => (
        <TaskItem task={task} key={task._id}></TaskItem>
      ))}
    </Root>
  )
}
const Root = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`
