import Scheduler from "../src/Scheduler";
import Parcel from "../src/Parcel";
import Truck from "../src/Truck";
import CityMap from "../src/CityMap";
import City from "../src/City";

describe("Scheduler", () => {
  describe("given an algorithm", () => {
    test("random", () => {
      let parcels = [...Array(10).keys()].map(
        v => new Parcel(v, String(v), String(v), v)
      );
      let s = new Scheduler([]);
      let res = s.route(parcels, "RANDOM", undefined, 1);

      expect(res.map((p: Parcel) => p.pid)).toStrictEqual([
        0,
        3,
        5,
        6,
        2,
        8,
        7,
        4,
        9,
        1
      ]);
    });

    test("default", () => {
      let parcels = [...Array(10).keys()].map(
        v => new Parcel(v, String(v), String(v), v)
      );
      let s = new Scheduler([]);
      let res = s.route(parcels);

      expect(res.map((p: Parcel) => p.pid)).toStrictEqual([
        ...Array(10).keys()
      ]);
    });

    test("naive", () => {
      let cm = new CityMap();
      let parcels = [
        new Parcel(1, "1", "2", 1),
        new Parcel(1, "2", "3", 1),
        new Parcel(1, "3", "4", 1)
      ];
      cm.cities.push(new City(0, 0, "1"));
      cm.cities.push(new City(1, 3, "2"));
      cm.cities.push(new City(4, 4, "3"));
      cm.cities.push(new City(2, 0, "4"));
      let dm = cm.transformToDistanceMap();
      let s = new Scheduler([]);
      let t = new Truck(1, "1", 1, dm);
      let res = s.route([parcels[0]], "NAIVE", t);

      expect(t.totalDistance(res)).toBe(6.32);
      res = s.route(parcels, "NAIVE", t);
      expect(t.totalDistance(res)).toBe(12.79);
    });

    test("greedy", () => {
      let cm = new CityMap();
      let parcels = [
        new Parcel(1, "1", "2", 1),
        new Parcel(1, "2", "3", 1),
        new Parcel(1, "3", "4", 1)
      ];
      cm.cities.push(new City(0, 0, "1"));
      cm.cities.push(new City(1, 3, "2"));
      cm.cities.push(new City(4, 4, "3"));
      cm.cities.push(new City(2, 0, "4"));
      let dm = cm.transformToDistanceMap();
      let s = new Scheduler([]);
      let t = new Truck(1, "1", 1, dm);
      // let res = s.route([parcels[0]], "GREEDY", t);
      // expect(t.totalDistance(res)).toBe(6.32);
      let res = s.route(parcels, "GREEDY", t);
      expect(t.totalDistance(res)).toBe(13.98);
    });

    test("dynamic", () => {
      let cm = new CityMap();
      let parcels = [
        new Parcel(1, "1", "2", 1),
        new Parcel(1, "2", "3", 1),
        new Parcel(1, "3", "4", 1)
      ];
      cm.cities.push(new City(0, 0, "1"));
      cm.cities.push(new City(1, 3, "2"));
      cm.cities.push(new City(4, 4, "3"));
      cm.cities.push(new City(2, 0, "4"));
      let dm = cm.transformToDistanceMap();
      let s = new Scheduler([]);
      let t = new Truck(1, "1", 1, dm);

      let res = s.dynamic(parcels, t);
      expect(t.totalDistance(res)).toBe(12.79);
    });

    test("naive throws TypeError", () => {
      let s = new Scheduler([]);
      expect(() => s.route([], "NAIVE")).toThrow();
    });
    test("greedy throws TypeError", () => {
      let s = new Scheduler([]);
      expect(() => s.route([], "GREEDY")).toThrow();
    });
  });
});

// new Truck(1,'1',1, new DistanceMap())
