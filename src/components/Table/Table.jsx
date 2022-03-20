import React, { useState, useCallback } from "react";
import filterRows from "../../utils/filterRows";
import classNames from "./Table.module.css";
import ascIcon from "./order-ascending.svg";

const Table = ({ columns, rows, types }) => {
  const [filteringObjects, setFilteringState] = useState(
    columns.map((col) => ({ id: col.id, value: "" }))
  );

  const [sortingState, setSortingState] = useState({ id: "", value: "" });

  const createFilteringHandler = useCallback(
    (id) => (event) => {
      const { value } = event.target;
      setFilteringState(
        filteringObjects.filter((el) => el.id !== id).concat({ id, value })
      );
    },
    [filteringObjects]
  );

  return (
    <table title="Movies" className={classNames.table}>
      <thead>
        <tr>
          {columns.map(({ id, title }) => (
            <th key={id}>
              <div
                className={classNames["title-section"]}
                data-destid={`title-${id}`}
              >
                <span>{title}</span>
                <img src={ascIcon} alt="sorting icon" />
              </div>
              <input onChange={createFilteringHandler(id)} />
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {filterRows(rows, filteringObjects).map((row, index) => (
          <tr key={index}>
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
