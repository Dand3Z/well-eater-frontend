import classes from './EditFoodForm.module.css';
import {Form, json} from "react-router-dom";
import {useState} from "react";
import {getAuthToken} from "../../../../util/auth.js";
import {calculateMacro} from "../../../../util/food.js";
import {unitMapper} from "../../../../util/nameMappers.js";

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
                    <label>Ilość w {unitMapper(food.unit)}</label>
                    <input value={amount} onChange={(e) => setAmount(e.target.value)} required/>
                </div>
                <div className={classes.stats}>
                    <p className={classes.formLabel}>Wartości dla zadanej ilości</p>
                    <div className={classes.statsValues}>
                        <div>
                            <p>Węglowodany</p>
                            <p>{calculateMacro(food.macros.carbs, amount)}</p>
                        </div>
                        <div>
                            <p>Tłuszcze</p>
                            <p>{calculateMacro(food.macros.fats, amount)}</p>
                        </div>
                        <div>
                            <p>Białko</p>
                            <p>{calculateMacro(food.macros.proteins, amount)}</p>
                        </div>
                        <div>
                            <p>Kcal</p>
                            <p>{calculateMacro(food.macros.kcal, amount)}</p>
                        </div>
                    </div>
                </div>
                <div className={classes.stats}>
                    <p className={classes.formLabel}>Wartości referencyjne dla 100 {food.unit.toLowerCase()}</p>
                    <div className={classes.statsValues}>
                        <div>
                            <p>Węglowodany</p>
                            <p>{food.macros.carbs}</p>
                        </div>
                        <div>
                            <p>Tłuszcze</p>
                            <p>{food.macros.fats}</p>
                        </div>
                        <div>
                            <p>Białko</p>
                            <p>{food.macros.proteins}</p>
                        </div>
                        <div>
                            <p>Kcal</p>
                            <p>{food.macros.kcal}</p>
                        </div>
                    </div>
                </div>
                <button className={classes.actionBtn} type={"submit"}>Zapisz</button>
                <button className={classes.actionBtn} type={"button"} onClick={onCancel}>Anuluj</button>
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
        return response.json();
    }
}