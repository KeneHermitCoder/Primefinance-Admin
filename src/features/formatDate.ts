export function isValidDate(dateString: string | Date) {
    const date = new Date(dateString);
    return date && date.toISOString() === dateString;
}

export function formatDateToDDMMYYYY(isoDateString: string) {
    const date = new Date(isoDateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}