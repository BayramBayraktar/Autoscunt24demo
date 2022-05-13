import Head from 'next/head'
import Header from '../Components/Header';
import Footer from '../components/Footer';
import { Layout } from './style'


const MainLayout = ({ title, children }) => {


  return (
    <Layout>
      <Head>
        <title>{title}</title>
      </Head>
      <Header />
      {children}
      <Footer />
    </Layout>
  )
};

export default MainLayout;