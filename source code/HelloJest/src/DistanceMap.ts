export default class DistanceMap {
  private _map: any;
  constructor() {
    this._map = {};
  }
  store(cityName1: string, cityName2: string, distance: number) {
    if (!(cityName1 in this._map)) {
      this._map[cityName1] = [[cityName2, distance]];
    } else if (
      !this._map[cityName1].filter((p: [string, number]) => p[0] === cityName2)
        .length
    ) {
      this._map[cityName1].push([cityName2, distance]);
    } else {
      this._map[cityName1].splice(
        this._map[cityName1]
          .map((p: [string, number]) => {
            return p[0] === cityName2;
          })
          .indexOf(true), //find matching names
        1,
        [cityName2, distance] //update the distance
      );
    }
  }
  lookup(cityName1: string, cityName2: string): number {
    if (cityName1 === cityName2) {
      return 0;
    } else if (!this._map[cityName1]) {
      //undefined
      return -1;
    }
    const res = this._map[cityName1].filter(
      (p: [string, number]) => p[0] === cityName2
    );
    return res.length ? res[0][1] : -1;
  }

  deliveryDistance(cities: string[]): number {
    if (!cities.length) {
      //assert cities length non empty
      return 0;
    } else {
      let total = 0;
      for (let i = 0; i < cities.length - 1; i++) {
        let j = i + 1;
        total += this.lookup(cities[i], cities[j]);
      }
      // total += this.lookup(cities[cities.length - 1], cities[0]);
      return total;
    }
  }

  nearestNeighbour(city: string, destinations: string[]): string {
    // console.log(this._map);
    return this._map[city].reduce(
      (acc: string, curr: [string, number]) => {
        if (!destinations.includes(curr[0])) {
          return acc;
        } else if (this.lookup(city, acc) === -1) {
          return curr[0];
        }
        return this.lookup(city, curr[0]) <= this.lookup(city, acc)
          ? curr[0]
          : acc;
      },
      destinations.includes(this._map[city][0][0]) ? this._map[city][0][0] : ""
    );
  }
}
