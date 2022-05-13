import Head from 'next/head'
import Header from '../components/header/index.js';
import Footer from '../components/footer/index.js';
import { Layout} from './style'


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