import { useContext } from "react"
import { NavBar } from "../components/NavBar"
import { TaskList } from "../components/tasks/TaskList"
import { Loading } from "../components/text/Loading"
import TaskContext from "../contexts/TaskProvider"
import { MainLayout } from "../layouts/MainLayout"

export const HomePage: React.FC = (props) => {
  const taskCtx = useContext(TaskContext)
  return (
    <MainLayout>
      <NavBar></NavBar>
      <main>
        {taskCtx.loading && <Loading>Loading...</Loading>}
        <TaskList list={taskCtx.tasks}></TaskList>
      </main>
    </MainLayout>
  )
}
