import classes from './DietDays.module.css'
import DietDay from "./DietDay.jsx";

function DietDays() {
    return (
        <div className={classes.dietContainer}>
            <DietDay day="monday"/>
            <DietDay day="tuesday"/>
            <DietDay day="wednesday"/>
            <DietDay day="thursday"/>
            <DietDay day="friday"/>
            <DietDay day="saturday"/>
            <DietDay day="sunday"/>
        </div>
    )
}

export default DietDays;