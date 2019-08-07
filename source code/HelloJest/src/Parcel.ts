import DistanceMap from "./DistanceMap";

export type parcelPriority = "volume" | "destination";

export default class Parcel {
  pid: number;
  origin: string; //city name
  destination: string; //city name
  volume: number;
  priority?: parcelPriority;
  constructor(
    pid: number,
    origin: string,
    destination: string,
    volume: number
  ) {
    this.pid = pid;
    this.origin = origin;
    this.destination = destination;
    this.volume = volume;
  }

  getDistance(dm: DistanceMap): number {
    return dm.lookup(this.origin, this.destination);
  }

  leq(other: any) {
    if (!(other instanceof Parcel)) {
      throw new TypeError("incompatible types");
    } else if (this.priority === "volume") {
      return this.volume <= other.volume;
    } else if (this.priority === "destination") {
      return this.destination.charCodeAt(0) <= other.destination.charCodeAt(0);
    }
  }

  geq(other: any) {
    if (!(other instanceof Parcel)) {
      throw new TypeError("incompatible types");
    } else if (this.priority === "volume") {
      return this.volume >= other.volume;
    } else if (this.priority === "destination") {
      return this.destination.charCodeAt(0) >= other.destination.charCodeAt(0);
    }
  }
}
