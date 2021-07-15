import { Router } from "react-router"
import { MainNavigation } from "../components/layout/MainNavigation"
import { MainLayout } from "../layouts/MainLayout"
import UserProfile from "./UserProfile"

export const HomePage: React.FC = (props) => {
  return (
    <MainLayout>
      <MainNavigation></MainNavigation>
      <main>
        
      </main>
    </MainLayout>
  )
}
