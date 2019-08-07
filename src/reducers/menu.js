const menu = (state = { active: true }, action) => {
  switch (action.type) {
    case "MENU_ACTIVE":
      return { ...state, active: !state.active };
    case "MENU_ON":
      return { ...state, active: true };
    case "MENU_OFF":
      return { ...state, active: false };
    default:
      return state;
  }
};

export default menu;
