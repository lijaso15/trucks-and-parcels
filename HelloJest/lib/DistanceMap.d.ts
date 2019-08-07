export default class DistanceMap {
    private _map;
    constructor();
    store(cityName1: string, cityName2: string, distance: number): void;
    lookup(cityName1: string, cityName2: string): number;
    deliveryDistance(cities: string[]): number;
    nearestNeighbour(city: string, destinations: string[]): string;
}
