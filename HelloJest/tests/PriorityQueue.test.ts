import PriorityQueue from "../src/PriorityQueue";

describe("Priority queue", () => {
  test("no priority", () => {
    let noPriority = (a: any, b: any) => false;
    let pq = new PriorityQueue(noPriority);
    expect(pq.isEmpty()).toBe(true);
    pq.add(1);
    expect(pq.isEmpty()).toBe(false);
    pq.add(2); // [2,1]
    expect(pq.remove()).toBe(1);
    expect(pq.remove()).toBe(2);
    expect(pq.isEmpty()).toBe(true);
  });

  test("first in first out", () => {
    let fifo = (a: any, b: any) => true;
    let pq = new PriorityQueue(fifo);
    pq.add(1);
    pq.add(2);
    expect(pq.remove()).toBe(2);
  });

  test("less than", () => {
    let lessThan = (a: any, b: any) => a < b;
    let pq = new PriorityQueue(lessThan);
    expect(pq.isEmpty()).toBe(true);
    pq.add(2);
    expect(pq.isEmpty()).toBe(false);
    pq.add(1); // [2,1]
    pq.add(100);
    expect(pq.getQueue()).toEqual([100, 2, 1]);
  });

  test("greater than", () => {
    let lessThan = (a: any, b: any) => a > b;
    let pq = new PriorityQueue(lessThan);
    expect(pq.isEmpty()).toBe(true);
    pq.add(2);
    expect(pq.isEmpty()).toBe(false);
    pq.add(1); // [1,2]
    pq.add(100);
    expect(pq.getQueue()).toEqual([1, 2, 100]);
  });

  test("index priority", () => {
    let order = ["d", "c", "b", "a"];
    let priority = (a: string, b: string) => {
      return order.indexOf(a) >= order.indexOf(b);
    };
    let pq = new PriorityQueue(priority);
    pq.add("a");
    pq.add("b");
    pq.add("c");
    pq.add("d");
    // console.log(pq.getQueue());
    expect(pq.getQueue()).toEqual(["d", "c", "b", "a"]);
  });
});
