const tableMock = {
  types: {
    number: "number",
    title: "text",
    releaseDate: "date",
    productionBudget: "money",
  },
  filterCases: {
    number: [{ filterValue: "3", shouldBePresentedWithNumber: ["13", "3"] }],
    title: [
      { filterValue: "Captain", shouldBePresentedWithNumber: ["13"] },
      { filterValue: "NOT_EXISTING", shouldBePresentedWithNumber: [] },
    ],
    releaseDate: [
      { filterValue: "NOT_EXISTING", shouldBePresentedWithNumber: [] },
      { filterValue: "2016", shouldBePresentedWithNumber: ["13"] },
      { filterValue: "05", shouldBePresentedWithNumber: ["13", "3", "6"] },
    ],
    productionBudget: [
      { filterValue: "250", shouldBePresentedWithNumber: ["13", "6"] },
      { filterValue: "1241", shouldBePresentedWithNumber: [] },
    ],
  },
  columns: [
    { id: "number", title: "Number" },
    { id: "title", title: "Movie" },
    { id: "releaseDate", title: "Release Date" },
    { id: "productionBudget", title: "Production Budget" },
  ],
  combinedFiltersWithSorting: {
    filters: [
      { id: "releaseDate", value: "05" },
      { id: "title", value: "v" },
    ],
    sortAscBy: "number",
    resultedNumbers: ["6", "13"],
  },

  rows: [
    {
      number: 13,
      releaseDate: "06-05-2016",
      title: "Captain America: Civil War",
      productionBudget: 250_000_000,

      sortingTestOrder: {
        number: 3,
        releaseDate: 3,
        title: 0,
        productionBudget: 3,
      },
    },
    {
      number: 3,
      releaseDate: "07-05-2010",
      title: "Iron Man 2",
      productionBudget: 170_000_000,

      sortingTestOrder: {
        number: 0,
        releaseDate: 0,
        title: 1,
        productionBudget: 1,
      },
    },
    {
      number: 4,
      releaseDate: "2011",
      title: "Thor",
      productionBudget: 150_000_000,

      sortingTestOrder: {
        number: 1,
        releaseDate: 1,
        title: 3,
        productionBudget: 0,
      },
    },
    {
      number: 6,
      releaseDate: "04-05-2012",
      title: "The Avengers",
      productionBudget: 225_000_000,

      sortingTestOrder: {
        number: 2,
        releaseDate: 2,
        title: 2,
        productionBudget: 2,
      },
    },
  ],
};

export default tableMock;
