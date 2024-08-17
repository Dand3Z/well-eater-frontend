import classes from './MealGeneral.module.css';
import {mealTypeMapper} from "../../../util/nameMappers.js";
import {Link} from "react-router-dom";
import Icon from "../../general/ImportIcons.jsx";

function MealGeneral({ data, monday, meal }) {
    console.log(data);
    return (
        <div className={`${classes[meal]} ${classes.meal}`}>
            <div className={classes.dishType}>
                <Icon className={'mediumIcon'} type={'MEAL'} value={data.mealType} />
                <h2>{mealTypeMapper(meal)}</h2>
            </div>

            <Link to={`meal/${data.mealId}`}>
                <div className={classes.macros}>
                    <div className={classes.macro}>
                        <Icon className={'mediumIcon'} type={'MACRO'} value={'carbs'}/>
                        <p>Węglowodany:</p>
                        <p>{data.stats.carbs} g</p>
                    </div>
                    <div className={classes.macro}>
                        <Icon className={'mediumIcon'} type={'MACRO'} value={'fats'}/>
                        <p>Tłuszcze:</p>
                        <p>{data.stats.fats} g</p>
                    </div>
                    <div className={classes.macro}>
                        <Icon className={'mediumIcon'} type={'MACRO'} value={'proteins'}/>
                        <p>Białka:</p>
                        <p>{data.stats.proteins} g</p>
                    </div>
                    <div className={classes.macro}>
                        <Icon className={'mediumIcon'} type={'MACRO'} value={'kcal'}/>
                        <p>Kcal:</p>
                        <p>{data.stats.kcal}</p>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default MealGeneral;