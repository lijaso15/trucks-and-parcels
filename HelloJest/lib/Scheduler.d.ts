import Parcel from "./Parcel";
import Truck from "./Truck";
declare type algorithm = "NAIVE" | "RANDOM" | "GREEDY";
export default class Scheduler {
    trucks: Truck[];
    parcels: any;
    constructor(trucks: Truck[]);
    schedule(): Parcel[];
    parcelIntoTrucks(parcel: Parcel, trucks: Truck[]): undefined | Parcel;
    route(parcels: Parcel[], algorithm?: algorithm, truck?: Truck, seed?: number): Parcel[];
    random(parcels: Parcel[], seed?: number): Parcel[];
    shuffle(a: Parcel[], seed?: number): Parcel[];
    naive(parcels: Parcel[], truck: Truck): any;
    greedy(parcels: Parcel[], truck: Truck): Parcel[];
}
export {};
