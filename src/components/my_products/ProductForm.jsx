import classes from './ProductForm.module.css';
import {getAuthToken} from "../../util/auth.js";
import {Form, json} from "react-router-dom";
import {useState} from "react";
import {categoryMapper, typeMapper, unitMapperForProductForm} from "../../util/nameMappers.js";

function ProductForm({ product, onCancel, action }) {
    const [name, setName] = useState(product ? product.name : '');
    const [category, setCategory] = useState(product ? product.category : 'VEGETABLE');
    const [type, setType] = useState(product ? product.type : 'SIMPLE_PRODUCT');
    const [unit, setUnit] = useState(product ? product.unit : 'G');
    const [carbs, setCarbs] = useState(product ? product.macros.carbs : 0);
    const [fats, setFats] = useState(product ? product.macros.fats : 0);
    const [proteins, setProteins] = useState(product ? product.macros.proteins : 0);
    const [kcal, setKcal] = useState(product ? product.macros.kcal : 0);

    const actionMap = {
        'KEEP': keepAndEditFood,
        'ADD_EDIT': addEditFood
    };

    const categories = [
        'VEGETABLE', 'MEAT', 'FRUIT', 'CHEESE', 'BREAD', 'SWEET', 'MILK', 'EGG', 'WATER', 'JUICE',
        'ALCOHOL', 'JAR', 'SOUP', 'DISH', 'DESSERT', 'FAST_FOOD', 'OTHER'
    ];

    const types = ['SIMPLE_PRODUCT', 'COMPLEX_MEAL'];
    const units = ['G', 'ML'];

    // TODO: change reload of page to sth that doesn't require refreshing
    const handleSubmit = async (e) => {
        e.preventDefault();
        const foodData = {
            name, category, type, unit, carbs, fats, proteins, kcal,
        };
        const func = actionMap[action];
        try {
            await func(foodData, product ? product.id : undefined);
            window.location.reload();
        } catch (e) {
            console.error("Error occurred during saving new / editing product ", e);
        }
    }

    return (
        <div className={classes.modal}>
            <h4 className={classes.heading}>{product ? 'Edytuj produkt' : 'Dodaj nowy produkt'}</h4>
            <Form onSubmit={handleSubmit} className={classes.form}>
                <div className={classes.formGroup}>
                    <label>Nazwa</label>
                    <input value={name} onChange={(e) => setName(e.target.value)} required/>
                </div>
                <div className={classes.formGroup}>
                    <label>Kategoria</label>
                    <select value={category} onChange={(e) => setCategory(e.target.value)} required>
                        {categories.map(category => (
                            <option key={category} value={category}>{categoryMapper(category)}</option>
                        ))}
                    </select>
                </div>
                <div className={classes.formGroup}>
                    <label>Typ</label>
                    <select value={type} onChange={(e) => setType(e.target.value)} required>
                        {types.map(type => (
                            <option key={type} value={type}>{typeMapper(type)}</option>
                        ))}
                    </select>
                </div>
                <div className={classes.formGroup}>
                    <label>Jednostka</label>
                    <select value={unit} onChange={(e) => setUnit(e.target.value)} required>
                        {units.map(unit => (
                            <option key={unit} value={unit}>{unitMapperForProductForm(unit)}</option>
                        ))}
                    </select>
                </div>
                <div className={classes.formGroup}>
                    <label>Węglowodany</label>
                    <input value={carbs} onChange={(e) => setCarbs(e.target.value)} required/>
                </div>
                <div className={classes.formGroup}>
                    <label>Tłuszcze</label>
                    <input value={fats} onChange={(e) => setFats(e.target.value)} required/>
                </div>
                <div className={classes.formGroup}>
                    <label>Białko</label>
                    <input value={proteins} onChange={(e) => setProteins(e.target.value)} required/>
                </div>
                <div className={classes.formGroup}>
                    <label>Kalorie</label>
                    <input value={kcal} onChange={(e) => setKcal(e.target.value)} required/>
                </div>
                <button className={classes.actionBtn} type={"submit"} onClick={handleSubmit}>{product ? 'Zapisz' : 'Dodaj'}</button>
                <button className={classes.actionBtn} type={"button"} onClick={onCancel}>Anuluj</button>
            </Form>
        </div>);
}

export default ProductForm;

async function addEditFood(foodData, foodId = undefined) {
    const token = getAuthToken();
    const requestPath = foodId ? `update/${foodId}` : "create";

    const response = await fetch(`http://localhost:8080/api/food/${requestPath}`, {
        method: foodId ? "PUT" : "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(foodData),
    });

    if (!response.ok) {
        throw json(
            {message: "Error during adding / editing food"},
            {status: 500}
        );
    } else {
        return await response.json();
    }
}

async function keepAndEditFood(foodData, foodId) {
    const token = getAuthToken();

    const response = await fetch(`http://localhost:8080/admin/food/to-delete/unmark/${foodId}`, {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(foodData),
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