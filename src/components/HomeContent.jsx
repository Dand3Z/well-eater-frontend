import classes from './HomeContent.module.css';

function HomeContent({ heading }) {
    return (
        <div className={classes.content}>
            <h1 className={classes.center}>{heading}</h1>
            <ul className={classes.list}>
                <li className={classes.weekDays}>
                    <h3 className={classes.center}>Zarządzaj swoją dietą w ramach wygodnego interfejsu podzielonego na
                        tygodnie</h3>
                    <div className={classes.center}>
                        <img className={classes.image} src={'week_days_view.png'} alt="week_days_view"/>
                    </div>
                </li>
                <li>
                    <h3 className={classes.center}>Dodawaj, edytuj i usuwaj produkty w ramach posiłków</h3>
                    <div className={classes.center}>
                        <img className={classes.image} src={'meal_view.png'} alt="week_days_view"/>
                    </div>
                </li>
                <li>
                    <h3 className={classes.center}>Dodawaj własne produkty</h3>
                    <div className={classes.center}>
                        <img className={classes.image} src={'new_product_view.png'} alt="week_days_view"/>
                    </div>
                </li>
                <li>
                    <h3 className={classes.center}>Podglądaj na bieżąco statystyki per posiłek, dzień i tydzień</h3>
                    <div className={classes.center}>
                        <img className={classes.image} src={'week_stats_view.png'} alt="week_days_view"/>
                    </div>
                </li>
                <li>
                    <h3 className={classes.center}>I wiele więcej...</h3>
                </li>
            </ul>
            <h2 className={classes.center}>Zapanuj nad swoją dietą!</h2>
        </div>
    )
}

export default HomeContent;