export function formatDate(date, format='DD.MM.YYYY')  {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    switch (format) {
        case 'DD.MM.YYYY':
            return `${day}.${month}.${year}`;
        case 'YYYY-MM-DD':
            return `${year}-${month}-${day}`;
    }
}

export function calculateCurrentMonday(date = new Date()) {
    const today = new Date(date);
    const dayOfWeek = today.getDay();
    const lastMonday = new Date(today);
    lastMonday.setDate(today.getDate() - dayOfWeek + 1);
    return formatDate(lastMonday, 'YYYY-MM-DD');
}

export function calculateDate(currentMonday, move) {
    const monday = new Date(currentMonday);
    const day = new Date(currentMonday);
    day.setDate(monday.getDate() + move);
    return formatDate(day, 'YYYY-MM-DD');
}

export function calculateCurrentSunday(currentMonday) {
    return calculateDate(currentMonday, 6);
}

