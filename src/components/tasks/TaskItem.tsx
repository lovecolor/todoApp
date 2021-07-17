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

export const TaskItem: React.FC<{
  task: Task
}> = (props) => {
  const { task } = props
  return (
    <CustomCard>
      <CustomCardContent>
        <Description>{task.description}</Description>
        <Status completed={task.completed}>Completed</Status>
      </CustomCardContent>
      <CardActions>
        <ButtonPrimary variant="contained" color="primary" startIcon={<EditIcon />}>
          Edit
        </ButtonPrimary>
        <Button variant="contained" color="secondary" startIcon={<DeleteIcon />}>
          Delete
        </Button>
      </CardActions>
    </CustomCard>
  )
}
const CustomCard = styled(Card)`
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
  transform: .25s ease;
`
