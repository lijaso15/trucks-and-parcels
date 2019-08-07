import Scheduler from "./Scheduler";
import Parcel from "./Parcel";
import Truck from "./Truck";

export default class RandomScheduler extends Scheduler {
  parcels: Parcel[];
  verbose = false;
  constructor(parcels: Parcel[], trucks: Truck[], verbose = false) {
    super(trucks);
    this.parcels = parcels;
    this.verbose = verbose;
  }

  schedule(seed?: number) {
    let extra = [];
    let parcels = this.shuffle(this.parcels, seed);
    let parcel: Parcel;
    for (parcel of parcels) {
      if (this.parcelIntoTrucks(parcel, this.trucks)) {
        extra.push(parcel);
      } else {
        continue;
      }
    }
    return extra;
  }
}
