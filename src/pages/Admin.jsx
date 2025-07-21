import AdminView from "../components/admin_panel/AdminView.jsx";
import {checkAuthLoader, checkRole, getAuthToken} from "../util/auth.js";
import {json, redirect, useLoaderData} from "react-router-dom";
import {getServerUrl} from "../util/url.js";

function AdminPage() {
    const loaderData = useLoaderData();
    return <AdminView initData={loaderData} loadPageFunc={loadToDeleteProducts}/>
}

export default AdminPage;

export async function loader() {
    const authResult = checkAuthLoader();
    if (authResult instanceof Response) {
        return authResult;
    }

    if (!checkRole('ROLE_ADMIN')) {
        return redirect('/');
    }
    return await loadToDeleteProducts();
}

async function loadToDeleteProducts(page = 0, size = 9) {
    const token = getAuthToken();
    const response = await fetch(`${getServerUrl()}/api/admin/food/get-all-to-delete?page=${page}&size=${size}`, {
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
        return await response.json();
    }
}