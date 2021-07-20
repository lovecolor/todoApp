import { Router } from "react-router"
import { NavBar } from "../components/NavBar"
import { MainLayout } from "../layouts/MainLayout"
import UserProfile from "./UserProfile"

export const HomePage: React.FC = (props) => {
  return (
    <MainLayout>
      <NavBar></NavBar>
      <main>
        
      </main>
    </MainLayout>
  )
}
