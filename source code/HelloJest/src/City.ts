export default class City {
  x: number;
  y: number;
  name: string;

  constructor(x: number, y: number, name = "") {
    this.x = x;
    this.y = y;
    this.name = name;
  }

  distance(other: City) {
    return (
      Math.round(
        Math.sqrt(
          Math.pow(this.x - other.x, 2) + Math.pow(this.y - other.y, 2)
        ) * 100
      ) / 100
    );
  }
  equals(other: any): boolean {
    if (!(other instanceof City)) {
      return false;
    }
    return other.x === this.x && other.y === this.y && other.name === this.name;
  }
}
