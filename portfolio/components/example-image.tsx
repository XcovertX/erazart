import cn from 'classnames'
import Link from 'next/link'
import { CldImage } from 'next-cloudinary'

type Props = {
  title: string
  src: string
}

const ExampleImage = ({ title, src }: Props) => {

  const image = (
    <CldImage
      src={src}
      width={650}
      height={325}
      alt={title}
    />
  )
  return (
    <div className="sm:mx-0">
        {image}
    </div>
  )
}

export default ExampleImage