import {checkAuthLoader, getAuthToken} from "../util/auth.js";
import {json, useLoaderData} from "react-router-dom";
import MyProductsContent from "../components/my_products/MyProductsContent.jsx";

function MyProductsPage() {
    const loaderData = useLoaderData();

    console.log(loaderData);
    return <MyProductsContent initData={loaderData} loadPageFunc={loadMyProducts}/>
}

export default MyProductsPage;

export async function loader() {
    // Check if this check is necessary :)
    const authResult = checkAuthLoader();
    if (authResult instanceof Response) {
        return authResult;
    }
    return await loadMyProducts();
}

async function loadMyProducts(page = 0, size = 14) {
    const token = getAuthToken();
    const response = await fetch(`http://localhost:8080/api/food/search/created-by-me?page=${page}&size=${size}`, {
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