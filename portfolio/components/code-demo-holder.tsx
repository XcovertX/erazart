import Header from './header'

type Props = {
    children?: React.ReactNode
  }

const CodeDemoHolder = ({ children }: Props) => {
  return (
    <div>
      <Header />
      <div className="flex py-5 justify-center">
        {children}
      </div>
    </div>
  )
}

export default CodeDemoHolder