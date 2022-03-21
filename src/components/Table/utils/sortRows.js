import stringToDate from "./stringToDate";

const makeComparable = (rawValue, type) => {
  if (type === "date") {
    return stringToDate(rawValue);
  }

  return rawValue;
};

/**
 * Returns sorted rows
 * @param {Object[]} rows rows of the table
 * @param {Object} sorting - The employees who are responsible for the project.
 * @param {string} sorting.id - Id of whe column that should be filtered
 * @param {string} sorting.value - Value to use while filtering
 * @param {Object} types - dictionary of types
 *
 * @returns sorted array of rows
 */
const sortRows = (rows, sorting, types) => {
  if (!sorting) return rows;

  const { id, value } = sorting;
  const currentType = types[id];

  return rows.sort((left, right) => {
    const leftComparable = makeComparable(left[id], currentType);
    const rightComparable = makeComparable(right[id], currentType);

    if (value === "asc") {
      return leftComparable > rightComparable
        ? 1
        : leftComparable < rightComparable
        ? -1
        : 0;
    }
    return leftComparable < rightComparable
      ? 1
      : leftComparable > rightComparable
      ? -1
      : 0;
  });
};

export default sortRows;
