import { useEffect } from "react"
import { useState } from "react"
import { Router } from "react-router"
import styled from "styled-components"
import { NavBar } from "../components/NavBar"
import { TaskItem } from "../components/tasks/TaskItem"
import { TaskList } from "../components/tasks/TaskList"
import { useAppApiClient } from "../hooks/useAppApiClient"
import useAsync from "../hooks/useAsync"
import { MainLayout } from "../layouts/MainLayout"
import { Task } from "../services/api/types/Task"
import { Error, Loading } from "./Register"
import UserProfile from "./UserProfile"

export const HomePage: React.FC = (props) => {
  return (
    <MainLayout>
      <NavBar></NavBar>
      <main>
        <TaskList></TaskList>
      </main>
    </MainLayout>
  )
}
