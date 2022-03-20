import React, { useState, useCallback } from "react";
import ColumnTitle from "../ColimnTitle";
import TableCell from "../TableCell";
import classNames from "./Table.module.css";

/**
 * Returns filtred rows
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

/**
 * Returns sorted rows
 * @param {Object[]} rows rows of the table
 * @param {Object} sorting - The employees who are responsible for the project.
 * @param {string} sorting.id - Id of whe column that should be filtered
 * @param {string} sorting.value - Value to use while filtering
 * @returns sorted array of rows
 */
const sortRows = (rows, sorting) => {
  if (!sorting) return rows;

  const { id, value } = sorting;

  return rows.sort((left, right) => {
    if (value === "asc") {
      return left[id] > right[id] ? 1 : left[id] < right[id] ? -1 : 0;
    }
    return left[id] < right[id] ? 1 : left[id] > right[id] ? -1 : 0;
  });
};

const Table = ({ columns, rows, types }) => {
  const [filteringObjects, setFilteringState] = useState(
    columns.map((col) => ({ id: col.id, value: "" }))
  );

  // Possible values: null, {id, value: "asc"}, {id, value: "desc"}
  const [sortingState, setSortingState] = useState();

  // in real life scenario this handler should have throttling or debounce
  // but we consume JSON, so i decided to not spend time on it.
  const createFilteringHandler = useCallback(
    (id) => (event) => {
      const { value } = event.target;
      setFilteringState(
        filteringObjects.filter((el) => el.id !== id).concat({ id, value })
      );
    },
    [filteringObjects]
  );

  const filteredRows = filterRows(rows, filteringObjects);
  const sortedRows = sortRows(filteredRows, sortingState);

  return (
    <table title="Movies" className={classNames.table}>
      <thead>
        <tr>
          {columns.map(({ id, title }) => (
            <th key={id}>
              <ColumnTitle
                id={id}
                currentSorting={sortingState}
                title={title}
                handleChangeFilter={setSortingState}
              />
              <input onChange={createFilteringHandler(id)} />
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {sortedRows.map((row, index) => (
          <tr key={row.number}>
            {columns.map(({ id }) => (
              <TableCell
                id={id}
                value={row[id]}
                type={types[id]}
                rowNumber={index}
                key={`table-cell-${index}-${id}`}
              />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
