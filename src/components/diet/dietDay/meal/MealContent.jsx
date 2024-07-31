import classes from './MealContent.module.css';
import {Link} from "react-router-dom";
import {mealTypeMapper} from "../../../../util/nameMappers.js";
import {useState} from "react";
import EditFoodForm, {editFoodAction} from './EditFoodForm.jsx';
import {calculateMacro} from "../../../../util/food.js";
import DeleteFoodForm, {deleteFoodAction} from "./DeleteFoodForm.jsx";
import AddFoodForm, {addFoodAction} from "./AddFoodForm.jsx";

function MealContent( {...props } ) {
    const [mealData, setMealData] = useState(props.responseData);
    const [currentFood, setCurrentFood] = useState(null);
    const [showEditForm, setShowEditForm] = useState(false);
    const [showDeleteForm, setShowDeleteForm] = useState(false);
    const [showAddForm, setShowAddForm] = useState(false);

    const mondayDate = props.mondayDate;
    const dietDayId = props.dietDayId;
    const data = mealData;

    function handleEditClick(food) {
        setCurrentFood(food);
        setShowEditForm(true);
    }

    async function handleEditSubmit(mealFoodId, newAmount) {
        try {
            const newMealData = await editFoodAction(mealFoodId, newAmount);
            sortFoodsInMeal(newMealData);
            setMealData(newMealData);
            setShowEditForm(false);
        } catch (error) {
            console.error(error);
        }
    }

    function handleDeleteClick(food) {
        setCurrentFood(food);
        setShowDeleteForm(true);
    }

    async function handleDeleteSubmit(mealFoodId) {
        try {
            const newMealData = await deleteFoodAction(mealFoodId);
            sortFoodsInMeal(newMealData);
            setMealData(newMealData);
            setShowDeleteForm(false);
        } catch (error) {
            console.error(error);
        }
    }

    function handleAddClick() {
        setShowAddForm(true);
    }

    async function handleAddSubmit(mealId, foodId, amount) {
        try {
            const newMealData = await addFoodAction(mealId, foodId, amount);
            sortFoodsInMeal(newMealData);
            setMealData(newMealData);
            setShowAddForm(false);
        } catch (error) {
            console.error(error);
        }
    }

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
                        <li key={food.mealFoodId} className={classes.food}>
                            <div className={classes.foodContainer}>
                                <div className={classes.foodDetails}>
                                    <div className={classes.foodName}>
                                        <h4>{food.name}</h4>
                                        <p>amount: {food.amount} {food.unit}</p>
                                    </div>
                                    <div className={classes.macros}>
                                        <p>carbs: {calculateMacro(food.macros.carbs, food.amount)}</p>
                                        <p>fats: {calculateMacro(food.macros.fats, food.amount)}</p>
                                        <p>proteins: {calculateMacro(food.macros.proteins, food.amount)}</p>
                                        <p>kcal: {calculateMacro(food.macros.kcal, food.amount)}</p>
                                    </div>
                                </div>
                                <p className={classes.icon}>icon: {food.category}</p>
                            </div>
                            <div className={classes.foodActions}>
                                <button onClick={() => handleEditClick(food)}>
                                    Edytuj
                                </button>
                                <button onClick={() => handleDeleteClick(food)}>
                                    Usuń
                                </button>
                            </div>
                        </li>
                    ))}
                    <li className={classes.add}>
                        <button onClick={() => handleAddClick()}>+</button>
                    </li>
                </ul>
            </div>
            {showEditForm && (
                <div className={classes.modalBackdrop}>
                    <EditFoodForm
                        food={currentFood}
                        onSubmit={handleEditSubmit}
                        onCancel={() => setShowEditForm(false)}
                    />
                </div>
            )}
            {showDeleteForm && (
                <div className={classes.modalBackdrop}>
                    <DeleteFoodForm
                        food={currentFood}
                        onSubmit={handleDeleteSubmit}
                        onCancel={() => setShowDeleteForm(false)}
                    />
                </div>
            )}
            {showAddForm && (
                <div className={classes.modalBackdrop}>
                    <AddFoodForm
                        mealId={data.mealId}
                        onSubmit={handleAddSubmit}
                        onCancel={() => setShowAddForm(false)}
                    />
                </div>
            )}
        </>
    )
}

export default MealContent;

function sortFoodsInMeal(mealData) {
    mealData.foods.sort((a, b) => a.name.localeCompare(b.name));
}