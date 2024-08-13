import classes from './FindAndEditForm.module.css'
import {useEffect, useState} from "react";
import {searchFoodBySubstring} from "../product_base/ProductsView.jsx";
import {Form} from "react-router-dom";
import ProductForm from "../my_products/ProductForm.jsx";
import DeleteProductForm from "../my_products/DeleteProductForm.jsx";
import ActionModal from "./ActionModal.jsx";

function FindAndEditForm() {
    const [searchText, setSearchText] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [selectedFood, setSelectedFood] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [isFirstPage, setIsFirstPage] = useState(true);
    const [isLastPage, setIsLastPage] = useState(true);
    const [showEditForm, setShowEditForm] = useState(false);
    const [showDeleteForm, setShowDeleteForm] = useState(false);
    const [currentAction, setCurrentAction] = useState('EDIT');

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
        actions[currentAction](true);
        console.log('handleSelectFood invoked');
    };

    const actions = {
        'EDIT': setShowEditForm,
        'DELETE': setShowDeleteForm
    };

    const handleChangeCurrentPage = (move) => {
        console.log('handleChangeCurrentPage invoked');
        setCurrentPage(prevPage => prevPage + move);
    }

    return (
        <div>
            <div>
                <h3 className={classes.heading}>{`Znajdź i ${currentAction === 'EDIT' ? 'edytuj' : 'usuń'} produkt`}</h3>
                <button type={'button'} onClick={() => setCurrentAction(
                    currentAction === 'EDIT' ? 'DELETE' : 'EDIT')} >
                    {currentAction === 'EDIT' ? 'Zmień na usuwanie' : 'Zmień na edycję'}
                </button>
            </div>

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
            {showDeleteForm && (
                <div className={classes.modalBackdrop}>
                    <ActionModal
                        product={selectedFood}
                        onCancel={() => setShowDeleteForm(false)}
                        action={currentAction}
                    />
                </div>
            )}
        </div>
    )
}

export default FindAndEditForm;

