import classes from './AddFoodForm.module.css';
import {Form, json} from "react-router-dom";
import {useEffect, useState} from "react";
import {getAuthToken} from "../../../../util/auth.js";
import {unitMapperForDescription} from "../../../../util/nameMappers.js";
import {calculateMacro} from "../../../../util/food.js";

function AddFoodForm({ mealId, onSubmit, onCancel }) {
    const [amount, setAmount] = useState(0);
    const [searchText, setSearchText] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [selectedFood, setSelectedFood] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [isFirstPage, setIsFirstPage] = useState(true);
    const [isLastPage, setIsLastPage] = useState(true);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        if (searchText.length > 2) {
            searchFoodBySubstring(searchText, currentPage, 6)
                .then(results => {
                    console.log(results);
                    setSearchResults(results.content);
                    setIsFirstPage(results.first);
                    setIsLastPage(results.last);
                    setNotFound(results.content.length === 0);
                })
                .catch(error => {
                    console.error('Error fetching search results:', error);
                    setNotFound(true);
                });
        } else {
            setSearchResults([]);
            setIsFirstPage(true);
            setIsLastPage(true);
        }
    }, [searchText, currentPage]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(mealId, selectedFood.id, amount);
    }

    const handleSearchChange = (e) => {
        const value = e.target.value;
        const prevSearchText = searchText;
        setSearchText(value);
        setNotFound(false);
        if (currentPage !== 0 || prevSearchText !== value) setCurrentPage(0);
        console.log('handleSearchChange invoked');
    };

    const handleSelectFood = (food) => {
        setSelectedFood(food);
        setSearchText('');
        setSearchResults([]);
        console.log('handleSelectFood invoked');
    };

    const handleChangeCurrentPage = (move) => {
        console.log('handleChangeCurrentPage invoked');
        setCurrentPage(prevPage => prevPage + move);
    }

    return (
        <div className={classes.modal}>
            <h4 className={classes.heading}>Dodaj produkt</h4>
            <Form onSubmit={handleSubmit} className={classes.form}>
                <input
                    type="text"
                    value={searchText}
                    onChange={handleSearchChange}
                    placeholder="Wyszukaj produkt"
                />
                {notFound && (
                    <h6>Produkt nie został znaleziony. Może chciałbyś go sam dodać? Możesz to zrobić z poziomu sekcji Moje Produkty</h6>
                )}
                {searchResults.length > 0 && (
                    <>
                        <ul className={classes.searchResults}>
                            {searchResults.map((food) => (
                                <li key={food.id} onClick={() => {
                                    setCurrentPage(0);
                                    handleSelectFood(food);
                                }}>
                                    {food.name}
                                </li>
                            ))}
                        </ul>
                        <div className={classes.pageBtns}>
                            {!isFirstPage && (<button className={`${classes.pageBtn} ${classes.prevPageBtn}`} type={"button"}
                                                      onClick={() => handleChangeCurrentPage(-1)}>&larr;</button>)}
                            {!isLastPage && (<button className={`${classes.pageBtn} ${classes.nextPageBtn}`} type={"button"}
                                                     onClick={() => handleChangeCurrentPage(1)}>&rarr;</button>)}
                        </div>
                    </>
                )}
                {selectedFood && (
                    <>
                        <div className={classes.selectedFood}>
                            <p>Wybrano: {selectedFood.name}</p>
                        </div>
                        <label>Ilość w {unitMapperForDescription(selectedFood.unit)}</label>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder={`Ilość w ${unitMapperForDescription(selectedFood.unit)}`}
                        />
                        <div className={`${classes.stats} ${classes.dynamicStats}`}>
                            <p className={classes.formLabel}>Wartości dla zadanej ilości</p>
                            <div className={classes.statsValues}>
                                <div>
                                    <p>Węglowodany</p>
                                    <p>{calculateMacro(selectedFood.macros.carbs, amount)}</p>
                                </div>
                                <div>
                                    <p>Tłuszcze</p>
                                    <p>{calculateMacro(selectedFood.macros.fats, amount)}</p>
                                </div>
                                <div>
                                    <p>Białka</p>
                                    <p>{calculateMacro(selectedFood.macros.proteins, amount)}</p>
                                </div>
                                <div>
                                    <p>Kcal</p>
                                    <p>{calculateMacro(selectedFood.macros.kcal, amount)}</p>
                                </div>
                            </div>
                        </div>
                        <div className={`${classes.stats} ${classes.staticStats}`}>
                            <p className={classes.formLabel}>Wartości referencyjne dla 100 {selectedFood.unit.toLowerCase()}</p>
                            <div className={classes.statsValues}>
                                <div>
                                    <p>Węglowodany</p>
                                    <p>{selectedFood.macros.carbs}</p>
                                </div>
                                <div>
                                    <p>Tłuszcze</p>
                                    <p>{selectedFood.macros.fats}</p>
                                </div>
                                <div>
                                    <p>Białka</p>
                                    <p>{selectedFood.macros.proteins}</p>
                                </div>
                                <div>
                                    <p>Kcal</p>
                                    <p>{selectedFood.macros.kcal}</p>
                                </div>
                            </div>
                        </div>
                    </>
                )}
                <button className={`${classes.actionBtn} ${classes.saveBtn}`} type={"submit"}>Zapisz</button>
                <button className={`${classes.actionBtn} ${classes.cancelBtn}`} onClick={onCancel}>Anuluj</button>
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
    const response = await fetch(`http://localhost:8080/api/food/search/by-text?text=${substring}&page=${page}&size=${size}`, {
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
        const data = await response.json();
        console.log(data);
        return data;
    }
}