const tableMock = {
  types: {
    number: "number",
    title: "text",
    releaseDate: "date",
    productionBudget: "money",
  },
  columns: [
    { id: "number", title: "Number" },
    { id: "title", title: "Movie" },
    { id: "releaseDate", title: "Release Date" },
    { id: "productionBudget", title: "Production Budget" },
  ],
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
