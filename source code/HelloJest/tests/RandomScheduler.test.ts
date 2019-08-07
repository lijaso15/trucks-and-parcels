import RandomScheduler from "../src/RandomScheduler";
import Parcel from "../src/Parcel";
import Truck from "../src/Truck";
import DistanceMap from "../src/DistanceMap";

describe("random scheduler", () => {
  test("filling a truck", () => {
    let p = new Parcel(1, "", "", 100);
    let dm = new DistanceMap();
    let t1 = new Truck(1, "", 99, dm);
    let t2 = new Truck(1, "", 100, dm);
    let rs = new RandomScheduler([p], [t1, t2]);
    expect(rs.parcelIntoTrucks(p, rs.trucks)).toBe(undefined);
    expect(rs.trucks[1].volume).toBe(100);
    expect(rs.parcelIntoTrucks(p, rs.trucks)).toBe(p);
  });

  test("schedule", () => {
    let p = new Parcel(1, "", "", 100);
    let dm = new DistanceMap();
    let t1 = new Truck(1, "", 99, dm);
    let t2 = new Truck(1, "", 100, dm);
    let rs = new RandomScheduler([p, p], [t1, t2]);
    expect(rs.schedule()).toStrictEqual([p]);
  });
});
