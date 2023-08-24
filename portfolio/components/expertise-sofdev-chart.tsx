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



const softwareDevData = {
    labels: [
        'Java',
        'C',
        'Python',
        'Clojure',
        'Rust',
        'Prolog',
        'C++',
    ],
    datasets: [{
        label: 'Language Skill Levels',
        data: [90, 55, 50, 70, 20, 35, 45],
        backgroundColor: [
            '#dc2626',
            '#ea580c',
            '#16a34a',
            '#0d9488',
            '#0284c7',
            '#4f46e5',
            '#db2777',
        ],
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, .35)',
        hoverBorderWidth: 1.5,
        hoverBorderColor: 'white',
        hoverOffset: 5,

    }]
}



export const SoftwareDevChart = () => {
    
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
                                    color: 'white'
                                }
                            }
                        },
                        layout: {
                            padding: 10
                        },
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                            y: {
                                beginAtZero: true,
                                ticks: {
                                    backdropColor: 'rgba(0,0,0,0)',
                                    color: 'rgba(255, 255, 255, .35)',
                                    z: 50,
                                    major: {
                                        enabled: true
                                    }
                                },
                                min: 0,
                                max: 100,
                                grid: {
                                    display: false,
                                    color: 'rgba(255, 255, 255, .35)',
                                    z: 50,
                                    
                                },
                            } 
                        }
                    }
                } 
            />
        
    );
};