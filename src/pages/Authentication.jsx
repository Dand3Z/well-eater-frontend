import AuthForm from "../components/AuthForm.jsx";
import {json, redirect} from "react-router-dom";


function AuthenticationPage() {
    return <AuthForm />;
}

export default AuthenticationPage;

export async function action({ request }) {
    const searchParams = new URL(request.url).searchParams;
    const action = searchParams.get("action") || "login";

    if (action !== "login" && action !== "signup") {
        throw json({ message: `Invalid action: ${action}` }, { status: 422 });
    }

    const formData = await request.formData();
    const authData = {
        username: formData.get("username"),
        password: formData.get("password"),
    };

    console.log(authData);

    const response = await fetch('http://localhost:8080/auth/' + action, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(authData),
    });

    if (response.status === 422 || response.status === 401) {
        return response;
    }

    if (!response.ok) {
        throw json({ message: "Could not authenticate user"}, { status: 500 });
    }

    if (action === "login") {
        const responseData = await response.json();
        const token = responseData.token;
        localStorage.setItem('token', token);
        const roles = responseData.roles;
        localStorage.setItem('roles', JSON.stringify(roles));
        const expiration = new Date();
        expiration.setHours(expiration.getHours() + 12);
        localStorage.setItem('expiration', expiration.toISOString());
    }
    return redirect('/');
}