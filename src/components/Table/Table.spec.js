import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import tableMock from "./Table.mock";
import Table from "./Table";

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

describe("Table", () => {
  const columnTable = tableMock.columns.map(({ id, title }) => [id, title]);

  // screen.debug();

  describe("sorting", () => {
    describe.each(columnTable)('"%s" column', (id, title) => {
      let index = 0;

      test(`Title should be correct`, () => {
        render(
          <Table
            types={tableMock.types}
            rows={tableMock.rows}
            columns={tableMock.columns}
          />
        );

        expect(screen.getByTestId(`title-${id}`)).toHaveTextContent(title);
      });

      test.each(tableMock.rows)("Row %#", (row) => {
        //  Testing if everything rendered correctly
        const type = tableMock.types[id];

        const predictedValue =
          type === "money"
            ? formatter.format(tableMock.rows[index][id])
            : tableMock.rows[index][id];

        render(
          <Table
            types={tableMock.types}
            rows={tableMock.rows}
            columns={tableMock.columns}
          />
        );

        expect(screen.getByTestId(`row-${index}-${id}`)).toHaveTextContent(
          predictedValue
        );

        //  Testing if everything rendered correctly WHEN ORDERED ASC

        const currentTitleElement = screen.getByTestId(`title-${id}`);
        fireEvent.click(currentTitleElement);

        const sortedPredictedValueAscRaw = tableMock.rows.find(
          (el) => el.sortingTestOrder[id] === index
        )[id];

        const sortedPredictedValueAsc =
          type === "money"
            ? formatter.format(sortedPredictedValueAscRaw)
            : sortedPredictedValueAscRaw;

        expect(screen.getByTestId(`row-${index}-${id}`)).toHaveTextContent(
          sortedPredictedValueAsc
        );

        //  Testing if everything rendered correctly WHEN ORDERED DESC

        const reversedIndex = 3 - index;
        fireEvent.click(currentTitleElement);

        const sortedPredictedValueDescRaw = tableMock.rows.find(
          (el) => el.sortingTestOrder[id] === reversedIndex
        )[id];

        const sortedPredictedValueDesc =
          type === "money"
            ? formatter.format(sortedPredictedValueDescRaw)
            : sortedPredictedValueDescRaw;

        expect(screen.getByTestId(`row-${index}-${id}`)).toHaveTextContent(
          sortedPredictedValueDesc
        );

        index++;
      });
    });
  });

  describe("filtering", () => {
    describe.each(columnTable)(
      'should offer a means to filter the "%s" column',
      (id, title) => {
        it.todo("should be possible to filter a column.");
      }
    );

    it.todo("should be possible to combine filters.");
  });
});
