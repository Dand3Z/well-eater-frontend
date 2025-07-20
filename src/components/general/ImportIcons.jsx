import classes from "./Icon.module.css";

const iconBasePath = "/icons/";
const dietPath = "diet/";
const navigationPath = "navigation/";

const categoryIcons = {
  VEGETABLE: "vegetable.svg",
  MEAT: "meat.svg",
  FRUIT: "fruit.svg",
  CHEESE: "cheese.svg",
  BREAD: "bread.svg",
  SWEET: "sweet.svg",
  MILK: "milk.svg",
  EGG: "egg.svg",
  WATER: "water.svg",
  JUICE: "juice.svg",
  ALCOHOL: "alcohol.svg",
  JAR: "jar.svg",
  SOUP: "soup.svg",
  DISH: "dish.svg",
  DESSERT: "dessert.svg",
  FAST_FOOD: "fastfood.svg",
  OTHER: "other.svg",
};

const weekDaysIcons = {
  monday: "monday.svg",
  tuesday: "tuesday.svg",
  wednesday: "wednesday.svg",
  thursday: "thursday.svg",
  friday: "friday.svg",
  saturday: "saturday.svg",
  sunday: "sunday.svg",
};

const macroIcons = {
  carbs: "carbs.svg",
  fats: "fats.svg",
  proteins: "proteins.svg",
  kcal: "kcal.svg",
};

const mealIcons = {
  BREAKFAST: "breakfast.svg",
  DINNER: "dinner.svg",
  LUNCH: "lunch.svg",
  SNACK: "snack.svg",
  SUPPER: "supper.svg",
};

const navIcons = {
  ACCEPT: "accept.svg",
  BACKWARD: "backward.svg",
  CALENDAR: "calendar.svg",
  CANCEL: "cancel.svg",
  CHART_BAR: "chart-bar.svg",
  CHART_BAR_SQUARE: "chart-bar-square.svg",
  LOGIN: "login.svg",
  LOGOUT: "logout.svg",
};

const iconsSelector = {
  CATEGORY: {
    icons: categoryIcons,
    path: `${iconBasePath + dietPath + "category/"}`,
  },
  WEEK_DAYS: {
    icons: weekDaysIcons,
    path: `${iconBasePath + dietPath + "day_of_week/"}`,
  },
  MACRO: {
    icons: macroIcons,
    path: `${iconBasePath + dietPath + "macros/"}`,
  },
  MEAL: {
    icons: mealIcons,
    path: `${iconBasePath + dietPath + "meal/"}`,
  },
  NAV: {
    icons: navIcons,
    path: `${iconBasePath + navigationPath}`,
  },
};

const Icon = ({ type, value, className }) => {
  const icons = iconsSelector[type].icons;
  const typePath = iconsSelector[type].path;
  const valuePath = icons[value];
  const fullPath = `${typePath}${valuePath}`;
  return <img className={classes[className]} src={fullPath} alt={value} />;
};

export default Icon;
