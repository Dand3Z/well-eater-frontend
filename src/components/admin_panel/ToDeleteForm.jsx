import {useEffect, useState} from "react";
import classes from "./ToDeleteForm.module.css";
import {categoryMapper, typeMapper, unitMapperForProductForm} from "../../util/nameMappers.js";
import ActionModal from "./ActionModal.jsx";
import ProductForm from "../my_products/ProductForm.jsx";


function ToDeleteForm({ initData, loadPageFunc }) {
    const [deleteProducts, setDeleteProducts] = useState(initData.content);
    const [currentPage, setCurrentPage] = useState(0);
    const [isFirstPage, setIsFirstPage] = useState(initData.first);
    const [isLastPage, setIsLastPage] = useState(initData.last);
    const [isInitialLoad, setIsInitialLoad] = useState(true);
    const [currentProduct, setCurrentProduct] = useState(null);
    const [showActionModal, setShowActionModal] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [currentAction, setCurrentAction] = useState('');

    useEffect(() => {
        if (isInitialLoad) {
            setIsInitialLoad(false);
            return;
        }

        loadPageFunc(currentPage)
            .then(results => {
                console.log(results);
                setDeleteProducts(results.content);
                setIsFirstPage(results.first);
                setIsLastPage(results.last);
            })
            .catch(error => {
                console.error('Error fetching to delete products:', error);
            })
    }, [currentPage, loadPageFunc]);

    function handleKeepActionClick(product) {
        setCurrentProduct(product);
        setCurrentAction('KEEP');
        setShowEditForm(true);
    }

    function handleDeleteActionClick(product) {
        setCurrentProduct(product);
        setCurrentAction('DELETE');
        setShowActionModal(true);
    }

    return (
        <>
            <h3>Produkty do usunięcia</h3>
            <table className={classes.table}>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Nazwa</th>
                    <th>Kategoria</th>
                    <th>Typ</th>
                    <th>Jednostka</th>
                    <th>Węglowodany</th>
                    <th>Tłuszcze</th>
                    <th>Białka</th>
                    <th>Kcal</th>
                    <th>Akcje</th>
                </tr>
                </thead>
                <tbody>
                {deleteProducts.map((product) => (
                    <tr key={product.id} className={classes.tableItem}>
                        <td>{product.id}</td>
                        <td>{product.name}</td>
                        <td>{categoryMapper(product.category)}</td>
                        <td>{typeMapper(product.type)}</td>
                        <td>{unitMapperForProductForm(product.unit)}</td>
                        <td>{product.macros.carbs}</td>
                        <td>{product.macros.fats}</td>
                        <td>{product.macros.proteins}</td>
                        <td>{product.macros.kcal}</td>
                        <td>
                            <button type={"button"} onClick={() => handleKeepActionClick(product)}>Zachowaj</button>
                            <button type={"button"} onClick={() => handleDeleteActionClick(product)}>Usuń</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
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
            {showActionModal && (
                <div className={classes.modalBackdrop}>
                    <ActionModal
                        product={currentProduct}
                        action={currentAction}
                        onCancel={() => setShowActionModal(false)}
                    />
                </div>
            )}
            {showEditForm && (
                <div className={classes.modalBackdrop}>
                    <ProductForm
                        product={currentProduct}
                        action={'KEEP'}
                        onCancel={() => setShowEditForm(false)} />
                </div>
            )}
        </>
    )
}

export default ToDeleteForm;