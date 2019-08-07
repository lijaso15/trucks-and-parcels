import DistanceMap from "../src/DistanceMap";
import City from "../src/City";
import CityMap from "../src/CityMap";

describe("DistanceMap", () => {
  describe("lookup", () => {
    test("empty distance map", () => {
      let m = new DistanceMap();
      expect(m.lookup("a", "b")).toBe(-1);
      expect(m.lookup("a", "a")).toBe(0);
    });

    test("non empty distance map", () => {
      let m = new DistanceMap();
      m.store("a", "b", 1);
      expect(m.lookup("a", "b")).toBe(1);
      expect(m.lookup("b", "a")).toBe(-1);
      m.store("b", "a", 1);
      expect(m.lookup("b", "a")).toBe(1);
    });

    test("a exists but b doesn't", () => {
      let m = new DistanceMap();
      m.store("a", "c", 1);
      expect(m.lookup("a", "b")).toBe(-1);
    });

    test("storing not redundant", () => {
      let m = new DistanceMap();
      m.store("a", "c", 1);
      m.store("a", "c", 2);
      expect(m.lookup("a", "c")).toBe(2);
    });

    test("total distance", () => {
      let m = new DistanceMap();
      m.store("a", "c", 1);
      m.store("c", "a", 2);
      expect(m.deliveryDistance(["a", "c"])).toBe(1);
    });

    test("nearest neighbour small", () => {
      let m = new DistanceMap();
      m.store("a", "c", 1);
      m.store("a", "b", 2);
      expect(m.nearestNeighbour("a", ["c", "b"])).toBe("c");
      expect(m.nearestNeighbour("a", ["b"])).toBe("b");
    });
    test("nearest neighbour medium", () => {
      let m = new DistanceMap();
      let cm = new CityMap();
      cm.cities.push(new City(0, 0, "1"));
      cm.cities.push(new City(1, 3, "2"));
      cm.cities.push(new City(4, 4, "3"));
      cm.cities.push(new City(2, 0, "4"));
      let dm = cm.transformToDistanceMap();

      expect(dm.nearestNeighbour("1", ["2", "3", "4"])).toBe("4");
    });
  });
});
