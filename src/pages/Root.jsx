import {Outlet, useLoaderData, useSubmit} from "react-router-dom";
import MainNavigation from "../components/MainNavigation.jsx";
import {useEffect} from "react";
import {getTokenDuration} from "../util/auth.js";

function RootLayout() {
    const token = useLoaderData();
    const submit = useSubmit();
    useEffect(() => {
        if (!token) {
            return;
        }

        if (token === 'EXPIRED') {
            submit(null, { action: '/logout', method: 'post' });
            return;
        }

        const tokenDuration = getTokenDuration();
        console.log(tokenDuration);

        setTimeout(() => {
            submit(null, {action: '/logout', method: 'POST'});
        }, tokenDuration);
    }, [token, submit]);

    return (
        <>
            <MainNavigation />
            <main>
                <Outlet />
            </main>
        </>
    );
}

export default RootLayout;