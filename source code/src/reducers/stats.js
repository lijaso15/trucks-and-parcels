const stats = (state = [], action) => {
  switch (action.type) {
    case "SET_STATS":
      return [...state, action.data];

    case "DELETE_EXPERIMENT":
      return state.filter(e => !e.time === action.time);
    default:
      return state;
  }
};

export default stats;
