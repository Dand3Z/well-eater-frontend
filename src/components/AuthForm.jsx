import classes from "./AuthForm.module.css";
import {Form, Link, useNavigation, useSearchParams} from "react-router-dom";
import {useState} from "react";

function AuthForm() {
    const [isSubmitActive, setIsSubmitActive] = useState(false);
    const [validations, setValidations] = useState({
        'username': {
            isValid: false,
            hiddenMessage: true
        },
        'password': {
            isValid: false,
            hiddenMessage: true
        },
    });

    function isValidFormField(type, value) {
        const result = value !== undefined && value.length > 4;
        setValidations((prevState) => {
            const state = {
                ...prevState,
                [type]: {
                    isValid: result,
                    hiddenMessage: false
                }
            };
            setIsSubmitActive(validateForm(state));
            return state;
        });
    }

    function validateForm(validations) {
        for (let val in validations) {
            if(!validations[val].isValid) {
                return false;
            }
        }
        return true;
    }

    const navigation = useNavigation();

    const [searchParams] = useSearchParams();
    const isLogin = searchParams.get('action') === 'login';
    const isSubmitting = navigation.state === 'submitting';
    return (
        <>
            <Form method="post" className={classes.form}>
                <h2 className={classes.heading}>Autoryzacja</h2>
                <p>
                    <label htmlFor="username">Nazwa użytkownika</label>
                    <input id="username" type="text" name="username" onChange={(e) => {
                        isValidFormField('username', e.target.value);
                    }} required/>
                    {!validations.username.hiddenMessage && !validations.username.isValid && (
                        <span className={classes.errorDesc}>Pole zawiera nieprawidłową wartość / wpisano za mało znaków!</span>)}
                </p>
                <p>
                    <label htmlFor="password">Hasło</label>
                    <input id="password" type="password" name="password" onChange={(e) => {
                        isValidFormField('password', e.target.value);
                    }} required/>
                    {!validations.password.hiddenMessage && !validations.password.isValid && (
                        <span className={classes.errorDesc}>Pole zawiera nieprawidłową wartość / wpisano za mało znaków!</span>)}
                </p>
                <div className={classes.actions}>
                    <Link to={`?action=${isLogin ? 'signup' : 'login'}`}>
                        {isLogin ? 'Nie masz konta? Zarejestruj się!' : 'Masz już konto? Zaloguj się!'}
                    </Link>
                    <button disabled={isSubmitting || !isSubmitActive}>
                        {isSubmitting ? 'Wysyłanie' : isLogin ? 'Zaloguj się' : 'Zarejestruj się'}
                    </button>
                </div>
            </Form>
        </>
    )
}

export default AuthForm;