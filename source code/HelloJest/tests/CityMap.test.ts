import City from "../src/City";
import CityMap from "../src/CityMap";

describe("CityMap", () => {
  test("to distance map", () => {
    let c1 = new City(1, 3, "Toronto");
    let c2 = new City(1, 10, "Toronto");
    let c3 = new City(1, 10, "New York");
    let cm = new CityMap();
    cm.cities.push(c1);
    cm.cities.push(c2);
    cm.cities.push(c3);
    let dm = cm.transformToDistanceMap();

    expect(dm.lookup("Toronto", "New York")).toBe(0);
    expect(dm.lookup("New York", "Toronto")).toBe(0);
  });
});
