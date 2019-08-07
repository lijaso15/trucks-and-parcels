import {
  City,
  CityMap,
  Truck,
  Parcel,
  Scheduler,
  GreedyScheduler,
  RandomScheduler
} from "hellojest";
export const run = (
  data: {
    x: number;
    y: number;
    name: string;
    id: number;
    isTruck: boolean;
    value: number;
  }[],
  loadingConfig: {
    algorithm: string;
    parcelPriority: string;
    parcelOrder: string;
    truckOrder: string;
  }
) => {
  let cities: City[] = [];
  let trucks: Truck[] = [];
  let parcels: Parcel[] = [];

  data.map(p => {
    cities.push(new City(p.x, p.y, p.name));
    if (p.isTruck) {
      trucks.push(new Truck(p.id, p.name, p.value));
    } else {
      parcels.push(new Parcel(p.id, p.name, p.name, p.value));
    }
  });
  let cm = new CityMap();
  cm.cities = cities;
  let dm = cm.transformToDistanceMap();
  trucks.map(t => (t.dm = dm));
  let scheduler: Scheduler;
  switch (loadingConfig.algorithm) {
    case "greedy":
      scheduler = new GreedyScheduler(
        parcels,
        trucks,
        loadingConfig.parcelPriority,
        loadingConfig.parcelOrder,
        loadingConfig.truckOrder
      );
      break;
    case "random":
      scheduler = new RandomScheduler(parcels, trucks);
      break;

    default:
      scheduler = new Scheduler(trucks);
      scheduler.parcels = parcels;
  }

  let extra = scheduler.schedule();
  let selectedIndex = (document.querySelector("#router") as HTMLSelectElement)
    .selectedIndex;
  let algorithm;
  switch (selectedIndex) {
    case 2:
      algorithm = "NAIVE";
      break;
    case 3:
      algorithm = "RANDOM";
      break;
    case 4:
      algorithm = "GREEDY";
      break;
    default:
      algorithm = "";
  }
  trucks.map(t => {
    t.route = scheduler.route(t.parcels, algorithm, t);
  });

  return {
    trucks,
    extra,
    cities,
    parcels,
    algorithm,
    loadingConfig,
    time: new Date()
  };
};
