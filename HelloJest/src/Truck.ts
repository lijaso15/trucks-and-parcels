import Parcel from "./Parcel";
import DistanceMap from "./DistanceMap";

export default class Truck {
  volume: number;
  tid: number;
  depotLocation: string;
  capacity: number;
  parcels: Parcel[];
  dm: DistanceMap;
  route: Parcel[];

  constructor(
    tid: number,
    depotLocation: string,
    capacity: number,
    dm: DistanceMap
  ) {
    this.tid = tid;
    this.depotLocation = depotLocation;
    this.capacity = capacity;
    this.parcels = [];
    this.volume = 0;
    this.dm = dm;
    this.route = [];
  }

  fillTruck(p: Parcel): undefined | string {
    // if there is not enough space in this truck then return
    // the destination of the parcel
    if (p.volume + this.volume <= this.capacity) {
      this.parcels.push(p);
      this.volume += p.volume;
    } else {
      return p.destination;
    }
  }

  totalDistance(parcels: Parcel[]) {
    return (
      this.dm.deliveryDistance(parcels.map((p: Parcel) => p.destination)) +
      this.dm.lookup(this.depotLocation, parcels[0].destination) +
      this.dm.lookup(
        parcels[parcels.length - 1].destination,
        this.depotLocation
      )
    );
  }

  leq(other: any) {
    if (!(other instanceof Truck)) {
      throw new TypeError("incompatible types");
    } else {
      return this.volume <= other.volume;
    }
  }

  geq(other: any) {
    if (!(other instanceof Truck)) {
      throw new TypeError("incompatible types");
    } else {
      return this.volume >= other.volume;
    }
  }
}
