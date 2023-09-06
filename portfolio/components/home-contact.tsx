import { CldImage } from "next-cloudinary";
import SocialLinks from "./social";

type Props = {
    darkMode: boolean;
}

const Contact = ({darkMode}: Props) => {
    const image = (
        <CldImage
          src={'/assets/JC_Gray.jpg'}
          width={481}
          height={640}
          sizes=""
          alt={`J.Covert`}
          className=''
        />
      )
    return(
        <div className='flex flex-row justify-center mx-32 md:mx-0 w-full h-full pb-6 pt-24'>
            <div className={`${darkMode? 'bg-teal-600 text-zinc-100' : 'bg-teal-600 text-rose-950'} w-auto h-3/4 sm:h-full overflow-clip flex flex-col`}>
                {image}
                <div className='md:hidden text-zinc-100 text-3xl p-5 bg-teal-600 h-1/4'>
                    <div className=' flex flex-col justify-start items-center '>
                        <div className=''>
                            <SocialLinks darkMode={darkMode} section={4}/>
                        </div>
                        <a href='mailto:james.t.covert@gmail.com'
                            className="text-2xl hover:underline hover:text-rose-600">
                            james.t.covert@gmail.com
                        </a>
                    </div>
                </div>
            </div>

            <div className='hidden md:block text-zinc-100 text-3xl flex flex-col w-auto h-auto'>
                <div className='text-zinc-100 text-3xl p-5 bg-teal-600 h-1/3'>
                    <div className='p-5 flex flex-col justify-center items-center h-full'>
                        <div className='mb-8'>
                            <SocialLinks darkMode={darkMode} section={4}/>
                        </div>
                        <a href='mailto:james.t.covert@gmail.com'
                            className="text-2xl hover:underline hover:text-rose-600">
                            james.t.covert@gmail.com
                        </a>
                    </div>
                </div>
                <div className='flex flex-row h-2/3'>
                    <div className='text-center text-zinc-100 bg-rose-600 h-full w-full justify-center flex flex-col items-center p-5'>
                        <h3 className='text-xl font-bold lg:text-2xl'>Available for freelance opportunities!</h3>
                        <div className='text-lg lg:text-md pt-5'>
                            <h6 className='pb-2'>Have a project you need help with?</h6>
                            <h6>Feel free to reach out via social media or email!</h6>
                        </div>
                    </div>
                    {/* <div className=' hidden lg:block text-zinc-100 text-3xl p-5 bg-green-600 w-1/3 flex flex-col h-full'>

                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default Contact