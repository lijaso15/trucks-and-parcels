const draw = (state = false, action) => {
  switch (action.type) {
    case "DRAW":
      return !state;
    default:
      return state;
  }
};

export default draw;
