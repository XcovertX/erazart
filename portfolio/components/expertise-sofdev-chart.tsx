import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, 
    CategoryScale, 
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend } from 'chart.js'

ChartJS.register(
    CategoryScale, 
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
)







export const SoftwareDevChart = (props:{hidden: boolean}) => {

    const softwareDevData = {
        labels: [
            'Java    ',
            'C         ',
            'Python',
            'Clojure',
            'Prolog ',
            'C++     ',
        ],
        datasets: [{
            label: 'Language Skill Levels',
            hidden: props.hidden,
            data: [90, 55, 50, 70,  35, 45],
            backgroundColor: [
                '#dc2626',
                '#ea580c',
                '#16a34a',
                '#0284c7',
                '#4f46e5',
                '#db2777',
            ],
            borderWidth: 1,
            borderColor: 'rgba(255, 255, 255)',
            hoverBorderWidth: 2.5,
            hoverBorderColor: 'white',
            hoverOffset: 5,
        }]
    }

    if(props.hidden) { return <></>}
    
    return (
        <Bar data={softwareDevData}  
                       options={{
                        
                        animations: {
                            x: {
                                duration: 0
                            },
                            y: {
                                from: 0,
                            },
                        },
                        plugins: {
                            legend: {
                                display: false,
                                position: 'left',
                                labels: {
                                    font: {
                                        size: 14,
                                    },
                                    color: 'white',
                                }
                            }
                        },
                        layout: {


                        },
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                            x: {
                                ticks: {
                                    color: 'rgba(255, 255, 255)',
                                    minRotation: 90,
                                    mirror: false,
                                    padding: -80,
                                    z: 50,
                                    font: {
                                        size: 20,
                                    },
                                },
                                
                                grid: {
                                    display: true,
                                    color: 'rgba(255, 255, 255, .35)',
                                },
                            },
                            y: {
                                beginAtZero: true,
                                ticks: {
                                    backdropColor: 'rgba(0,0,0,0)',
                                    color: 'rgba(255, 255, 255)',
                                    z: 50,
                                    major: {
                                        enabled: true
                                    },
                                },
                                min: 0,
                                max: 100,
                                grid: {
                                    display: true,
                                    color: 'rgba(255, 255, 255, .35)'
                                },
                            } 
                        }
                    }
                } 
            />
            
        
    );
};