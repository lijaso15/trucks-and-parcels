export default class City {
    x: number;
    y: number;
    name: string;
    constructor(x: number, y: number, name?: string);
    distance(other: City): number;
    equals(other: any): boolean;
}
