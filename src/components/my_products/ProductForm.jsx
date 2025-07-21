import classes from './ProductForm.module.css';
import {getAuthToken} from "../../util/auth.js";
import {Form, json} from "react-router-dom";
import {useState} from "react";
import {
    categoryMapper,
    typeMapper,
    unitMapperForDescription,
    unitMapperForProductForm
} from "../../util/nameMappers.js";
import {getServerUrl} from "../../util/url.js";

function ProductForm({ product, onCancel, action }) {
    const [name, setName] = useState(product ? product.name : '');
    const [category, setCategory] = useState(product ? product.category : 'VEGETABLE');
    const [type, setType] = useState(product ? product.type : 'SIMPLE_PRODUCT');
    const [unit, setUnit] = useState(product ? product.unit : 'G');
    const [carbs, setCarbs] = useState(product ? product.macros.carbs : 0);
    const [fats, setFats] = useState(product ? product.macros.fats : 0);
    const [proteins, setProteins] = useState(product ? product.macros.proteins : 0);
    const [kcal, setKcal] = useState(product ? product.macros.kcal : 0);
    const [isSubmitActive, setIsSubmitActive] = useState(false);
    const [validations, setValidations] = useState({
        'name': {
            isValid: product !== undefined,
            hiddenMessage: true
        },
        'carbs': {
            isValid: product !== undefined,
            hiddenMessage: true
        },
        'fats': {
            isValid: product !== undefined,
            hiddenMessage: true
        },
        'proteins': {
            isValid: product !== undefined,
            hiddenMessage: true
        },
        'kcal': {
            isValid: product !== undefined,
            hiddenMessage: true
        },
    });

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

    function isValidName(name) {
        const result = name.length > 0;
        setValidations((prevState) => ({
            ...prevState,
            name: {
                isValid: result,
                hiddenMessage: false
            }
        }));
        return result;
    }

    function isValidMacroValue(type, value) {
        const num = Number(value);
        const result = value !== undefined && !isNaN(num) && num >= 0;
        setValidations((prevState) => ({
            ...prevState,
            [type]: {
                isValid: result,
                hiddenMessage: false
            }
        }));
        return result;
    }

    function validateForm() {
        for (let val in validations) {
            if(!validations[val].isValid) {
                return setIsSubmitActive(false);
            }
        }
        return setIsSubmitActive(true);
    }

    return (
        <div className={classes.modal}>
            <h4 className={classes.heading}>{product ? 'Edytuj produkt' : 'Dodaj nowy produkt'}</h4>
            <Form onSubmit={handleSubmit} className={classes.form}>
                <div className={classes.formGroup}>
                    <label>Nazwa</label>
                    <input className={classes.formInput} value={name} onChange={(e) => {
                        setName(e.target.value);
                        isValidName(e.target.value);
                        validateForm();
                    }} required/>
                    {!validations.name.hiddenMessage && !validations.name.isValid && (
                        <span className={classes.errorDesc}>Pole zawiera nieprawidłową wartość!</span>)}
                </div>
                <div className={classes.formGroup}>
                    <label>Kategoria</label>
                    <select className={classes.formSelect} value={category}
                            onChange={(e) => setCategory(e.target.value)} required>
                        {categories.map(category => (
                            <option key={category} value={category}>{categoryMapper(category)}</option>
                        ))}
                    </select>
                </div>
                <div className={classes.formGroup}>
                    <label>Typ</label>
                    <select className={classes.formSelect} value={type} onChange={(e) => setType(e.target.value)}
                            required>
                        {types.map(type => (
                            <option key={type} value={type}>{typeMapper(type)}</option>
                        ))}
                    </select>
                </div>
                <div className={classes.formGroup}>
                    <label>Jednostka</label>
                    <select className={classes.formSelect} value={unit} onChange={(e) => setUnit(e.target.value)}
                            required>
                        {units.map(unit => (
                            <option key={unit} value={unit}>{unitMapperForProductForm(unit)}</option>
                        ))}
                    </select>
                </div>
                <h6 className={classes.description}>Wartości kaloryczne w 100 {unitMapperForDescription(unit)}:</h6>
                <div className={classes.formGroup}>
                    <label>Węglowodany</label>
                    <input className={classes.formInput} value={carbs} onChange={(e) => {
                        setCarbs(e.target.value);
                        isValidMacroValue('carbs', e.target.value);
                        validateForm();
                    }} required/>
                    {!validations.carbs.hiddenMessage && !validations.carbs.isValid && (
                        <span className={classes.errorDesc}>Pole zawiera nieprawidłową wartość!</span>)}
                </div>
                <div className={classes.formGroup}>
                    <label>Tłuszcze</label>
                    <input className={classes.formInput} value={fats} onChange={(e) => {
                        setFats(e.target.value);
                        isValidMacroValue('fats', e.target.value);
                        validateForm();
                    }} required/>
                    {!validations.fats.hiddenMessage && !validations.fats.isValid && (
                        <span className={classes.errorDesc}>Pole zawiera nieprawidłową wartość!</span>)}
                </div>
                <div className={classes.formGroup}>
                    <label>Białka</label>
                    <input className={classes.formInput} value={proteins} onChange={(e) => {
                        setProteins(e.target.value);
                        isValidMacroValue('proteins', e.target.value);
                        validateForm();
                    }} required/>
                    {!validations.proteins.hiddenMessage && !validations.proteins.isValid && (
                        <span className={classes.errorDesc}>Pole zawiera nieprawidłową wartość!</span>)}
                </div>
                <div className={classes.formGroup}>
                    <label>Kalorie</label>
                    <input className={classes.formInput} value={kcal} onChange={(e) => {
                        setKcal(e.target.value);
                        isValidMacroValue('kcal', e.target.value);
                        validateForm();
                    }} required/>
                    {!validations.kcal.hiddenMessage && !validations.kcal.isValid && (
                        <span className={classes.errorDesc}>Pole zawiera nieprawidłową wartość!</span>)}
                </div>
                <button className={`${classes.actionBtn} ${classes.saveBtn}`} type={"submit"} onClick={handleSubmit}
                        disabled={!isSubmitActive}>{product ? 'Zapisz' : 'Dodaj'}</button>
                <button className={`${classes.actionBtn} ${classes.cancelBtn}`} type={"button"}
                        onClick={onCancel}>Anuluj
                </button>
            </Form>
        </div>);
}

export default ProductForm;

async function addEditFood(foodData, foodId = undefined) {
    const token = getAuthToken();
    const requestPath = foodId ? `update/${foodId}` : "create";

    const response = await fetch(`${getServerUrl()}/api/user/food/${requestPath}`, {
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

    const response = await fetch(`${getServerUrl()}/api/admin/food/to-delete/unmark/${foodId}`, {
        method: 'PUT',
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