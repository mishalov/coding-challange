const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const formatters = [
  {
    type: "money",
    render: (value) => {
      if (typeof value === "undefined" || Number.isNaN(value)) {
        return "Unknown";
      }

      return formatter.format(value);
    },
  },
];

/**
 *
 * @param {Object} cellData - Cell id and value to render
 * @param {any} cellData.value - value to render
 * @param {any} cellData.type - type of value to render
 */
const formatCell = ({ type, value }) =>
  formatters.find((formatter) => formatter.type === type)?.render(value) ??
  value;

export default formatCell;
