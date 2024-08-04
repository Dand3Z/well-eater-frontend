import classes from './FindAndEditForm.module.css'
import {useEffect, useState} from "react";
import {searchFoodBySubstring} from "../product_base/ProductsView.jsx";
import {Form} from "react-router-dom";
import ProductForm from "../my_products/ProductForm.jsx";

function FindAndEditForm() {
    const [searchText, setSearchText] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [selectedFood, setSelectedFood] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [isFirstPage, setIsFirstPage] = useState(true);
    const [isLastPage, setIsLastPage] = useState(true);
    const [showEditForm, setShowEditForm] = useState(false);

    useEffect(() => {
        if (searchText.length > 2) {
            searchFoodBySubstring(searchText, currentPage, 4)
                .then(results => {
                    console.log(results);
                    setSearchResults(results.content);
                    setIsFirstPage(results.first);
                    setIsLastPage(results.last);
                })
                .catch(error => {
                    console.error('Error fetching search results:', error);
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
        if (currentPage !== 0 || prevSearchText !== value) setCurrentPage(0);
        console.log('handleSearchChange invoked');
    };

    const handleSelectFood = (food) => {
        setSelectedFood(food);
        setSearchText('');
        setSearchResults([]);
        setShowEditForm(true)
        console.log('handleSelectFood invoked');
    };

    const handleChangeCurrentPage = (move) => {
        console.log('handleChangeCurrentPage invoked');
        setCurrentPage(prevPage => prevPage + move);
    }

    return (
        <div>
            <h3 className={classes.heading}>Znajdź i edytuj produkt</h3>
            <Form className={classes.form}>
                <input
                    type="text"
                    value={searchText}
                    onChange={handleSearchChange}
                    placeholder="Wpisz co najmniej 3 znaki..."
                />
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
                        <div>
                            {!isFirstPage && (<button type={"button"}
                                                      onClick={() => handleChangeCurrentPage(-1)}>&larr;</button>)}
                            {!isLastPage && (<button type={"button"}
                                                     onClick={() => handleChangeCurrentPage(1)}>&rarr;</button>)}
                        </div>
                    </>
                )}
            </Form>
            {showEditForm && (
                <div className={classes.modalBackdrop}>
                    <ProductForm
                        product={selectedFood}
                        action={'ADD_EDIT'}
                        onCancel={() => setShowEditForm(false)} />
                </div>
            )}
        </div>
    )
}

export default FindAndEditForm;

