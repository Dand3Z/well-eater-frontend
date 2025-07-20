import classes from "./DeleteProductForm.module.css";
import {Form, json} from "react-router-dom";
import {getAuthToken} from "../../util/auth.js";
import {getServerUrl} from "../../util/url.js";


function DeleteProductForm({ product, onCancel }) {

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await deleteFoodByUser(product.id);
            window.location.reload();
        } catch (e) {
            console.error("Error during removing food by user", e);
        }
    }

    return (
        <div className={classes.modal}>
            <h4 className={classes.heading}>Usuń produkt: {product.name}</h4>
            <Form onSubmit={handleSubmit} className={classes.form}>
                <button className={`${classes.actionBtn} ${classes.saveBtn}`} type={"submit"}>Usuń</button>
                <button className={`${classes.actionBtn} ${classes.cancelBtn}`} type={"button"} onClick={onCancel}>Anuluj</button>
            </Form>
        </div>
    )
}

export default DeleteProductForm;

async function deleteFoodByUser(foodId) {
    const token = getAuthToken();

    const response = await fetch(`${getServerUrl()}/api/user/food/to-delete/mark/${foodId}`, {
        method: "PATCH",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw json(
            {message: "Error during removing by user food"},
            {status: 500}
        );
    } else {
        return response.ok;
    }
}