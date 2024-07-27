import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/Root.jsx";
import HomePage from "./pages/Home.jsx";
import DietWeekPage, {loadDiet} from "./pages/DietWeek.jsx";
import AuthenticationPage, {
  action as authAction,
} from "./pages/Authentication.jsx";
import { action as logoutAction } from "./pages/Logout.jsx";
import { checkAuthLoader, tokenLoader } from "./util/auth.js";
import DietDays from "./components/diet/DietDays.jsx";
import Meals from "./pages/DietDay.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    // errorElement: <ErrorPage />,
    id: "root",
    loader: tokenLoader,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "auth",
        element: <AuthenticationPage />,
        action: authAction,
      },
      {
        path: "diet/:date?",
        element: <DietWeekPage />,
        loader: loadDiet,
        children: [
          {
            index: true,
            element: <DietDays />
          },
          {
            path: "meals",
            element: <Meals />,
          }
        ]
      },
      {
        // temp
        path: "products",
        loader: checkAuthLoader,
      },
      {
        path: "logout",
        action: logoutAction,
      },
    ],
  },
]);

function App() {
  return (
    <div className="main-container">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
