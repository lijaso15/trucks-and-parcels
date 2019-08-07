import Parcel from "../src/Parcel";
import DistanceMap from "../src/DistanceMap";

describe("Parcel", () => {
  test("getDistance", () => {
    let m = new DistanceMap();
    m.store("a", "b", 1);
    let p1 = new Parcel(101, "a", "b", 100);
    let p2 = new Parcel(101, "a", "c", 100);
    p1.getDistance(m);

    expect(p1.getDistance(m)).toBe(1);
    expect(p2.getDistance(m)).toBe(-1);
  });
});
