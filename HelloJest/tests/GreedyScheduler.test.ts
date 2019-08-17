import GreedyScheduler from "../src/GreedyScheduler";
import Parcel from "../src/Parcel";
import Truck from "../src/Truck";
import DistanceMap from "../src/DistanceMap";

describe("greedy scheduler", () => {
  describe("constructor", () => {
    test("parcel pq", () => {
      let parcels = [...Array(10).keys()].map(
        v => new Parcel(v, String(v), String(v), v)
      );
      let trucks = [...Array(4).keys()].map(
        v => new Truck(v, String(v), v, new DistanceMap())
      );

      let gs = new GreedyScheduler(
        parcels,
        trucks,
        "volume",
        "non-increasing",
        "non-decreasing"
      );
      let pq = gs.parcels;
      expect(pq.getQueue().map(p => p.volume)).toStrictEqual([
        ...Array(10).keys()
      ]);
    });
  });

  describe("get priority", () => {
    let gs = new GreedyScheduler(
      [],
      [],
      "destination",
      "non-decreasing",
      "non-decreasing"
    );
    let p1 = new Parcel(1, "", "a", 3);
    p1.priority = "destination";
    let p2 = new Parcel(1, "", "b", 4);
    p2.priority = "volume";
    expect(gs.getPriority("non-decreasing")(p1, p2)).toBe(true);
    expect(gs.getPriority("non-decreasing")(p2, p1)).toBe(false);
  });

  describe("schedule", () => {
    let parcels = [...Array(10).keys()].map(
      v => new Parcel(v, String(v), String(v), v)
    );
    let trucks = [...Array(4).keys()].map(
      v => new Truck(v, String(v), v, new DistanceMap())
    );
    let gs = new GreedyScheduler(
      parcels,
      trucks,
      "volume",
      "non-increasing",
      "non-decreasing"
    );
  });
});
