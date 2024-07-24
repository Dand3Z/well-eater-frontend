import classes from "./AuthForm.module.css";
import {Form, Link, useNavigation, useSearchParams} from "react-router-dom";

function AuthForm() {
    // const data = useActionData();
    const navigation = useNavigation();

    const [searchParams] = useSearchParams();
    const isLogin = searchParams.get('action') === 'login';
    const isSubmitting = navigation.state === 'submitting';
    return (
        <>
            <Form method="post" className={classes.form}>
                <p>
                    <label htmlFor="username">Nazwa użytkownika</label>
                    <input id="username" type="text" name="username" required/>
                </p>
                <p>
                    <label htmlFor="password">Hasło</label>
                    <input id="password" type="password" name="password" required/>
                </p>
                <div className={classes.actions}>
                    <Link to={`?action=${isLogin ? 'signup' : 'login'}`}>
                        {isLogin ? 'Nie masz konta? Zarejestruj się!' : 'Masz już konto? Zaloguj się!'}
                    </Link>
                    <button disabled={isSubmitting}>
                        {isSubmitting ? 'Wysyłanie' : isLogin ? 'Zaloguj się' : 'Zarejestruj się'}
                    </button>
                </div>
            </Form>
        </>
    )
}

export default AuthForm;