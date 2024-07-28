import classes from './MealContent.module.css';
import {Link} from "react-router-dom";
import {mealTypeMapper} from "../../../../util/nameMappers.js";

function MealContent( {...props } ) {
    const mondayDate = props.mondayDate;
    const dietDayId = props.dietDayId;
    const data = props.responseData;

    return (
        <>
            <div className={classes.mealNav}>
                <Link to={`/diet/${mondayDate}/day/${dietDayId}`}>
                    <div>Wróć</div>
                </Link>
                <div className={classes.totalStats}>
                    <p>Węglowodany: {data.stats.carbs} g</p>
                    <p>Tłuszcz: {data.stats.fats} g</p>
                    <p>Białko: {data.stats.proteins} g</p>
                    <p>Kcal: {data.stats.kcal} kcal</p>
                </div>
            </div>
            <div className={classes.mealContainer}>
                <div className={classes.mealHeader}>
                    <h3>{mealTypeMapper(data.mealType)}</h3>
                </div>
                <ul className={classes.foods}>
                    {data.foods.map((food) => (
                        <li key={food.foodId} className={classes.food}>
                            <div className={classes.foodContainer}>
                                <div className={classes.foodDetails}>
                                    <div className={classes.foodName}>
                                        <h4>{food.name}</h4>
                                        <p>amount: {food.amount} {food.unit}</p>
                                    </div>
                                    <div className={classes.macros}>
                                        <p>carbs: {food.macros.carbs}</p>
                                        <p>fats: {food.macros.fats}</p>
                                        <p>proteins: {food.macros.proteins}</p>
                                        <p>kcal: {food.macros.kcal}</p>
                                    </div>
                                </div>
                                <p className={classes.icon}>icon: {food.category}</p>
                            </div>
                            <div className={classes.foodActions}>
                                <button>
                                    Edytuj
                                </button>
                                <button>
                                    Usuń
                                </button>
                            </div>
                        </li>
                    ))}
                    <li className={classes.add}>
                        <button>+</button>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default MealContent;