const points = (
  state = [
    {
      x: undefined,
      y: undefined,
      name: "City_3",
      id: 2,
      isTruck: false,
      value: undefined
    },
    {
      x: undefined,
      y: undefined,
      name: "City_4",
      id: 3,
      isTruck: false,
      value: undefined
    },
    {
      x: undefined,
      y: undefined,
      name: "City_1",
      id: 0,
      isTruck: true,
      value: undefined
    },
    {
      x: undefined,
      y: undefined,
      name: "City_2",
      id: 1,
      isTruck: true,
      value: undefined
    }
  ],
  action
) => {
  switch (action.type) {
    case "DELETE_POINT":
      if (state.length > 2) {
        return state.filter(p => !(p.id === action.id));
      }
      return state;

    case "UPDATE_POINT":
      const { id, x, y, name, value } = action;
      const res = {
        x,
        y,
        name,
        id,
        value
      };
      return state.map(v => {
        if (v.id === id) {
          return { ...v, ...res };
        }
        return v;
      });

    case "ADD_POINT":
      return [
        ...state,
        {
          x: action.x,
          y: action.y,
          value: action.value,
          name: "City_" + action.id,
          id: action.id,
          isTruck: action.isTruck
        }
      ];
    default:
      return state;
  }
};

export default points;
