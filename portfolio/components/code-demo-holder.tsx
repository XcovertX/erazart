import Header from './header'

type Props = {
    children?: React.ReactNode
  }

const CodeDemoHolder = ({ children }: Props) => {
  return (
    <div className='min-h-fit flex flex-col'>
      <Header />
      <div className="flex pt-5 justify-center h-full">
        {children}
      </div>
    </div>
  )
}

export default CodeDemoHolder