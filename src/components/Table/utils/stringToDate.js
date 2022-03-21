const stringToDate = (stringValue) => {
  if (!stringValue) return stringValue;
  if (stringValue === "Unknown") return new Date(0);

  const [day, month, year] = stringValue.split("-");

  return new Date(`${year ?? "1"}-${month ?? "1"}-${day}`);
};

export default stringToDate;
