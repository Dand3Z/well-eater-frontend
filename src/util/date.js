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
};