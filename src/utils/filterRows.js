const filterRows = (rows, filters) =>
  rows.filter((row) =>
    filters.every((filter) => `${row[filter.id]}`.includes(filter.value))
  );

export default filterRows;
