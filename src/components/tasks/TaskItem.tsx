import React from "react"
import Card from "@material-ui/core/Card"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import { CustomSpan } from "../../pages/UserProfile"
import { Button } from "@material-ui/core"
import { ButtonPrimary } from "../buttons/ButtonPrimary"
import DeleteIcon from "@material-ui/icons/Delete"
import EditIcon from "@material-ui/icons/Edit"
import styled from "styled-components"
import { Task } from "../../services/api/types/Task"
import { UpdateTask } from "./UpdateTask"
import useAsync from "../../hooks/useAsync"
import { useAppApiClient } from "../../hooks/useAppApiClient"
import { useEffect } from "react"

export const TaskItem: React.FC<{
  task: Task
  onUpdate: (task: Task) => void
}> = (props) => {
  const { task } = props
  const api = useAppApiClient()
  const { run, result } = useAsync(api.updateTask)
  const changeStatusHandler = () => {
    const completed = !task.completed
    run({
      id: task._id,
      data: {
        completed,
      },
    })
  }
  useEffect(() => {
    if (result) props.onUpdate(result)
  }, [result])
  return (
    <CustomCard>
      <CustomCardContent>
        <Description>{task.description}</Description>
        <Status onClick={changeStatusHandler} completed={task.completed}>
          Completed
        </Status>
      </CustomCardContent>
      <CardActions>
        <UpdateTask onUpdate={props.onUpdate} task={task}></UpdateTask>
        <Button variant="contained" color="secondary" startIcon={<DeleteIcon />}>
          Delete
        </Button>
      </CardActions>
    </CustomCard>
  )
}
const CustomCard = styled(Card)`
  margin: 1rem;
  width: 275px;
`
const CustomCardContent = styled(CardContent)`
  height: 20rem;
`
const Description = styled.div`
  overflow: hidden;
  font-size: 1.2rem;
  font-weight: 500;
  width: 100%;
  height: 80%;
`
const Status = styled.div<{ completed: boolean }>`
  color: ${(props) => (props.completed ? "green" : "lightgray")};
  cursor: pointer;
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 1.5rem;
  width: 100%;
  height: 20%;
  border-bottom: 1px solid lightgray;
  border-top: 1px solid lightgray;
  transition: 0.25s ease;
`
