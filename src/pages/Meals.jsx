import Meal from "../components/diet/meals/Meal.jsx";

function getMealData(data, mealType) {
    return data.meals.find((m) => m.mealType === mealType);
}

function MealsPage({ day, data }) {
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

export default MealsPage;