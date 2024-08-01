import {useEffect, useState} from "react";
import classes from './MyProductsContent.module.css';
import {unitMapper} from "../../util/nameMappers.js";

function MyProductsContent({ initData, loadPageFunc }) {
    const [products, setProducts] = useState(initData.content);
    const [currentPage, setCurrentPage] = useState(0);
    const [isFirstPage, setIsFirstPage] = useState(initData.first);
    const [isLastPage, setIsLastPage] = useState(initData.last);
    const [isInitialLoad, setIsInitialLoad] = useState(true);

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

    return (
        <>
            <ul className={classes.productList}>
                {products.map((product) => (
                    <li className={`${classes.listItem} ${classes.productItem}`} key={product.id}>
                        <div className={classes.productHeader}>
                            <p>{product.name}</p>
                            <p>Icon: {product.category}</p>
                        </div>
                        <div className={classes.macros}>
                            <p className={classes.productDescription}>
                                Wartości kaloryczne w 100 {unitMapper(product.unit)}
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
                    </li>
                ))}
                <li className={`${classes.listItem} ${classes.addProduct}`}>
                    +
                </li>
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
        </>
    );
}

export default MyProductsContent;