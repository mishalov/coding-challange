import React, { useCallback } from "react";
import ascIcon from "./order-ascending.svg";
import descIcon from "./order-descending.svg";
import classNames from "./ColumnTitle.module.css";

const ColumnTitle = ({ id, currentSorting, title, handleChangeFilter }) => {
  const sortingHandler = useCallback(() => {
    if (id === currentSorting?.id) {
      const newState =
        currentSorting.value === "asc" ? { id, value: "desc" } : null;
      handleChangeFilter(newState);
      return;
    }
    handleChangeFilter({ id, value: "asc" });
  }, [currentSorting, id, handleChangeFilter]);

  const showSorting = currentSorting?.id === id;

  return (
    <div
      className={classNames["title-section"]}
      data-destid={`title-${id}`}
      onClick={sortingHandler}
    >
      <span>{title}</span>
      {showSorting && (
        <img
          src={currentSorting.value === "asc" ? ascIcon : descIcon}
          alt={`Sorting icon by ${currentSorting.value}`}
        />
      )}
    </div>
  );
};

export default ColumnTitle;
