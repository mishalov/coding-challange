/**
 * Returns filtered rows
 * @param {Object[]} rows rows of the table
 * @param {Object[]} filters - The employees who are responsible for the project.
 * @param {string} filters[].id - Id of whe column that should be filtered
 * @param {string} filters[].value - Value to use while filtering
 * @returns filtered array of rows
 */
const filterRows = (rows, filters) =>
  rows.filter((row) =>
    filters.every((filter) =>
      `${row[filter.id]}`.toLowerCase().includes(filter.value.toLowerCase())
    )
  );

export default filterRows;
