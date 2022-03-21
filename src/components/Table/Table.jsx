import React, { useState, useCallback } from "react";
import ColumnTitle from "../ColimnTitle";
import TableCell from "../TableCell";
import classNames from "./Table.module.css";
import filterRows from "./utils/filterRaws";
import sortRows from "./utils/sortRows";

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
  const sortedRows = sortRows(filteredRows, sortingState, types);

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
