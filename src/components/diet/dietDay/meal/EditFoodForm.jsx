import classes from './EditFoodForm.module.css';
import {Form, json} from "react-router-dom";
import {useState} from "react";
import {getAuthToken} from "../../../../util/auth.js";

function EditFoodForm({ food, onSubmit, onCancel }) {
    const [amount, setAmount] = useState(food.amount);
    const [carbs, setCarbs] = useState(food.macros.carbs);
    const [fats, setFats] = useState(food.macros.fats);
    const [proteins, setProteins] = useState(food.macros.proteins);
    const [kcal, setKcal] = useState(food.macros.kcal);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(food.mealFoodId, amount);
    }

    return (
        <div className={classes.modal}>
            <Form onSubmit={handleSubmit} className={classes.form}>
                <div>
                    <label>Name</label>
                    <input value={food.name} disabled/>
                </div>
                <div>
                    <label>Amount</label>
                    <input value={amount} onChange={(e) => setAmount(e.target.value)} required/>
                </div>
                <div>
                    <label>Unit</label>
                    <input value={food.unit} disabled/>
                </div>
                <div>
                    <label>Carbs</label>
                    <input value={carbs} disabled/>
                </div>
                <div>
                    <label>Fats</label>
                    <input value={fats} disabled/>
                </div>
                <div>
                    <label>Proteins</label>
                    <input value={proteins} disabled/>
                </div>
                <div>
                    <label>Kcal</label>
                    <input value={kcal} disabled/>
                </div>
                <button type={"submit"}>Submit</button>
                <button type={"button"} onClick={onCancel}>Cancel</button>
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