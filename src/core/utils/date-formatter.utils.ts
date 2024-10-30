const dateTimeFormatter = (date: Date) => {
  return Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
};

export default dateTimeFormatter;
