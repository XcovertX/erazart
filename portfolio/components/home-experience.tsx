import ExperienceAccordian from "./accordian";
import Job from "../interfaces/job";

type Props = {
    darkMode: boolean;
}

const jobs: Job[] = [
    {
        jobName: 'TNC-CNC',
        jobTitle: 'Web Developer',
        location: 'Remote (Auburn, WA)',
        startDate: 'January 2023',
        endDate: '',
        description: "Developed a premium, high performing website that provides B2B and B2C fabrication solutions useing React.js, Next.js and Express.js frameworks",
        companyLink: 'tncdesigns.com',
        companyLogo: '/assets/TNCCNC_logo_white.png',
        frameLang: ['Javascript', 'NextJS', 'ExpressJS', 'ReactJS']
    },
    {
        jobName: 'Genics',
        jobTitle: 'Web Developer Internship',
        location: 'Remote (United Kingdom)',
        startDate: 'August 2022',
        endDate: 'May 2023',
        description: 'During my senior year at Arizona State University, I worked with a team of developers to build a prototype platform that provides authenticated certification for university lecture attendance.',
        companyLink: 'tncdesigns.com',
        companyLogo: '/assets/genics_logo.png',
        frameLang: ['Javascript', 'NextJS', 'ExpressJS', 'MongoDB']
    },
    {
        jobName: 'Arizona State University',
        jobTitle: 'Student',
        location: 'Remote (Tempe, AZ)',
        startDate: 'August 2018',
        endDate: 'July 2023',
        description: 'After leaving the military, I returned to school to pursue a BS in Software Engineering. I graduated in July of 2023.',
        companyLink: 'asu.edu',
        companyLogo: '/assets/asu_logo.png',
        frameLang: ['Java', 'Python', 'Clojure', 'SQL',]  
    }

]

const Experience = ({darkMode}: Props) => {
    return(
        <div className={`pt-20 flex-col flex justify-start ${darkMode? 'text-zinc-100' : 'text-purple-900'}`}>
            <h1 className=" text-center text-5xl md:text-7xl font-bold tracking-tighter leading-tight">
                Professional Experience
            </h1>
            <div className="mt-2 text-green-500 text-center hidden md:block text-xl lg:text-3xl font-bold tracking-tighter leading-tight">
                SOFTWARE ENGINEER \\ FULL STACK \\ WEB DEV
            </div>
            <ExperienceAccordian jobs={jobs} />
        </div>
    )
}

export default Experience