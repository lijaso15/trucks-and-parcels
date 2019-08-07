const called = (
  state = {
    setData: false,
    delete: false,
    setStats: false
  },
  action
) => {
  switch (action.type) {
    case "DELETE_POINT":
      return { ...state, delete: true };
    case "SET_DATA":
      return { ...state, setData: true };
    case "CLEAR_DATA":
      return { ...state, setData: false };
    case "CLEAR_DELETE":
      return { ...state, delete: false };
    case "SET_STATS":
      return { ...state, setStats: true };

    case "CLEAR_STATS":
      return { ...state, setStats: false };
    default:
      return state;
  }
};

export default called;
