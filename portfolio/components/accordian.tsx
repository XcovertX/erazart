import { useEffect, useState } from "react";
import classNames from "classnames";
import { CaretIcon } from "./caret-icon";
import Image from "next/image";
import Job from "../interfaces/job";

type Props = {
    jobs: Job[];
}

const ExperienceAccordian = ({ jobs }: Props) => {
    const [currentOpen, setCurrentOpen] = useState(2);

    function handleSwitch(key){
        setCurrentOpen(key)
    }
    return (
        <section>
          <div className="mt-5 mx-2 md:mx-36 text-sm md:text-lg flex flex-col items-center justify-center">
            {jobs.map((job, i) => (
              <AccordionEntry
                AEid={i}
                key={i}
                jobName={job.jobName}
                jobTitle={job.jobTitle}
                location={job.location}
                startDate={job.startDate}
                endDate={job.endDate}
                description={job.description}
                companyLink={job.companyLink}
                companyLogo={job.companyLogo}
                frameLang={job.frameLang}
                currentOpen={currentOpen}
                handleSwitch={handleSwitch}
              />
            ))}
          </div>
        </section>
      )
}

const AccordionEntry = ({AEid,
                         jobName, 
                         jobTitle, 
                         location, 
                         startDate, 
                         endDate, 
                         description,
                         companyLink,
                         companyLogo,
                         frameLang,
                         currentOpen, handleSwitch}) => {
 const [open, setOpen] = useState(false);

 useEffect(() =>{
    if(currentOpen == AEid) {
        setOpen(!open);
    } else {
        setOpen(false)
    }
 }, [currentOpen])


 return (
   <div className="w-full h-full">
        <input
            id="expandCollapse"
            checked={open}
            readOnly
            type="checkbox"
            className="peer sr-only"
        />
        <label
            htmlFor="expandCollapse"
            className={classNames(
                `w-full flex justify-between items-center ${currentOpen == AEid? 'bg-green-600' : 'bg-purple-900'}  text-zinc-100 rounded-md py-2 md:py-3 px-2 md:px-5`,
                "transition-colors duration-1000 ease-in-out"
            )}
            onClick={currentOpen == AEid? () => {
                handleSwitch(-1);
            } 
            : 
            () => {
                handleSwitch(AEid);
            }}
        >
        {`${jobTitle} @ ${jobName}`}
        <div className='flex flex-row justify-end'>
            {`${startDate} - ${endDate? endDate : 'Present'}`}
            <CaretIcon
                height={20}
                width={20}
                className={classNames("ml-2 md:ml-4", {
                "rotate-180": open,
                })}
            />
        </div>

        </label>
        <div
        className={classNames(
            "overflow-hidden mb-1 mt-1 h-0 bg-purple-950 rounded-md",
            "peer-checked:h-[250px] peer-checked:mt-2 peer-checked:mb-2",
            "transition-[height,margin] duration-1000 ease-in-out",
        )}
        >
            <div className='flex flex-row h-full'>
                <div className="p-5 flex flex-col justify-between text-zinc-100">
                    <div className='flex flex-row justify-start'>
                        <div className="flex flex-col justify-center pr-2">
                            <Image 
                                width={20}
                                height={20}
                                src={'/assets/location_icon_green.png'} 
                                alt={'location'}
                                />
                        </div>
                        
                        <h3 className='pr-10'>{location}</h3>
                        <a  href={companyLink}
                            className='flex flex-row justify-start'
                            target="_blank">
                            <div className='pr-2 flex flex-col justify-center'>
                                <Image 
                                    width={20}
                                    height={20}
                                    src={'/assets/external_link_green.png'} 
                                    alt={'location'}
                                    />
                            </div>
                            {companyLink}
                        </a>
                    </div>
                    <div className='mb-5'>
                        {description}
                    </div>
                    <div className='flex flex-row justify-start'>
                        {frameLang.map((fm, i) => (
                        <div
                            key={i}
                            className='px-2 md:px-5 py-2 mr-2 text-sm md:text-lg bg-purple-600 rounded-full'
                        >
                            {fm}
                        </div>
                        ))}
                    </div>

                </div>
                <div className="hidden md:block relative w-full min-w-[100px] h-auto flex justify-center items-center pr-2 m-5">
                    <Image 
                        fill
                        sizes="(max-width: 100px) 100vw"
                        style={{objectFit:"scale-down"}}
                        src={companyLogo} 
                        alt={jobName}
                        />
                </div>
            </div>
        </div>
    </div>
 );
};


export default ExperienceAccordian;