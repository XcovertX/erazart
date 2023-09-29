import dynamic from 'next/dynamic' 
import { use, useEffect, useState } from 'react';
const apiUrl = "https://api.github.com/graphql";
const username = process.env.GITHUB_USERNAME;
const accessToken = process.env.GITHUB_ACCESS_TOKEN;



const GithubContributions = ({ conts }) => {

    const [contributions, setContributions] = useState(conts);
    let calendar, weeks, table;
    if(contributions != undefined) {
        weeks = contributions.weeks;
        table = renderTable(weeks);
    }
    useEffect(() => {
        setContributions(conts);
    }, [conts])

    
    function renderTable(weeks: []) {
        let table = [];
        for (let dayOfWeek = 0; dayOfWeek < 7; dayOfWeek++) {
            let children = [];
            for (let weekIndex = 0; weekIndex < 53; weekIndex++) {
            const week: { contributionDays: [] } = weeks[weekIndex];
            const contributionDay: { contributionCount: number } = week.contributionDays[dayOfWeek];
            const contributionCount = contributionDay ? contributionDay.contributionCount : 0;
            let contributionColor;
            if (contributionCount == 0) {
                contributionColor = 'bg-green-100/[.15]';
            } else if (contributionCount < 2) {
                contributionColor = 'bg-green-300';
            } else if (contributionCount < 3) {
                contributionColor = 'bg-green-400';
            } else if (contributionCount < 5) {
                contributionColor = 'bg-green-600';
            } else if (contributionCount < 7) {
                contributionColor = 'bg-green-800';
            } else {
                contributionColor = 'bg-green-900';
            }
            children.push({key: weekIndex, color: contributionColor, count: contributionCount})
            }
            table.push({key: dayOfWeek, c: children})
        }
        return table;
    }

    return (
        <table className='mb-2 cursor-pointer'>
            <tbody className=''>
                {table.map(e => {
                    return (
                        <>
                            <tr className={`h-1`}></tr>
                            <tr key={e.key} className={''}>
                                {e.c.map(w => {
                                    return (
                                        <td className={`group p-0 relative`}>
                                        <div className={'hidden group-hover:block bg-zinc-950 p-2 right-[-5rem] absolute bottom-6 w-48 rounded-md text-center'}>{w.count} contributions this day</div>
                                        <td className={`w-1 `}></td>
                                        <td key={w.key} className={`${w.color} ring-2 ring-transparent group-hover:ring-white h-1 w-1 p-2 rounded-sm `}></td>
                                        <td className={`w-1 `}></td>
                                        </td>
                                    )
                                })}
                            </tr>
                            <tr className={`h-1 `}></tr>
                        </>)
                })}
            </tbody>
        </table>
    )
}

// export default dynamic(() => Promise.resolve(GithubContributions), { ssr: false });
export default GithubContributions