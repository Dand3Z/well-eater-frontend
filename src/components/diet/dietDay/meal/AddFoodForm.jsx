import classes from './AddFoodForm.module.css';
import {Form, json} from "react-router-dom";
import {useState} from "react";
import {getAuthToken} from "../../../../util/auth.js";

function AddFoodForm({ mealId, onSubmit, onCancel }) {
    const [foodId, setFoodId] = useState();
    const [amount, setAmount] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(mealId, foodId, amount);
    }

    return (
        <div className={classes.modal}>
            <h4 className={classes.heading}>Dodaj produkt</h4>
            <Form onSubmit={handleSubmit} className={classes.form}>
                <button className={classes.actionBtn} type={"submit"}>Zapisz</button>
                <button className={classes.actionBtn} type={"button"} onClick={onCancel}>Anuluj</button>
            </Form>
        </div>
    )
}

export default AddFoodForm;

export async function addFoodAction(mealId, foodId, amount) {
    const token = getAuthToken();
    const requestData = {
        mealId: mealId,
        foodId: foodId,
        amount: amount,
    };

    const response = await fetch(`http://localhost:8080/api/meal/add-food`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
    });

    if (!response.ok) {
        throw json(
            {message: "Error during adding new food"},
            {status: 500}
        );
    } else {
        return await response.json();
    }
}

async function searchFoodBySubstring(substring, page, size = 10) {
    const token = getAuthToken();
    const request = await fetch(`http://localhost:8080/api/food/search/by-text?text=${substring}&page=${page}&size=${size}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });

    if (!response.ok) {
        throw json(
            {message: "Error during searching foods"},
            {status: 500}
        );
    } else {
        return await response.json();
    }
}