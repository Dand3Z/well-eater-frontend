import classes from './DietDaySummary.module.css';
import Icon from "../../util/importIcons.jsx";

function DietDaySummary({dietDays}) {
    console.log(dietDays);

    return (
        <>
            {dietDays.length !== 0 &&
                <div className={classes.summaryContainer}>
                    <div className={classes.summaryHeader}>
                        <Icon className={'smallIcon'} type={'NAV'} value={'CHART_BAR_SQUARE'}/>
                        <p>Statystki dla aktualnie wybranego tygodnia</p>
                    </div>
                    <div>
                        <p>W aktualnie wybranym tygodniu jest {dietDays.length} aktywnych dni. Średnio dla każdego z
                            tych dni </p>
                    </div>
                </div>
            }
        </>)
}

export default DietDaySummary;