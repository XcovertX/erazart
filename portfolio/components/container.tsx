import { Analytics } from '@vercel/analytics/react';

type Props = {
  children?: React.ReactNode
}

const Container = ({ children }: Props) => {
  return (
  <div className="container mx-auto px-5">
    {children}
    <Analytics />
    </div>
  )
}

export default Container
