import classes from "./MainNavigation.module.css";
import {Form, NavLink} from "react-router-dom";
import {calculateCurrentMonday} from "../util/date.js";

function MainNavigation() {
    const token = localStorage.getItem("token");

    return (
        <header className={classes.header}>
            <nav>
                <ul className={classes.list}>
                    <li>
                        <NavLink
                            to="/"
                            className={({isActive}) => isActive ? classes.active : undefined} end>
                            Strona Główna
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={"/products"}
                                 className={({isActive}) => isActive ? classes.active : undefined}>
                            Baza Produktów
                        </NavLink>
                    </li>
                    {token && (
                        <li>
                            <NavLink to={`/diet/${calculateCurrentMonday()}`}
                                     className={({isActive}) => isActive ? classes.active : undefined}>
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