import MainLayout from "../Layouts/Main";
import Homepage from '../Containers/HomePage'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'


export const getStaticProps = async (context) => {

  console.log()

  return {
    props: {
      ...(await serverSideTranslations(context.locale, ['home'])),
    }
  }
}


const HomePage = (props) => {

  return (
    <MainLayout title="AutoScout24 Europe&#x27;s car market for new and used cars">
      <Homepage />
    </MainLayout>
  )
}


export default HomePage;