import classes from './PieChart.module.css';
import {ArcElement, Chart as ChartJS, Legend, Tooltip} from "chart.js";
import {Pie} from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function PieChart({pieData = [100, 200, 300]}) {
    const data = {
        labels: ['Węglowodany (g)', 'Tłuszcze (g)', 'Białko (g)'],
        datasets: [
            {
                label: 'Średnio w ciągu tygodnia',
                data: pieData,
                backgroundColor: [
                    'rgba(255, 206, 86, 0.35)',
                    'rgba(54, 162, 235, 0.35)',
                    'rgba(255, 99, 132, 0.35)',
                ],
                borderWidth: 0,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                enabled: true,
            },
        },
    };

    return (
        <div className={classes.chartContainer}>
            <Pie data={data} options={options} />
        </div>
    );
}

export default PieChart;