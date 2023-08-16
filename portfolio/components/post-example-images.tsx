import Image from '../interfaces/image'
import ExampleImage from './example-image'

type Props = {
  images: Image[]
}


const PostExampleImages = ({ images }: Props) => {
  const imgs = (images.map((img, i) => {
    return (
      <div key={i} className="mb-8 md:mb-16 sm:mx-0">
        <ExampleImage title={img.name} src={img.picture} />
      </div>
    )
  }))

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl my-5 font-bold">Sample Outputs</h1>
      {imgs? imgs: "no images to show"}
    </div>
  )
}

export default PostExampleImages
