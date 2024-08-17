import classes from './DietDaySummary.module.css';
import Icon from "../../util/importIcons.jsx";
import PieChart from "../general/PieChart.jsx";
import {calculateMean} from "../../util/food.js";

function DietDaySummary({dietDays}) {
    const daysAmount = dietDays.length;
    const mean = {
        carbs: calculateMean(dietDays.map(day => day.stats.stats.carbs)),
        fats: calculateMean(dietDays.map(day => day.stats.stats.fats)),
        proteins: calculateMean(dietDays.map(day => day.stats.stats.proteins)),
        kcal: calculateMean(dietDays.map(day => day.stats.stats.kcal)),
    };

    return (
        <>
            {daysAmount !== 0 &&
                <div className={classes.summaryContainer}>
                    <div className={classes.summaryHeader}>
                        <Icon className={'smallIcon'} type={'NAV'} value={'CHART_BAR_SQUARE'}/>
                        <p>Statystki dla aktualnie wybranego tygodnia</p>
                    </div>
                    <div className={classes.summaryBody}>
                        <div className={classes.chart}>
                            <PieChart pieData={[mean.carbs, mean.fats, mean.proteins]}/>
                        </div>
                        <div className={classes.details}>
                            <p className={classes.activeDays}>Liczba aktywnych dni w aktualnym
                                tygodniu: {daysAmount}</p>
                            <p className={classes.meanHeading}>Średnie wartości na dzień:</p>
                            <ul>
                                <li>Węglowodany: {mean.carbs} g</li>
                                <li>Tłuszcze: {mean.fats} g</li>
                                <li>Białka: {mean.proteins} g</li>
                                <li>Kcal: {mean.kcal}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            }
        </>)
}

export default DietDaySummary;