import classes from './EditFoodForm.module.css';
import {Form, json} from "react-router-dom";
import {useState} from "react";
import {getAuthToken} from "../../../../util/auth.js";
import {calculateMacro} from "../../../../util/food.js";
import {unitMapperForDescription} from "../../../../util/nameMappers.js";

function EditFoodForm({ food, onSubmit, onCancel }) {
    const [amount, setAmount] = useState(food.amount);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(food.mealFoodId, amount);
    }

    return (
        <div className={classes.modal}>
            <h4 className={classes.heading}>Edycja produktu: {food.name}</h4>
            <Form onSubmit={handleSubmit} className={classes.form}>
                <div className={classes.formGroup}>
                    <label>Ilość w {unitMapperForDescription(food.unit)}</label>
                    <input value={amount} onChange={(e) => setAmount(e.target.value)} required/>
                </div>
                <div className={`${classes.stats} ${classes.dynamicStats}`}>
                    <p className={classes.formLabel}>Wartości dla zadanej ilości</p>
                    <div className={classes.statsValues}>
                        <div>
                            <p>Węglowodany</p>
                            <p>{calculateMacro(food.macros.carbs, amount)} g</p>
                        </div>
                        <div>
                            <p>Tłuszcze</p>
                            <p>{calculateMacro(food.macros.fats, amount)} g</p>
                        </div>
                        <div>
                            <p>Białka</p>
                            <p>{calculateMacro(food.macros.proteins, amount)} g</p>
                        </div>
                        <div>
                            <p>Kcal</p>
                            <p>{calculateMacro(food.macros.kcal, amount)}</p>
                        </div>
                    </div>
                </div>
                <div className={`${classes.stats} ${classes.staticStats}`}>
                    <p className={classes.formLabel}>Wartości referencyjne dla 100 {food.unit.toLowerCase()}</p>
                    <div className={classes.statsValues}>
                        <div>
                            <p>Węglowodany</p>
                            <p>{food.macros.carbs} g</p>
                        </div>
                        <div>
                            <p>Tłuszcze</p>
                            <p>{food.macros.fats} g</p>
                        </div>
                        <div>
                            <p>Białka</p>
                            <p>{food.macros.proteins} g</p>
                        </div>
                        <div>
                            <p>Kcal</p>
                            <p>{food.macros.kcal}</p>
                        </div>
                    </div>
                </div>
                <button className={`${classes.actionBtn} ${classes.saveBtn}`} type={"submit"}>Zapisz</button>
                <button className={`${classes.actionBtn} ${classes.cancelBtn}`} type={"button"} onClick={onCancel}>Anuluj</button>
            </Form>
        </div>
    )
}

export default EditFoodForm;

export async function editFoodAction(mealFoodId, newAmount) {
    const token = getAuthToken();
    const requestData = {
        amount: newAmount,
    };

    const response = await fetch(`http://localhost:8080/api/meal/edit-food/${mealFoodId}`, {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
    });

    if (!response.ok) {
        throw json(
            {message: "Error getting diet"},
            {status: 500}
        );
    } else {
        return await response.json();
    }
}