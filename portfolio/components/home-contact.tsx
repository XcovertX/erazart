import { CldImage } from "next-cloudinary";
import SocialLinks from "./social";

type Props = {
    darkMode: boolean;
}

const Contact = ({darkMode}: Props) => {
    const image = (
        <CldImage
          src={'/assets/JCovert.jpg'}
          width={481}
          height={640}
          sizes="100vw"
          alt={`J.Covert`}
          grayscale
          className=''
        />
      )
    return(
        <div className='flex flex-row justify-center w-full h-screen pb-6 pt-24'>
            <div className={`${darkMode? 'bg-rose-900/[.2] text-zinc-100' : 'bg-rose-700/[.3] text-rose-950'}  w-auto flex flex-col md:h-max`}>
                {image}
                <div className='md:hidden text-zinc-100 text-3xl p-5 bg-teal-600 h-1/3'>
                    <div className='p-5 flex flex-col justify-center items-center h-full'>
                        <div className='mb-8'>
                            <SocialLinks dark={darkMode}/>
                        </div>
                        <a href='mailto:james.t.covert@gmail.com'
                            className="text-2xl hover:underline hover:text-rose-600">
                            james.t.covert@gmail.com
                        </a>
                    </div>
                </div>
            </div>

            <div className='hidden md:block text-zinc-100 text-3xl flex flex-col w-2/3  h-full'>
                <div className='text-zinc-100 text-3xl p-5 bg-teal-600 h-1/3'>
                    <div className='p-5 flex flex-col justify-center items-center h-full'>
                        <div className='mb-8'>
                            <SocialLinks dark={darkMode}/>
                        </div>
                        <a href='mailto:james.t.covert@gmail.com'
                            className="text-2xl hover:underline hover:text-rose-600">
                            james.t.covert@gmail.com
                        </a>
                    </div>
                </div>
                <div className='flex flex-row h-2/3'>
                    <div className='text-zinc-100 bg-rose-600 h-full w-full lg:w-2/3 justify-center flex flex-col items-center p-5'>
                        <h3 className='text-xl lg:text-2xl'>Available for freelance opportunities!</h3>
                        <div className='text-lg lg:text-md pt-5'>
                            <h6>Have a project you need help with?</h6>
                            <h6>Feel free to reach out via social media or email!</h6>
                        </div>
                    </div>
                    <div className=' hidden lg:block text-zinc-100 text-3xl p-5 bg-green-600 w-1/3 flex flex-col h-full'>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact