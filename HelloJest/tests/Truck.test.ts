import Truck from "../src/Truck";
import Parcel from "../src/Parcel";
import DistanceMap from "../src/DistanceMap";

describe("Truck", () => {
  test("fill truck", () => {
    let t = new Truck(101, "a", 100, new DistanceMap());
    let p1 = new Parcel(101, "a", "b", 50);
    let p2 = new Parcel(101, "a", "c", 51);
    let expected = { destination: "b", origin: "a", pid: 101, volume: 50 };

    t.fillTruck(p1);
    expect(t.parcels[0]).toMatchObject(expected);

    expect(t.fillTruck(p2)).toBe("c");
    expect(t.parcels[0]).toMatchObject(expected);
    t.fillTruck(p1);
    expect(t.parcels).toEqual([
      { destination: "b", origin: "a", pid: 101, volume: 50 },
      { destination: "b", origin: "a", pid: 101, volume: 50 }
    ]);
  });
});
