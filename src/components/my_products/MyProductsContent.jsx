import {useEffect, useState} from "react";
import classes from './MyProductsContent.module.css';
import {unitMapperForDescription} from "../../util/nameMappers.js";
import ProductForm from "./ProductForm.jsx";
import DeleteProductForm from "./DeleteProductForm.jsx";
import Icon from "../../util/importIcons.jsx";

function MyProductsContent({ initData, loadPageFunc }) {
    const [products, setProducts] = useState(initData.content);
    const [currentPage, setCurrentPage] = useState(0);
    const [isFirstPage, setIsFirstPage] = useState(initData.first);
    const [isLastPage, setIsLastPage] = useState(initData.last);
    const [isInitialLoad, setIsInitialLoad] = useState(true);
    const [showAddEditForm, setShowAddEditForm] = useState(false);
    const [showDeleteForm, setShowDeleteForm] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);

    useEffect(() => {
        if (isInitialLoad) {
            setIsInitialLoad(false);
            return;
        }

        loadPageFunc(currentPage)
            .then(results => {
                console.log('useEffect log');
                console.log(results);
                setProducts(results.content);
                setIsFirstPage(results.first);
                setIsLastPage(results.last);
            })
            .catch(error => {
                console.error('Error fetching search results:', error);
            })
    }, [currentPage, loadPageFunc]);

    function handleAddEditClick(product = null) {
        setCurrentProduct(product);
        setShowAddEditForm(true);
    }

    function handleDeleteClick(product) {
        setCurrentProduct(product);
        setShowDeleteForm(true);
    }

    return (
        <>
            <h3>Moje Produkty to sekcja w której możesz dodać produkty, których nie znalazłeś dotąd w naszej aktualnej bazie.
                Wszystkie dodane przez Ciebie pozycje trafią do naszej ogólnej bazy i będą mogły zostać wykorzystane przez innych użytkowników.
            </h3>
            <ul className={classes.productList}>
                {products.map((product) => (
                    <li className={`${classes.listItem} ${classes.productItem}`} key={product.id}>
                        <div className={classes.productHeader}>
                            <p>{product.name}</p>
                            <Icon className={'smallIcon'} type={'CATEGORY'} value={product.category}/>
                        </div>
                        <div className={classes.macros}>
                            <p className={classes.productDescription}>
                                Wartości kaloryczne w 100 {unitMapperForDescription(product.unit)}
                            </p>
                            <div className={classes.kcal}>{product.macros.kcal}</div>
                            <div className={classes.stats}>
                                <div>
                                    <p>Węglowodany</p>
                                    <p>{product.macros.carbs}</p>
                                </div>
                                <div>
                                    <p>Tłuszcze</p>
                                    <p>{product.macros.fats}</p>
                                </div>
                                <div>
                                    <p>Białko</p>
                                    <p>{product.macros.proteins}</p>
                                </div>
                            </div>
                        </div>
                        <div className={classes.actionButtons}>
                            <button type={"button"} onClick={() => handleAddEditClick(product)}>
                                Edytuj
                            </button>
                            <button type={"button"} onClick={() => handleDeleteClick(product)}>
                                Usuń
                            </button>
                        </div>
                    </li>
                ))}
                <button type={"button"}
                        onClick={() => handleAddEditClick()} className={`${classes.listItem} ${classes.addProduct}`}>
                    <li>+</li>
                </button>
            </ul>
            <div className={classes.navigationButtons}>
                {!isFirstPage &&
                    <button type={"button"} onClick={() => setCurrentPage((prev) => prev - 1)}>
                        &larr;
                    </button>}
                {!isLastPage &&
                    <button type={"button"} onClick={() => setCurrentPage((prev) => prev + 1)}>
                        &rarr;
                    </button>}
            </div>
            {showAddEditForm && (
                <div className={classes.modalBackdrop}>
                    <ProductForm
                        product={currentProduct}
                        action={'ADD_EDIT'}
                        onCancel={() => setShowAddEditForm(false)} />
                </div>
            )}
            {showDeleteForm && (
                <div className={classes.modalBackdrop}>
                    <DeleteProductForm
                        product={currentProduct}
                        onCancel={() => setShowDeleteForm(false)} />
                </div>
            )}
        </>
    );
}

export default MyProductsContent;