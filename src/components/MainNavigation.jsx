import classes from "./MainNavigation.module.css";
import {Form, NavLink, useMatch} from "react-router-dom";
import {checkRole} from "../util/auth.js";

function MainNavigation() {
    const token = localStorage.getItem("token");
    const dietMatch = useMatch('/diet/:date?');
    const dietRootMatch = useMatch('/diet');

    return (
        <header className={classes.header}>
            <nav>
                <ul className={classes.list}>
                    <li>
                        {!token && (
                            <NavLink
                                to="/"
                                className={({isActive}) => isActive ? classes.active : undefined} end>
                                Strona Główna
                            </NavLink>
                        )}
                    </li>
                    <li>
                        <NavLink to={"/products"}
                                 className={({isActive}) => isActive ? classes.active : undefined}>
                            Baza Produktów
                        </NavLink>
                    </li>
                    {token && (
                        <li>
                            <NavLink to={`/diet`}
                                     className={() => dietMatch || dietRootMatch ? classes.active : undefined}>
                                Moja Dieta
                            </NavLink>
                        </li>
                    )}
                    {token && (
                        <li>
                            <NavLink to="/my-products"
                                     className={({isActive}) => isActive ? classes.active : undefined}>
                                Moje Produkty
                            </NavLink>
                        </li>
                    )}
                    {checkRole('ROLE_ADMIN') && (
                        <li>
                            <NavLink to="/admin-panel"
                                     className={({isActive}) => isActive ? classes.active : undefined}>
                                Panel Admina
                            </NavLink>
                        </li>
                    )}
                </ul>
            </nav>
            <nav className={`${classes.auth}`}>
                {!token && (
                    <NavLink to="/auth?action=login">
                        Logowanie
                    </NavLink>
                )}
                {token && (
                    <Form action="/logout" method="POST" >
                        <button style={{ all: 'unset' }}>Wyloguj</button>
                    </Form>
                )}
            </nav>
        </header>
    )
}

export default MainNavigation;