import DistanceMap from "./DistanceMap";
export declare type parcelPriority = "volume" | "destination";
export default class Parcel {
    pid: number;
    origin: string;
    destination: string;
    volume: number;
    priority?: parcelPriority;
    constructor(pid: number, origin: string, destination: string, volume: number);
    getDistance(dm: DistanceMap): number;
    leq(other: any): boolean | undefined;
    geq(other: any): boolean | undefined;
}
