export function dayWeekMapper(day) {
    switch (day) {
        case 'monday':
            return 'Poniedziałek';
        case 'tuesday':
            return 'Wtorek';
        case 'wednesday':
            return 'Środa';
        case 'thursday':
            return 'Czwartek';
        case 'friday':
            return 'Piątek';
        case 'saturday':
            return 'Sobota';
        case 'sunday':
            return 'Niedziela';
    }
}

export function mealTypeMapper(meal) {
    switch (meal.toLowerCase()) {
        case 'breakfast':
            return 'Śniadanie';
        case 'lunch':
            return 'Drugie śniadanie';
        case 'dinner':
            return 'Obiad';
        case 'snack':
            return "Przekąska";
        case 'supper':
            return 'Kolacja';
    }
}

export function unitMapper(day) {
    switch (day.toLowerCase()) {
        case 'g':
            return 'gramach';
        case 'ml':
            return 'mililitrach';
    }
}