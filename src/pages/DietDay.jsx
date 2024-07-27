import Meal from "../components/diet/meals/Meal.jsx";
import {checkAuthLoader} from "../util/auth.js";

function getMealData(data, mealType) {
    return data.meals.find((m) => m.mealType === mealType);
}

function DietDayDetails({ day, data }) {
    return (
        <div>
            <Meal meal="breakfast" day={day} data={getMealData(data, "BREAKFAST")}/>
            <Meal meal="lunch" day={day} data={getMealData(data, "LUNCH")}/>
            <Meal meal="dinner" day={day} data={getMealData(data, "DINNER")}/>
            <Meal meal="snack" day={day} data={getMealData(data, "SNACK")}/>
            <Meal meal="supper" day={day} data={getMealData(data, "SUPPER")}/>
        </div>
    )
}

export default DietDayDetails;

export async function loader({ params }) {
    // Check if this check is necessary :)
    const authResult = checkAuthLoader();
    if (authResult instanceof Response) {
        return authResult;
    }
    console.log(params);

    //const
}

