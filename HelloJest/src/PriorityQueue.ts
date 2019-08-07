type priority = (a: any, b: any) => boolean;
export default class PriorityQueue {
  priority: priority;
  private _queue: any[];

  constructor(priority: (a: any, b: any) => boolean) {
    this.priority = priority;
    this._queue = [];
  }

  remove(): any {
    return this._queue.pop();
  }

  add(item: any) {
    if (this.isEmpty()) {
      this._queue.push(item);
    } else {
      for (let i = 0; i < this._queue.length; i++) {
        if (this.priority(item, this._queue[i])) {
          continue;
        } else {
          this._queue.splice(i, 0, item);
          return;
        }
      }
      this._queue.push(item);
    }
  }

  isEmpty(): boolean {
    return this._queue.length ? false : true;
  }

  getQueue(): any[] {
    return this._queue;
  }
}
