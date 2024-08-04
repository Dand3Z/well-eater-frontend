import classes from './ActionModal.module.css';
import {Form, json} from "react-router-dom";
import {getAuthToken} from "../../util/auth.js";

function ActionModal({ product, onCancel, action }) {

    const actionMap = {
        'KEEP': keepFood,
        'DELETE': deleteFood
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(product.id);
            const func = actionMap[action];
            await func(product.id);
            window.location.reload();
        } catch (e) {
            console.error("Error occurred during keeping / deleting food")
        }
    }

    return (
        <div className={classes.modal}>
            <h4 className={classes.heading}>{product ? 'Edytuj produkt' : 'Dodaj nowy produkt'}</h4>
            <Form className={classes.form}>
                <button className={classes.actionBtn} type={"submit"}
                        onClick={(e) => handleSubmit(e)}>{product ? 'Zapisz' : 'Dodaj'}</button>
                <button className={classes.actionBtn} type={"button"} onClick={onCancel}>Anuluj</button>
            </Form>
        </div>
    )
}

export default ActionModal;

async function keepFood(foodId) {
    const token = getAuthToken();
    const response = await fetch(`http://localhost:8080/admin/food/to-delete/unmark/${foodId}`, {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });

    if (!response.ok) {
        throw json(
            {message: "Error during unmarking food"},
            {status: 500}
        );
    } else {
        return response.ok;
    }
}

async function deleteFood(foodId) {
    const token = getAuthToken();
    const response = await fetch(`http://localhost:8080/admin/food/delete/${foodId}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });

    if (!response.ok) {
        throw json(
            {message: "Error during deleting food"},
            {status: 500}
        );
    } else {
        return response.ok;
    }
}