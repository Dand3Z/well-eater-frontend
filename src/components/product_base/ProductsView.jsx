import classes from "./ProductsView.module.css"
import {useEffect, useState} from "react";
import {Form, json} from "react-router-dom";
import {getAuthToken} from "../../util/auth.js";

// TODO: make a component -> almost the same as the one in AddFoodForm.jsx
function ProductsView() {
    const [searchText, setSearchText] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [selectedFood, setSelectedFood] = useState(null);
    const [notFound, setNotFound] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [isFirstPage, setIsFirstPage] = useState(true);
    const [isLastPage, setIsLastPage] = useState(true);

    useEffect(() => {
        if (searchText.length > 2) {
            searchFoodBySubstring(searchText, currentPage, 6)
                .then(results => {
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

    const handleSearchChange = (e) => {
        const value = e.target.value;
        const prevSearchText = searchText;
        setSearchText(value);
        setNotFound(false);
        if (currentPage !== 0 || prevSearchText !== value) setCurrentPage(0);
    };

    const handleSelectFood = (food) => {
        setSelectedFood(food);
        setSearchText('');
        setSearchResults([]);
    };

    const handleChangeCurrentPage = (move) => {
        setCurrentPage(prevPage => prevPage + move);
    }

    return (
        <div className={classes.modal}>
            <h4 className={classes.heading}>Sprawdź czy mamy szukany przez Ciebie produkt w naszej bazie</h4>
            <Form className={classes.form}>
                <input
                    type="text"
                    value={searchText}
                    onChange={handleSearchChange}
                    placeholder="Wpisz co najmniej 3 znaki..."
                />
                {notFound && (
                    <h6>Niestety nie znaleźliśmy szukanego przez Ciebie produktu. Może chciałbyś go sam dodać? Możesz to zrobić z poziomu sekcji Moje Produkty widocznej po zalogowaniu :)</h6>
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
                        <div className={classes.buttons}>
                            {!isFirstPage && (<button className={`${classes.actionBtn} ${classes.prevBtn}`} type={"button"}
                                                      onClick={() => handleChangeCurrentPage(-1)}>&larr;</button>)}
                            {!isLastPage && (<button className={`${classes.actionBtn} ${classes.nextBtn}`} type={"button"}
                                                     onClick={() => handleChangeCurrentPage(1)}>&rarr;</button>)}
                        </div>
                    </>
                )}
                {selectedFood && (
                    <div className={classes.selectedFood}>
                        <div className={classes.name}>
                            <p>Wybrano: {selectedFood.name}</p>
                        </div>
                        <div className={classes.stats}>
                            <p className={classes.formLabel}>Wartości referencyjne dla 100 {selectedFood.unit.toLowerCase()}</p>
                            <div className={classes.statsValues}>
                                <div className={classes.macro}>
                                    <p>Węglowodany</p>
                                    <p>{selectedFood.macros.carbs}</p>
                                </div>
                                <div className={classes.macro}>
                                    <p>Tłuszcze</p>
                                    <p>{selectedFood.macros.fats}</p>
                                </div>
                                <div className={classes.macro}>
                                    <p>Białka</p>
                                    <p>{selectedFood.macros.proteins}</p>
                                </div>
                                <div className={classes.macro}>
                                    <p>Kcal</p>
                                    <p>{selectedFood.macros.kcal}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </Form>
        </div>
    )
}

export default ProductsView;

export async function searchFoodBySubstring(substring, page, size = 10) {
    const response = await fetch(`http://localhost:8080/api/food/search/by-text?text=${substring}&page=${page}&size=${size}`, {
        method: 'GET',
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