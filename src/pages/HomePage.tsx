import { Layout } from "../components/layout/Layout"
import { MainLayout } from "../layouts/MainLayout"

export const HomePage: React.FC = (props) => {
  return (
    <MainLayout>
      <Layout>
        <h1>HomePage</h1>
      </Layout>
    </MainLayout>
  )
}
