const main = (state = "chart", action) => {
  switch (action.type) {
    case "CHART":
      return "chart";
    case "LOADING":
      return "loading";
    case "STATS":
      return "stats";

    default:
      return state;
  }
};

export default main;
