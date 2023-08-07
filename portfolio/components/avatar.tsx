import { CldImage } from "next-cloudinary"

type Props = {
  name: string
  picture: string
}

const Avatar = ({ name, picture }: Props) => {
  return (
    <div className="flex items-center">
      <CldImage 
      src={picture} 
      className="w-12 h-12 rounded-full mr-4" 
      alt={name} 
      width={100} 
      height={100}/>
      <div className="text-xl font-bold">{name}</div>
    </div>
  )
}

export default Avatar
