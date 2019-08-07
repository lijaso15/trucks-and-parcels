import City from "./City";
import DistanceMap from "./DistanceMap";

export default class CityMap {
  cities: City[];

  constructor() {
    this.cities = [];
  }

  transformToDistanceMap(): DistanceMap {
    let dm = new DistanceMap();
    this.cities.map(city => {
      this.cities.map(c => {
        if (!city.equals(c)) dm.store(city.name, c.name, city.distance(c));
      });
    });
    return dm;
  }
}
