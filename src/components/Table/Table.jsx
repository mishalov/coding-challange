import React, { useState, useCallback } from "react";
import ColumnTitle from "../ColimnTitle";
import classNames from "./Table.module.css";

/**
 * Apply filters on rows
 * @param {Array} rows
 * @param {Array} filters
 * @returns filtred array of rows
 */
const filterRows = (rows, filters) =>
  rows.filter((row) =>
    filters.every((filter) => `${row[filter.id]}`.includes(filter.value))
  );

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
              <td
                data-testid={`row-${index}-${id}`}
                className={classNames[`cell-type-${types[id]}`]}
                key={id}
              >
                {row[id]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
