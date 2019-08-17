import Parcel from "./Parcel";
import PriorityQueue from "./PriorityQueue";
import Truck from "./Truck";

type algorithm = "NAIVE" | "RANDOM" | "GREEDY" | "DYNAMIC PROGRAMMING";

export default class Scheduler {
  trucks: Truck[];
  parcels: any;
  constructor(trucks: Truck[]) {
    this.trucks = trucks;
  }

  schedule() {
    let extra = [];
    let parcel: Parcel;
    for (parcel of this.parcels) {
      if (this.parcelIntoTrucks(parcel, this.trucks)) {
        extra.push(parcel);
      } else {
        continue;
      }
    }
    return extra;
  }

  parcelIntoTrucks(parcel: Parcel, trucks: Truck[]): undefined | Parcel {
    let truck: Truck;
    for (truck of trucks) {
      if (typeof truck.fillTruck(parcel) === "string") {
        continue;
      } else {
        return;
      }
    }
    return parcel;
  }

  route(
    parcels: Parcel[],
    algorithm?: algorithm,
    truck?: Truck,
    seed?: number
  ): Parcel[] {
    switch (algorithm) {
      case "RANDOM":
        return this.random(parcels, seed);
      case "NAIVE":
        if (!truck) {
          throw new TypeError("param truck is undefined");
        }
        return this.naive(parcels, truck);
      case "GREEDY":
        if (!truck) {
          throw new TypeError("param truck is undefined");
        }
        // return this.greedy(parcels, truck);
        return this.greedy(parcels, truck);
      case "DYNAMIC PROGRAMMING":
        if (!truck) {
          throw new TypeError("param truck is undefined");
        }
        return this.dynamic(parcels, truck);
      default:
        return parcels;
    }
  }

  random(parcels: Parcel[], seed?: number) {
    return this.shuffle(parcels, seed);
  }

  shuffle(a: Parcel[], seed?: number) {
    let seedrandom = require("seedrandom");
    // Global PRNG: set Math.random.
    seedrandom(seed, { global: true });
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  naive(parcels: Parcel[], truck: Truck) {
    if (!parcels.length) {
      return [];
    }

    function perm(xs: any[]): any[] {
      let ret = [];

      for (let i = 0; i < xs.length; i = i + 1) {
        let rest = perm(xs.slice(0, i).concat(xs.slice(i + 1)));

        if (!rest.length) {
          ret.push([xs[i]]);
        } else {
          for (let j = 0; j < rest.length; j = j + 1) {
            ret.push([xs[i]].concat(rest[j]));
          }
        }
      }
      return ret;
    }
    let permutations = perm(parcels);

    return permutations.reduce((acc, curr) => {
      return truck.totalDistance(acc) <= truck.totalDistance(curr) ? acc : curr;
    });
  }

  greedy(parcels: Parcel[], truck: Truck): Parcel[] {
    if (!parcels.length) {
      return [];
    }

    let curr = truck.depotLocation;
    let destinations = parcels.map(p => p.destination);
    let nearest = truck.dm.nearestNeighbour(curr, destinations);

    let res: string[] = [];
    res.push(nearest);
    while (!(destinations.length === 1)) {
      curr = nearest;
      destinations = destinations.filter(d => !(d === curr));
      nearest = truck.dm.nearestNeighbour(curr, destinations);
      res.push(nearest);
    }
    let indexPriority = (a: Parcel, b: Parcel) => {
      return res.indexOf(a.destination) >= res.indexOf(b.destination);
    };
    let pq = new PriorityQueue(indexPriority);
    parcels.forEach(p => pq.add(p));
    return pq.getQueue();
  }

  dynamic(parcels: Parcel[], truck: Truck): Parcel[] {
    function Cost(parcels: Parcel[], pi: Parcel): Parcel[] {
      if (parcels.length === 1) {
        return parcels;
      }
      const S = parcels.filter(p => !(p === pi));
      return S.reduce((acc, pj) => {
        let curr = Cost(S, pj).concat([pi]);
        return truck.dm.deliveryDistance(curr.map(p => p.destination)) +
          truck.dm.lookup(truck.depotLocation, curr[0].destination) <=
          truck.dm.deliveryDistance(acc.map(p => p.destination)) +
            truck.dm.lookup(truck.depotLocation, acc[0].destination)
          ? curr
          : acc;
      }, Cost(S, S[0]).concat(pi));
    }

    function cost(pi: Parcel) {
      return Cost(parcels, pi);
    }

    return parcels.reduce((acc, pi) => {
      let path = cost(pi);
      return truck.totalDistance(path) <= truck.totalDistance(acc) ? path : acc;
    }, cost(parcels[0]));
  }
}
