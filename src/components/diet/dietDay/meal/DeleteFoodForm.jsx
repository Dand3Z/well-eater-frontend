import classes from './DeleteFoodForm.module.css';
import {getAuthToken} from "../../../../util/auth.js";
import {Form, json} from "react-router-dom";
import {getServerUrl} from "../../../../util/url.js";

function DeleteFoodForm({ food, onSubmit, onCancel }) {

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(food.mealFoodId);
    }

    return (
        <div className={classes.modal}>
            <h4 className={classes.heading}>Usuń produkt: {food.name}</h4>
            <Form onSubmit={handleSubmit} className={classes.form}>
                <button className={`${classes.actionBtn} ${classes.saveBtn}`} type={"submit"}>Usuń</button>
                <button className={`${classes.actionBtn} ${classes.cancelBtn}`} type={"button"} onClick={onCancel}>Anuluj</button>
            </Form>
        </div>
    )
}

export default DeleteFoodForm;

export async function deleteFoodAction(mealFoodId) {
    const token = getAuthToken();

    const response = await fetch(`${getServerUrl()}/api/user/meal/delete-food/${mealFoodId}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });

    if (!response.ok) {
        throw json(
            {message: "Error while deleting food from meal"},
        )
    } else {
        return await response.json();
    }
}
