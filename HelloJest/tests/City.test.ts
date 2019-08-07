import City from "../src/City";

describe("City", () => {
  test("the constructor parameters", () => {
    let c1 = new City(1, 3, "Toronto");
    expect(c1.x).toBe(1);
    expect(c1.y).toBe(3);
    expect(c1.name).toBe("Toronto");
    let c2 = new City(1, 1);
    expect(c2.name).toBe("");
  });
  test("distance", () => {
    let c1 = new City(0, 0);
    let c2 = new City(1, 1);
    expect(c1.distance(c2)).toBe(1.41);
  });

  test("equals", () => {
    let c1 = new City(0, 0, "hi");
    let c2 = new City(0, 0);
    let c3 = new City(0, 1);
    let c4 = new City(0, 0, "hi");

    expect(c1.equals(0)).toBe(false);
    expect(c1.equals(c2)).toBe(false);
    expect(c2.equals(c3)).toBe(false);
    expect(c1.equals(c4)).toBe(true);
  });
});
