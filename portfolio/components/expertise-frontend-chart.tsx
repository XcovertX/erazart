import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, 
    CategoryScale, 
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend } from 'chart.js'
import { useEffect, useState } from "react";

ChartJS.register(
    CategoryScale, 
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
)

export const FrontendChart = (props: {hidden: boolean}) => {
    
    const frontendData = {
        labels: [
            'React',
            'NextJS',
            'HTML',
            'CSS',
            'Typescript'
        ],
        datasets: [{
            label: 'Language Skill Levels',
            hidden: props.hidden,
            data: [75, 80, 50, 65, 45],
            backgroundColor: [
                '#dc2626',
                '#ea580c',
                '#16a34a',
                '#0d9488',
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

    if(props.hidden) { return <></>}

    return (
            <Bar data={frontendData}  
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