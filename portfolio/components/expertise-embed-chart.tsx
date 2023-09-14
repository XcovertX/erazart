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

export const EmbedDevChart = (props:{hidden: boolean}) => {

    const embedDevData = {
        labels: [
            'Embedded C',
            'Assembly',
            'Rust'
        ],
        datasets: [{
            label: 'Language Skill Levels',
            hidden: props.hidden,
            data: [80, 35, 20],
            backgroundColor: [
                '#dc2626',
                '#16a34a',
                '#4f46e5',

            ],
            borderWidth: 1,
            borderColor: 'rgba(255, 255, 255, .35)',
            hoverBorderWidth: 1.5,
            hoverBorderColor: 'white',
            hoverOffset: 5,
        }]
    }

    if(props.hidden) { return <></>}
    
    return (
        <Bar data={embedDevData}  
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
                            padding: 10
                        },
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                            x: {
                                ticks: {
                                    
                                    color: 'rgba(255, 255, 255)',
                                    minRotation: 90,
                                    padding: -130,
                                    z: 50,
                                    font: {
                                        size: 20
                                    }
                                }
                            },
                            y: {
                                beginAtZero: true,
                                ticks: {
                                    backdropColor: 'rgba(0,0,0,0)',
                                    color: 'rgba(255, 255, 255)',
                                    z: 50,
                                    major: {
                                        enabled: true
                                    }
                                },
                                min: 0,
                                max: 100,
                                grid: {
                                    display: false,
                                    color: 'rgba(255, 255, 255)',
                                    z: 50,
                                    
                                },
                            } 
                        }
                    }
                } 
            />
            
        
    );
};