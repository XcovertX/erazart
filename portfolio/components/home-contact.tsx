import { CldImage } from "next-cloudinary";
import SocialLinks from "./social";

type Props = {
    theme: string;
}

const Contact = ({ theme }: Props) => {
        const image = (
                <CldImage
                    src={'/assets/JC_portrait_new.jpg'}
                    width={481}
                    height={640}
                    sizes=""
                    alt={`J.Covert`}
                    className='w-full h-full object-cover flex-1'
                />
            )
        return(
                <div className='flex flex-col md:flex-row justify-center w-full pb-6 pt-24 md:mx-0 mx-0'>
                        <div className={`${theme == "dark"? 'bg-emerald-600/[.9] text-zinc-100' : 'bg-amber-600/[.9] text-emerald-950'} flex-1 min-h-[300px] md:min-h-0 h-64 md:h-auto overflow-clip flex flex-col justify-center`}>
                                {image}
                <div className={`${theme == "dark"? 'bg-emerald-600/[.9] text-zinc-100' : 'bg-amber-600/[.9] text-emerald-950'} md:hidden text-zinc-100 text-3xl p-5 h-1/4`}>
                    <div className=' flex flex-col justify-start items-center '>
                        <div className=''>
                        <SocialLinks theme={theme}
                            color='white'
                            highlightColor='red'
                            dmColor='white'
                            dmHighlightColor='orange'/>
                        </div>
                        <a href='mailto:james.t.covert@gmail.com'
                            className={`${theme == "dark"? 'hover:underline hover:text-amber-600' : 'hover:underline hover:text-red-600'} text-2xl`}>
                            james.t.covert@gmail.com
                        </a>
                    </div>
                </div>
            </div>

            <div className='hidden md:block text-zinc-100 text-3xl flex flex-col w-auto h-auto'>
                <div className={`text-zinc-100 text-3xl p-5 h-1/3 ${theme == 'dark'? 'bg-red-600/[.9] text-zinc-100' : 'bg-emerald-600/[.9] text-emerald-950'}`}>
                    <div className='p-5 flex flex-col justify-center items-center h-full'>
                        <div className='mb-8'>
                        <SocialLinks theme={theme}
                            color='white'
                            highlightColor='red'
                            dmColor='white'
                            dmHighlightColor='orange'/>
                        </div>
                        <a href='mailto:james.t.covert@gmail.com'
                            className={`text-2xl hover:underline ${theme == "dark"? 'hover:underline hover:text-amber-600' : 'hover:underline hover:text-red-600'}`}>
                            james.t.covert@gmail.com
                        </a>
                    </div>
                </div>
                <div className='flex flex-row h-2/3'>
                    <div className={`text-center text-zinc-100 ${theme == 'dark'? 'bg-emerald-600/[.9] text-zinc-100' : 'bg-amber-600/[.9] text-emerald-950'} h-full w-full justify-center flex flex-col items-center p-5`}>
                        <h3 className='text-xl font-bold lg:text-2xl'>Available for freelance opportunities!</h3>
                        <div className='text-lg lg:text-md pt-5'>
                            <h6 className='pb-2'>Have a project you need help with?</h6>
                            <h6>Feel free to reach out via social media or email!</h6>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact