import Scheduler from "./Scheduler";
import Parcel from "./Parcel";
import Truck from "./Truck";
import PriorityQueue from "./PriorityQueue";
import { parcelPriority } from "./Parcel";
declare type priority = "non-increasing" | "non-decreasing";
export default class GreedyScheduler extends Scheduler {
    truckOrder: priority;
    verbose: boolean;
    parcels: PriorityQueue;
    constructor(parcels: Parcel[], trucks: Truck[], parcelPriority: parcelPriority, parcelOrder: priority, truckOrder: priority, verbose?: boolean);
    schedule(): Parcel[];
    getPriority(priority: priority): (a: any, b: any) => any;
}
export {};
