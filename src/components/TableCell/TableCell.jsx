import React from "react";
import classNames from "./TableCell.module.css";
import formatCell from "./utils/formatters";

const TableCell = ({ id, value, type, rowNumber }) => (
  <td
    data-testid={`row-${rowNumber}-${id}`}
    className={classNames[`cell-type-${type}`]}
    key={id}
  >
    {formatCell({ value, id, type })}
  </td>
);

export default TableCell;
