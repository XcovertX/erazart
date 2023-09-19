import Container from '../../components/container'
import Layout from '../../components/layout'
import Head from 'next/head'
import { CMS_NAME } from '../../lib/constants'
import Post from '../../interfaces/post'
import DifferentialGrowthContainer from '../../differential-growth-core/demo-1/dif-gro-example-1'
import CodeDemoHolder from '../../components/code-demo-holder'
import ThemeToggle from '../../components/dark-mode'


export default function Index() {

  return (
    <>
      <Layout>
        <Head>
          <title>{`${CMS_NAME}`}</title>
        </Head>
        <Container>
          <CodeDemoHolder>
            <DifferentialGrowthContainer />
          </CodeDemoHolder>
          <ThemeToggle location='codeProjects'/>
        </Container>
      </Layout>
    </>
  )
}