import ExperienceAccordian from "./accordian";
import Job from "../interfaces/job";

type Props = {
    theme: string;
}

const jobs: Job[] = [
    {
        jobName:    'Valkyrie Enterprises',
        jobTitle:   'Lead Software Engineer',
        location:   'Fredericksburg, VA',
        startDate:  'May 2024',
        endDate:    '',
        description: "Research, test and develop high quality signal processing solutions for cutting-edge radar applications.",
        companyLink: '',
        companyLogo: '/assets/valkyrie.png',
        frameLang: ['Python', 'C', 'C++']
    },
    {
        jobName:    'The Stor-House',
        jobTitle:   'Software Developer',
        location:   'Puyallup, WA',
        startDate:  'August 2018',
        endDate:    'April 2024',
        description: "Designed and developed a storage management application (Stor-Pro), providing rental management, gate access control and invoice tracking to store managers. The application uses React.js, Next.js and Express.js frameworks and Mongdb for data storage.",
        companyLink: '',
        companyLogo: '/assets/stor-pro.png',
        frameLang: ['Javascript', 'NextJS', 'ExpressJS', 'ReactJS']
    },
    {
        jobName: 'Genics Certifications',
        jobTitle: 'Web Developer',
        location: 'Remote (United Kingdom)',
        startDate: 'August 2022',
        endDate: 'May 2023',
        description: 'I worked with a team of developers to build a prototype platform that provides blockchain authenticated certifications for university lecture attendance.',
        companyLink: '',
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

const Experience = ({ theme }: Props) => {
    return(
        <div className={`pt-20 flex-col flex justify-start ${theme == "dark"? 'text-zinc-100' : 'text-purple-900'}`}>
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