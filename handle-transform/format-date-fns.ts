import { format } from "date-fns";

export const formatDateFns = (date: Date) => {
  // return format(new Date(date), "MMM d, yyyy 'at' h:mm a");
  return format(new Date(date), "MMM d, yyyy");
};

export const vietnameseDate = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const day = new Date(date).toLocaleDateString("vi-VN", options);
  const time = new Date(date).toLocaleTimeString("vi-VN");
  return `${day} `;
};
