import dynamic from 'next/dynamic' 
import { use, useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../context/context';
const apiUrl = "https://api.github.com/graphql";
const username = process.env.GITHUB_USERNAME;
const accessToken = process.env.GITHUB_ACCESS_TOKEN;


function renderTable(weeks: []) {
    const { theme } = useContext(ThemeContext);
    let zeroColor, oneColor, twoColor, threeColor, fourColor, elseColor;
    if(theme == 'dark') {
        zeroColor   = 'bg-emerald-100/[.15]'
        oneColor    = 'bg-emerald-300'
        twoColor    = 'bg-emerald-400'
        threeColor  = 'bg-emerald-500'
        fourColor   = 'bg-emerald-600'
        elseColor   = 'bg-emerald-700'
    } else {
        zeroColor   = 'bg-amber-300/[.5]'
        oneColor    = 'bg-amber-400'
        twoColor    = 'bg-amber-500'
        threeColor  = 'bg-amber-600'
        fourColor   = 'bg-amber-700'
        elseColor   = 'bg-amber-900'
    }
    let table = [];
    for (let dayOfWeek = 0; dayOfWeek < 7; dayOfWeek++) {
        let children = [];
        for (let weekIndex = 0; weekIndex < 53; weekIndex++) {
        const week: { contributionDays: [] } = weeks[weekIndex];
        const contributionDay: { contributionCount: number, date:Date } = week.contributionDays[dayOfWeek];
        const contributionCount = contributionDay ? contributionDay.contributionCount : 0;
        const date = contributionDay ? contributionDay.date : 0;
        let contributionColor;
        if (contributionCount < 1) {
            contributionColor = zeroColor;
        } else if (contributionCount < 2) {
            contributionColor = oneColor;
        } else if (contributionCount < 3) {
            contributionColor = twoColor;
        } else if (contributionCount < 4) {
            contributionColor = threeColor;
        } else if (contributionCount < 5) {
            contributionColor = fourColor;
        } else {
            contributionColor = elseColor;
        }
        children.push({key: weekIndex, color: contributionColor, count: contributionCount, date: date })
        }
        table.push({key: dayOfWeek, c: children})
    }
    return table;
}

const GithubContributions = ({ conts }) => {

    const [contributions, setContributions] = useState(conts);
    let calendar, weeks, table;
    if(contributions != undefined) {
        weeks = contributions.weeks;
        table = renderTable(weeks);
    }
    const { theme } = useContext(ThemeContext);
    let headerColor;
    if(theme == 'dark') {
        headerColor = 'bg-emerald-500/[.5]'
    } else {
        headerColor = 'bg-amber-500/[.8]'
    }


    useEffect(() => {
        setContributions(conts);

    }, [conts])

    return (
        <div className=''>
            <div className={`text-center text-2xl ${headerColor} mx-1 mb-2 py-5 font-bold`}>
                Github Contributions
            </div>
            <table className='cursor-pointer mb-10'>
                <tbody className=''>
                    {table.map(e => {
                        return (
                            <>
                                <tr className={`h-1`}></tr>
                                <tr key={e.key} className={''}>
                                    {e.c.map(w => {
                                        return (
                                            <td className={`group p-0 relative`}>
                                            <div className={'hidden group-hover:block bg-zinc-950 p-2 right-[-5rem] absolute bottom-6 w-60 rounded-md text-center'}>{w.count} contributions on {w.date}</div>
                                            <td className={`w-1 `}></td>
                                            <td key={w.key} className={`${w.color} ring-2 ring-transparent group-hover:ring-white h-1 w-1 p-1 lg:p-2 rounded-sm `}></td>
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
        </div>
    )
}

export default dynamic(() => Promise.resolve(GithubContributions), { ssr: false });
// export default GithubContributions