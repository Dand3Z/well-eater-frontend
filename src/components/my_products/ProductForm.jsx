import classes from './ProductForm.module.css';
import {getAuthToken} from "../../util/auth.js";
import {Form, json} from "react-router-dom";
import {useState} from "react";

function ProductForm({ product, onCancel }) {
    const [name, setName] = useState(product ? product.name : '');
    const [category, setCategory] = useState(product ? product.category : 'VEGETABLE');
    const [type, setType] = useState(product ? product.type : 'SIMPLE_PRODUCT');
    const [unit, setUnit] = useState(product ? product.unit : 'G');
    const [carbs, setCarbs] = useState(product ? product.macros.carbs : 0);
    const [fats, setFats] = useState(product ? product.macros.fats : 0);
    const [proteins, setProteins] = useState(product ? product.macros.proteins : 0);
    const [kcal, setKcal] = useState(product ? product.macros.kcal : 0);

    // TODO: change reload of page to sth that doesn't require refreshing
    const handleSubmit = async (e) => {
        e.preventDefault();
        const foodData = {
            name, category, type, unit, carbs, fats, proteins, kcal,
        };
        try {
            await addEditFood(foodData, product ? product.id : undefined);
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
                        <option value={'VEGETABLE'}>Warzywa</option>
                        <option value={'MEAT'}>Mięso</option>
                        <option value={'FRUIT'}>Owoce</option>
                        <option value={'CHEESE'}>Sery</option>
                        <option value={'BREAD'}>Pieczywo</option>
                        <option value={'SWEET'}>Słodycze</option>
                        <option value={'MILK'}>Produkty mleczne</option>
                        <option value={'EGG'}>Jajka</option>
                        <option value={'WATER'}>Woda</option>
                        <option value={'JUICE'}>Napój</option>
                        <option value={'ALCOHOL'}>Alkohole</option>
                        <option value={'JAR'}>Konserwy</option>
                        <option value={'SOUP'}>Zupy</option>
                        <option value={'DISH'}>Dania obiadowe</option>
                        <option value={'DESSERT'}>Desery</option>
                        <option value={'FAST_FOOD'}>Fast Foody</option>
                        <option value={'OTHER'}>Inne</option>
                    </select>
                </div>
                <div className={classes.formGroup}>
                    <label>Typ</label>
                    <select value={type} onChange={(e) => setType(e.target.value)} required>
                        <option value={'SIMPLE_PRODUCT'}>Produkt</option>
                        <option value={'COMPLEX_MEAL'}>Danie</option>
                    </select>
                </div>
                <div className={classes.formGroup}>
                    <label>Jednostka</label>
                    <select value={unit} onChange={(e) => setUnit(e.target.value)} required>
                        <option value={'G'}>Gramy (g)</option>
                        <option value={'ML'}>Mililitry (ml)</option>
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