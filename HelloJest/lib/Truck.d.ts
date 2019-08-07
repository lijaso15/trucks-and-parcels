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
    constructor(tid: number, depotLocation: string, capacity: number, dm: DistanceMap);
    fillTruck(p: Parcel): undefined | string;
    totalDistance(parcels: Parcel[]): number;
    leq(other: any): boolean;
    geq(other: any): boolean;
}
