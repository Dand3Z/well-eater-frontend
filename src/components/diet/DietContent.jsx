import DietNavMenu from "./DietNavMenu.jsx";
import DietDays from "./DietDays.jsx";

function DietContent({ currentMonday, currentSunday, onClick }) {

  return (
      <>
        <DietNavMenu
            currentMonday={currentMonday}
            currentSunday={currentSunday}
            onClick={onClick}
        />
        <DietDays />
      </>

  );
}

export default DietContent;