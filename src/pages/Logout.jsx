import {redirect} from "react-router-dom";

export function action() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('roles');
    return redirect('/');
}