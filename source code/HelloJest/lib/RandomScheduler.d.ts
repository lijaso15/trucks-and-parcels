import Scheduler from "./Scheduler";
import Parcel from "./Parcel";
import Truck from "./Truck";
export default class RandomScheduler extends Scheduler {
    parcels: Parcel[];
    verbose: boolean;
    constructor(parcels: Parcel[], trucks: Truck[], verbose?: boolean);
    schedule(seed?: number): Parcel[];
}
