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
import { loader as dietDayLoader } from "./pages/DietDay.jsx";
import { loader as mealLoader} from "./pages/Meal.jsx";
import { loader as myProductsLoader } from "./pages/MyProducts.jsx";
import DietDays from "./components/diet/DietDays.jsx";
import DietDayPage from "./pages/DietDay.jsx";
import MealPage from "./pages/Meal.jsx";
import {initDietDayAction} from "./components/diet/DietDayGeneral.jsx";
import MyProductsPage from "./pages/MyProducts.jsx";

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
        action: initDietDayAction,
        children: [
          {
            index: true,
            element: <DietDays />
          },
          {
            path: "day/:dietDayId",
            element: <DietDayPage />,
            loader: dietDayLoader,
            children: [
              {
                index: true,
              },
              {
                path: "meal/:mealId",
                element: <MealPage />,
                loader: mealLoader,
              }
            ]
          }
        ]
      },
      {
        path: "my-products",
        element: <MyProductsPage />,
        loader: myProductsLoader,
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
