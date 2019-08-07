import Scheduler from "./Scheduler";
import Parcel from "./Parcel";
import Truck from "./Truck";
import PriorityQueue from "./PriorityQueue";
import { parcelPriority } from "./Parcel";

type priority = "non-increasing" | "non-decreasing";

export default class GreedyScheduler extends Scheduler {
  truckOrder: priority;
  verbose: boolean;
  parcels: PriorityQueue;

  constructor(
    parcels: Parcel[],
    trucks: Truck[],
    parcelPriority: parcelPriority,
    parcelOrder: priority,
    truckOrder: priority,
    verbose = false
  ) {
    super(trucks);
    this.truckOrder = truckOrder;
    this.verbose = verbose;
    let pq = new PriorityQueue(this.getPriority(parcelOrder) as (
      a: any,
      b: any
    ) => boolean);
    parcels.map(p => {
      p.priority = parcelPriority;
      pq.add(p);
    });
    this.parcels = pq;
  }

  schedule(): Parcel[] {
    let tpq = new PriorityQueue(this.getPriority(this.truckOrder) as (
      a: Truck,
      b: Truck
    ) => boolean);
    this.trucks.map(t => tpq.add(t));
    let truck: Truck = tpq.remove();
    while (!this.parcels.isEmpty()) {
      let parcel: Parcel = this.parcels.remove();
      if (truck.fillTruck(parcel)) {
        this.parcels.add(parcel);
        if (!tpq.isEmpty()) {
          truck = tpq.remove();
        } else {
          break;
        }
      } else {
        continue;
      }
    }
    return this.parcels.getQueue();
  }

  getPriority(priority: priority) {
    const nonincreasing = (a: any, b: any) => {
      return a.leq(b);
    };
    const nondecreasing = (a: any, b: any) => {
      return a.geq(b);
    };
    if (!(priority === "non-increasing")) {
      return nonincreasing;
      // } else if (priority === "non-decreasing") {
    } else {
      return nondecreasing;
    }
  }
}
