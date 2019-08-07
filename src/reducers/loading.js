const loading = (
  state = {
    algorithm: "default",
    parcelPriority: "volume",
    parcelOrder: "non-increasing",
    truckOrder: "non-increasing"
  },
  action
) => {
  switch (action.type) {
    case "AL":
      return { ...state, algorithm: action.value };

    case "PP":
      return { ...state, parcelPriority: action.value };

    case "PO":
      return { ...state, parcelOrder: action.value };

    case "TO":
      return { ...state, truckOrder: action.value };

    default:
      return state;
  }
};

export default loading;
