
const HomeTitle = ({dark}) => {
    return(
        <div className={`flex-col flex justify-center ${dark? 'text-zinc-100' : 'text-red-700'}`}>
            <h1 className={` ${dark? '' : '' } text-center lg:text-9xl md:text-8xl text-6xl font-bold tracking-tighter leading-tight`}>
                JAMES COVERT
            </h1>
            <div className={`${dark? 'text-green-600' : 'text-green-600'} text-center hidden md:block text-xl md:text-3xl lg:text-4xl font-bold tracking-tighter leading-tight`}>
                SOFTWARE ENGINEER \\ FULL STACK \\ WEB DEV
            </div>
            <h3 className="text-green-600 text-center md:hidden text-lg font-bold tracking-tighter leading-tight">
                SE \\ FS \\ WD
            </h3>
        </div>
    )
}

export default HomeTitle