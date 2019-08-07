var numPoints = 5;
export const setPoint = (label, x, y, value, name, isTruck, id = numPoints) => {
  if (label === "ADD") {
    numPoints++;
  }

  return {
    type: label + "_POINT",
    id,
    x,
    y,
    name,
    isTruck,
    value
  };
};

export const setMenu = label => {
  return {
    type: "MENU_" + label
  };
};

export const draw = () => {
  return {
    type: "DRAW"
  };
};

export const setData = data => {
  return {
    type: "SET_DATA",
    data
  };
};

export const clearCalled = label => {
  return {
    type: "CLEAR_" + label
  };
};

export const setMain = label => {
  return {
    type: label
  };
};

export const setLoading = (label, value) => {
  return {
    type: label,
    value
  };
};

export const setStats = data => {
  return {
    type: "SET_STATS",
    data
  };
};

export const deleteExperiment = time => {
  return {
    type: "DELETE_EXPERIMENT",
    time
  };
};
