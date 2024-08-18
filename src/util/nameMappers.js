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

export function unitMapperForDescription(unit = 'g') {
    unit = unit === null ? 'g' : unit;
    switch (unit.toLowerCase()) {
        case 'g':
            return 'gramach';
        case 'ml':
            return 'mililitrach';
    }
}

export function categoryMapper(category) {
    const categoryMap = {
        'VEGETABLE': 'Warzywa',
        'MEAT': 'Mięso',
        'FRUIT': 'Owoce',
        'CHEESE': 'Sery',
        'BREAD': 'Pieczywo',
        'SWEET': 'Słodycze',
        'MILK': 'Produkty mleczne',
        'EGG': 'Jajka',
        'WATER': 'Woda',
        'JUICE': 'Napój',
        'ALCOHOL': 'Alkohole',
        'JAR': 'Konserwy',
        'SOUP': 'Zupy',
        'DISH': 'Dania obiadowe',
        'DESSERT': 'Desery',
        'FAST_FOOD': 'Fast Food',
        'OTHER': 'Inne'
    };
    return categoryMap[category] || category;
}

export function typeMapper(type) {
    const typeMap = {
        'SIMPLE_PRODUCT': 'Produkt',
        'COMPLEX_MEAL': 'Danie'
    };
    return typeMap[type] || type;
}

export function unitMapperForProductForm(unit) {
    const unitMap = {
        'G': 'Gramy (g)',
        'ML': 'Mililitry (ml)'
    };
    return unitMap[unit] || unit;
}
