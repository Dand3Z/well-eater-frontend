import classes from './DietDay.module.css';

function DietDay({ day }) {
    return (
        <div className={`${classes[day]} ${classes.day}`}>
            {day}
        </div>
    )
}

export default DietDay;