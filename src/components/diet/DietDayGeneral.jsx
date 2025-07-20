import classes from './DietDayGeneral.module.css';
import {dayWeekMapper} from '../../util/nameMappers.js';
import {Form, json, Link, useNavigate, useOutletContext, useSubmit} from "react-router-dom";
import {getAuthToken} from "../../util/auth.js";
import {getServerUrl} from "../../util/url.js";

// date, dietDayId, dietDay[], stats: date, stats: carbs, fats, kcal, proteins
function DietDayGeneral({ day, data, date }) {
    const { currentMonday } = useOutletContext();
    const submit = useSubmit();
    return (
        <div className={`${classes[day]} ${classes.day} ${data === undefined ? classes.unused : classes.used}`}>
            <div className={classes.title}>
                <h2>{dayWeekMapper(day)}</h2>
            </div>
            {data !== undefined ? (
                <Link to={`day/${data.dietDayId}`}>
                    <div className={classes.macros}>
                        <p>Węglowodany: {data.stats.stats.carbs} g</p>
                        <p>Tłuszcze: {data.stats.stats.fats} g</p>
                        <p>Białka: {data.stats.stats.proteins} g</p>
                        <p>Kcal: {data.stats.stats.kcal}</p>
                    </div>
                </Link>) : (
                <Form className={classes.form} method={"post"} action={`/diet/${currentMonday}`} onSubmit={(e) => {
                    e.preventDefault();
                    submit(e.currentTarget, { replace: true });
                }}>
                    <input type="hidden" name={"date"} value={date} />
                    <button className={classes.btnInitMe} type="submit">
                        Kliknij by zainicjalizować :)
                    </button>
                </Form>
            )}
        </div>
    )
}

export default DietDayGeneral;

export async function initDietDayAction({ params, request }) {
    const token = getAuthToken();
    const formData = await request.formData();
    const requestBody = {
        dietDate: formData.get("date"),
    };

    const response = await fetch(`${getServerUrl()}/api/user/diet-day/create`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
        throw json(
            {message: "Error during initial new diet day"},
            {status: 500}
        );
    } else {
        const responseData = await response.json();
        return responseData;
    }
}