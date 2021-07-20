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
  display: grid;
  padding: 1rem;
  grid-row-gap: 1rem;
  justify-content: space-between;
  grid-template-columns: ${() => {
    let column = ""
    for (let i = 0; i < Math.floor(window.innerWidth / 275); i++) {
      column += "auto "
    }
    console.log(window.innerWidth)
    return column
  }};
`
