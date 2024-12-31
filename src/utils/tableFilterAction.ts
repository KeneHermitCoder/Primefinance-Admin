import { parseDate, } from "./format";

export default function (label: string, selected: string, option: any) {
    switch (label.toLowerCase()) {
        case "date":
            // filter by date
            const comparator = (a: Date, b: Date, duration: number) => {
                return a.getTime() - b.getTime() <= duration * 24 * 60 * 60 * 1000;
            };
            let providedDate = typeof option.date === "string" ? parseDate(option.date) : option.date;
            //Check if the returned date is actually a date
            if (providedDate instanceof Date) {
                switch (selected) {
                    case "Today":
                        return comparator(providedDate, new Date(), 1);
                    case "This Week":
                        return comparator(
                            providedDate,
                            new Date(
                                new Date().setDate(new Date().getDate() - 7)
                            ),
                            7
                        );
                    case "This Month":
                        return comparator(
                            providedDate,
                            new Date(
                                new Date().setMonth(new Date().getMonth() - 1)
                            ),
                            30
                        );
                    case "This Year":
                        return comparator(
                            providedDate,
                            new Date(
                                new Date().setFullYear(
                                    new Date().getFullYear() - 1
                                )
                            ),
                            365.25
                        );
                    default:
                        return false;
                }
            }
            return false;
        default:
            return option[label.toLowerCase()] === selected;
    }
}