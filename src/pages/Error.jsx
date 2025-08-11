import {useRouteError} from "react-router-dom";
import MainNavigation from "../components/MainNavigation.jsx";
import Icon from "../components/general/ImportIcons.jsx";

function Error() {
    const error = useRouteError();

    let title = 'Ups... Coś się popsuło, to nie tak miało wyglądać 🙄';
    let message = 'Spróbuj ponownie za chwilę. Może tym razem się uda 🥴';

    if (error.status === 500) {
        message = error.data.message;
    }

    return (
        <>
            <MainNavigation />
            <h1>{title}</h1>
            <p>{message}</p>
            <Icon className={'bigImage'} type={'ERROR'} value={'BUG_CAT_CAPOO'}/>
        </>
    );
}

export default Error;