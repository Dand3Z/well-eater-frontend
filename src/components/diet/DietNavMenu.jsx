import classes from "./DietNavMenu.module.css";
import DatePicker from "./DatePicker.jsx";

function DietNavMenu({ currentMonday, currentSunday, onClick }) {
    return (
        <div className={classes.headerContainer}>
            <DatePicker
                currentMonday={currentMonday}
                currentSunday={currentSunday}
                onClick={onClick}
            />
        </div>
    );
}

export default DietNavMenu;