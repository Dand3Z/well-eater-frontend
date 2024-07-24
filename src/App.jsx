import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import RootLayout from "./pages/Root.jsx";
import HomePage from "./pages/Home.jsx";
import AuthenticationPage, {action as authAction} from "./pages/Authentication.jsx";
import {action as logoutAction} from "./pages/Logout.jsx";
import {checkAuthLoader, tokenLoader} from "./util/auth.js";

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        // errorElement: <ErrorPage />,
        id: 'root',
        loader: tokenLoader,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            {
                path: 'auth',
                element: <AuthenticationPage />,
                action: authAction,
            },
            { // temp
                path: 'products',
                loader: checkAuthLoader
            },
            { // temp
                path: 'diet',
                loader: checkAuthLoader
            },
            {
                path: 'logout',
                action: logoutAction
            }
        ]
    }
]);

function App() {
    return (
        <div className='main-container'>
            <RouterProvider router={router} />
        </div>
    );
}

export default App;
